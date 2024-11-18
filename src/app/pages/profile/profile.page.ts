import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { FirestoreCollection } from 'src/app/modules/shared/enums/FirestoreCollection';
import { Storage } from 'src/app/modules/shared/enums/Storage';
import { IUpdateUser } from 'src/app/modules/shared/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { CameraService } from 'src/app/modules/shared/services/camera/camera.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { NavigationService } from 'src/app/modules/shared/services/navigation/navigation.service';
import { StorageService } from 'src/app/modules/shared/services/storage/storage.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public phoneNumber!: FormControl;
  public updateForm!: FormGroup;
  protected imageUrl: string = 'https://cdn-icons-png.freepik.com/512/6596/6596121.png';
  protected filePath!: string;
  private fileToUpload: any;

  constructor(
    private readonly _authSrv: AuthService,
    private readonly _firestoreSrv: FirestoreService,
    private readonly _loadingSrv: LoadingService,
    private readonly _navSrv: NavigationService,
    private readonly _toastSrv: ToastService,
    private readonly _cameraSrv: CameraService,
    private readonly _storageSrv: StorageService,
  ) {}

  async ngOnInit() {
    this.initForm();
    await this.setDefaultValues();
  }

  protected async doUpdate() {
    try {
      await this._loadingSrv.showLoading('Updating...');

      const currentUser = await this._authSrv.getAuthUserId();
      
      if(!currentUser) {
        return;
      }
      
      const updatedData = this.getDirtyValues(this.updateForm);

      await this._firestoreSrv.update(FirestoreCollection.USERS, currentUser, updatedData);
      this.updateForm.markAsPristine();
      await this._toastSrv.showToast('Updated with success');
    } catch (error) {
      throw error;
    } finally {
      this._loadingSrv.hideLoading();
    }
  }

  protected async doUploadImage() {
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

  protected async doSignOut() {
    try {
      await this._authSrv.singOut();
      await this._navSrv.navigateBack('/principal');
      await this._toastSrv.showToast('Sign out with success');
    } catch (error) {
      throw error;
    }
  }

  private getDirtyValues(form: FormGroup): IUpdateUser {
    const dirtyValues: IUpdateUser = {};

    Object.keys(form.controls).forEach((key) => {
      const currentControl = form.get(key);

      if (currentControl && currentControl.dirty) {
        dirtyValues[key as keyof IUpdateUser] = currentControl.value;
      }
    });

    return dirtyValues;
  }

  private async setDefaultValues() {
    const userData = await this.getUserData();

    if (userData) {
      this.updateForm.patchValue(
        {
          name: userData.name,
          lastName: userData.lastName,
          age: userData.age,
          phoneNumber: userData.phoneNumber,
          imageUrl: userData.imageUrl,
        },
        { emitEvent: false }
      );

      this.updateForm.markAsPristine();
      this.updateForm.markAsUntouched();
    }
  }

  private async getUserData() {
    const currentUser = await this._authSrv.getAuthUserId();

    if (!currentUser) {
      return;
    }

    const doc: IUpdateUser = await firstValueFrom(
      this._firestoreSrv.getDocumentById(FirestoreCollection.USERS, currentUser)
    );
    doc.imageUrl ? (this.imageUrl = doc.imageUrl) : this.imageUrl;

    return doc;
  }

  private initForm() {
    this.name = new FormControl('');
    this.lastName = new FormControl('');
    this.age = new FormControl('', [Validators.min(0)]);
    this.phoneNumber = new FormControl('');

    this.updateForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      phoneNumber: this.phoneNumber,
    });
  }
}
