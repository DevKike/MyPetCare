import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { FirestoreCollection } from 'src/app/modules/shared/enums/FirestoreCollection';
import { ICreatePets } from 'src/app/modules/shared/interfaces/IPet';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { CameraService } from 'src/app/modules/shared/services/camera/camera.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { LocalNotificationsService } from 'src/app/modules/shared/services/localNotifications/local-notifications.service';
import { StorageService } from 'src/app/modules/shared/services/storage/storage.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';
import { Storage } from 'src/app/modules/shared/enums/Storage';

@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.page.html',
  styleUrls: ['./my-pets.page.scss'],
})
export class MyPetsPage implements OnInit {
  public name!: FormControl;
  public breed!: FormControl;
  public age!: FormControl;
  public birthDate!: FormControl;
  public gender!: FormControl;
  public isAddButtonDisabled: boolean = true;
  public registerForm!: FormGroup;
  public imageUrl: string =
    'https://cdn-icons-png.freepik.com/512/6596/6596121.png';
  public petsList: ICreatePets[] = [];
  @ViewChild(IonModal) modalInstance!: IonModal;

  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _authSrv: AuthService,
    private readonly _loadingSrv: LoadingService,
    private readonly _storageSrv: StorageService,
    private readonly _toastSrv: ToastService,
    private readonly _localNotificationsSrv: LocalNotificationsService,
    private readonly _router: Router,
    private readonly _cameraSrv: CameraService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadUserPets();
  }

  public onGenderChange(selectedGender: string) {
    this.registerForm.patchValue({ gender: selectedGender });
  }

  public onBreedSelected(selectedBreed: string) {
    this.registerForm.patchValue({ breed: selectedBreed });
  }

  public OnDateSelected(selectedDate: string) {
    this.registerForm.patchValue({ birthDate: selectedDate });
  }

  public async goToPetDetail(petId: string) {
    try {
      if (!petId) {
        this._toastSrv.showToast('Pet ID is missing');
        return;
      }

      const userId = this._authSrv.getAuthUserId();
      if (!userId) {
        this._toastSrv.showToast('User not authenticated');
        this._router.navigate(['/slide']);
        return;
      }

      await this._router.navigate(['/pet-detail', petId]);
    } catch (error) {
      console.error('Error navigating to pet detail:', error);
      this._toastSrv.showToast('Error accessing pet details');
    }
  }

  private async loadUserPets() {
    await this._loadingSrv.showLoading('Loading pets...');

    try {
      const userId = await this._authSrv.getAuthUserId();
      if (!userId) {
        await this._loadingSrv.hideLoading();
        this._toastSrv.showToast('User not authenticated');
        return;
      }

      this._firestoreSrv
        .getDocumentsByQuery(FirestoreCollection.PETS, 'userId', userId)
        .subscribe(
          (pets) => {
            this.petsList = pets;
            this._loadingSrv.hideLoading();
          },
          (error) => {
            console.error('Error loading pets:', error);
            this._loadingSrv.hideLoading();
          }
        );
    } catch (error) {
      console.error('Error loading pets:', error);
      this._loadingSrv.hideLoading();
    }
  }

  protected async doRegister() {
    if (this.registerForm.invalid) {
      this._toastSrv.showToast('Please complete all fields correctly.');
      return;
    }

    try {
      await this._loadingSrv.showLoading('Registering...');

      const userId = await this._authSrv.getAuthUserId();
      if (!userId) {
        this._toastSrv.showToast('Unauthenticated user');
        return;
      }

      const formValues = this.registerForm.value;
      const petData: ICreatePets = {
        ...formValues,
        name: this.capitalizeFirstLetter(formValues.name),
        userId,
        imageUrl: this.imageUrl,
      };

      await this._firestoreSrv.save(FirestoreCollection.PETS, petData);

      await this._loadingSrv.hideLoading();
      this.registerForm.reset();
      this.imageUrl = 'https://cdn-icons-png.freepik.com/512/6596/6596121.png';

      if (this.modalInstance) {
        await this.modalInstance.dismiss();
      }

      const hasPermission =
        await this._localNotificationsSrv.checkNotificationPermission();
      if (hasPermission) {
        await this._localNotificationsSrv.scheduleNotification(
          1,
          'Mascota Registrada!',
          'Tu mascota ha sido registrada exitosamente',
          '¡Gracias por usar nuestra app!',
          '',
          'res://drawable/logo_36',
          'res://drawable/huella_48'
        );
      }
    } catch (error) {
      console.error(error);
      this._toastSrv.showToast('Error al registrar la mascota');
    }
  }

  protected async uploadImage() {
    try {
      const imageUri = await this._cameraSrv.chooseImageSource();

      if (!imageUri || imageUri === 'cancelled') {
        return;
      }

      await this._loadingSrv.showLoading('Subiendo imagen...');

      const filePath = `${Storage.IMAGE}${new Date().getTime()}_pet.jpg`;
      const fileToUpload = await this.uriToBlob(imageUri);

      if (!fileToUpload) {
        this._toastSrv.showToast('Error al procesar la imagen');
        return;
      }

      await this._storageSrv.upload(filePath, fileToUpload);
      this.imageUrl = await this._storageSrv.getUrl(filePath);

      await this._toastSrv.showToast('Imagen subida exitosamente');
    } catch (error) {
      console.error('Error al subir imagen:', error);
      await this._toastSrv.showToast('Error al subir la imagen');
    } finally {
      await this._loadingSrv.hideLoading();
    }
  }

  private async uriToBlob(uri: string): Promise<Blob | undefined> {
    try {
      const response = await fetch(uri);
      return await response.blob();
    } catch (error) {
      console.error('Error al convertir URI a Blob:', error);
      return undefined;
    }
  }

  private initForm() {
    this.name = new FormControl('', Validators.required);
    this.breed = new FormControl('', Validators.required);
    this.age = new FormControl('', [Validators.required, Validators.min(1)]);
    this.birthDate = new FormControl('', Validators.required);
    this.gender = new FormControl('', Validators.required);

    this.registerForm = new FormGroup({
      name: this.name,
      breed: this.breed,
      age: this.age,
      birthDate: this.birthDate,
      gender: this.gender,
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.isAddButtonDisabled = !this.registerForm.valid;
    });
  }

  private capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
