import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreCollection } from 'src/app/enums/FirestoreCollection';
import { IAuthUser, ICreateUser } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { LocalNotificationsService } from 'src/app/modules/shared/services/localNotifications/local-notifications.service';
import { StorageService } from 'src/app/modules/shared/services/storage/storage.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public email!: FormControl;
  public password!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public phoneNumber!: FormControl;
  public registerForm!: FormGroup;
  public uid: string = '';
  protected imageUrl: string =
    'https://cdn-icons-png.freepik.com/512/6596/6596121.png';
  protected filePath!: string;
  private fileToUpload: any;

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

  protected async doRegister() {
    try {
      await this._loadingSrv.showLoading('Registering...');
      const authUser: IAuthUser = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      const userData: ICreateUser = {
        name: this.registerForm.value.name,
        lastName: this.registerForm.value.lastName,
        age: this.registerForm.value.age,
        phoneNumber: this.registerForm.value.phoneNumber,
        /* imageUrl: this.registerForm.value.imageUrl, */
      };

      const res = await this._authSrv.register(
        authUser.email,
        authUser.password
      );
      const userId = res.user?.uid;

      await this._firestoreSrv.save(
        FirestoreCollection.USERS,
        userData,
        userId
      );
      await this._loadingSrv.hideLoading();
      this.registerForm.reset();

      const hasPermission =
        await this._localNotificationsSrv.checkNotificationPermission();

      if (hasPermission) {
        await this._localNotificationsSrv.scheduleNotification(
          1,
          'Registro Existoso',
          'Te has registrado correctamente en la aplicacion',
          'Bienvenido a nuestra aplicación',
          '',
          'res://drawable/logo_64',
          'res://drawable/huella_48'
        );
      }
    } catch (error) {
      throw error;
    }
  }

  private initForm() {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.age = new FormControl('', [Validators.required, Validators.min(0)]);
    this.phoneNumber = new FormControl('', [Validators.required]);

    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      phoneNumber: this.phoneNumber,
    });
  }
  

}
