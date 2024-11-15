import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private readonly _localNotificationsSrv: LocalNotificationsService
  ) {}

  ngOnInit() {
    this.initForm();
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

  protected async doRegister() {
    if (this.registerForm.invalid) {
      this._toastSrv.showToast('Please fill all fields correctly');
      return;
    }
    try {
      await this._loadingSrv.showLoading('Registering...');
      const petData: ICreatePets = this.registerForm.value;

      await this._firestoreSrv.save(FirestoreCollection.PETS, petData);

      this.petsList.push(petData);

      await this._loadingSrv.hideLoading();
      this.registerForm.reset();

      const hasPermission =
        await this._localNotificationsSrv.checkNotificationPermission();
      if (hasPermission) {
        await this._localNotificationsSrv.scheduleNotification(
          1,
          'Successful Registration',
          'Your pet has been successfully registered',
          'Thanks for using our app!',
          '',
          'res://drawable/logo_64',
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
