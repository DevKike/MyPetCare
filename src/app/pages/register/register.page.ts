import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { FirestoreCollection } from 'src/app/modules/shared/enums/FirestoreCollection';
import { Storage } from 'src/app/modules/shared/enums/Storage';
import { IAuthUser, ICreateUser, IUpdateUser } from 'src/app/modules/shared/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { CameraService } from 'src/app/modules/shared/services/camera/camera.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { LocalNotificationsService } from 'src/app/modules/shared/services/localNotifications/local-notifications.service';
import { NavigationService } from 'src/app/modules/shared/services/navigation/navigation.service';
import { StorageService } from 'src/app/modules/shared/services/storage/storage.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

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
  protected imageUrl: string = 'https://cdn-icons-png.freepik.com/512/6596/6596121.png';
  protected filePath!: string;
  private fileToUpload: any;

  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _authSrv: AuthService,
    private readonly _loadingSrv: LoadingService,
    private readonly _storageSrv: StorageService,
    private readonly _toastSrv: ToastService,
    private readonly _localNotificationsSrv: LocalNotificationsService,
    private readonly _navSrv: NavigationService,
    private readonly _cameraSrv: CameraService,
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
        imageUrl: this.imageUrl,
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

      this.registerForm.reset();

      const hasPermission =
        await this._localNotificationsSrv.checkNotificationPermission();

      if (hasPermission) {
        await this._localNotificationsSrv.scheduleNotification(
          1,
          'Successful Registration',
          'You have successfully registered in the application',
          'Welcome to our application',
          '',
          'res://drawable/logo_64',
          'res://drawable/huella_48'
        );
      }

      await this._navSrv.navigateRoot('/sign-in');
    } catch (error) {
      throw error;
    } finally {
      await this._loadingSrv.hideLoading();
    }
  }

  protected async uploadImage() {
    try {
      const imageUri = await this._cameraSrv.chooseImageSource();

      if (!imageUri) {
        return;
      }

      await this._loadingSrv.showLoading('Uploading...');

      this.filePath = `${Storage.IMAGE}${new Date().getTime()}_photo.jpg`;
      this.fileToUpload = await this._cameraSrv.uriToBlob(imageUri);

      await this._storageSrv.upload(this.filePath, this.fileToUpload);

      this.imageUrl = await this._storageSrv.getUrl(this.filePath);

      await this._toastSrv.showToast('Uploaded with success');
    } catch (error) {
      await this._toastSrv.showToast('An error ocurred');
      throw error;
    } finally {
      await this._loadingSrv.hideLoading();
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
