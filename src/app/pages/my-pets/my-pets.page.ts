import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { FirestoreCollection } from 'src/app/modules/shared/enums/FirestoreCollection';
import { ICreatePets } from 'src/app/modules/shared/interfaces/IPet';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { LocalNotificationsService } from 'src/app/modules/shared/services/localNotifications/local-notifications.service';
import { StorageService } from 'src/app/modules/shared/services/storage/storage.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

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
    private readonly _router: Router
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
    await this._loadingSrv.showLoading('Cargando mascotas...');

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
      this._toastSrv.showToast('Please fill all fields correctly');
      return;
    }

    try {
      await this._loadingSrv.showLoading('Registering...');

      const userId = await this._authSrv.getAuthUserId();
      if (!userId) {
        this._toastSrv.showToast('User not authenticated');
        return;
      }

      const petData: ICreatePets = {
        ...this.registerForm.value,
        userId,
      };

      await this._firestoreSrv.save(FirestoreCollection.PETS, petData);

      this.petsList.push(petData);

      await this._loadingSrv.hideLoading();
      this.registerForm.reset();

      const hasPermission =
        await this._localNotificationsSrv.checkNotificationPermission();
      if (hasPermission) {
        await this._localNotificationsSrv.scheduleNotification(
          1,
          'Registered Pet!',
          'Your pet has been successfully registered',
          'Thanks for using our app!',
          '',
          'res://drawable/logo_36',
          'res://drawable/huella_48'
        );
      }
    } catch (error) {
      console.error(error);
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
}
