import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';
import { Preferences } from '@capacitor/preferences';
import { ActionSheetController } from '@ionic/angular';
import { CapacitorPreferences } from '../../enums/CapacitorPreferences';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  public imageUrl: string| undefined;

  constructor(private readonly _actionSheetController: ActionSheetController) {
    this.initCamera();
  }

  public async chooseImageSource(): Promise<string | undefined> {
    const hasPermission = await this.checkCameraPermission();

    if (!hasPermission) {
      await this.initCamera();
      return;
    }

    const actionSheet = await this._actionSheetController.create({
      header: 'Select your option',
      buttons: [
        {
          text: 'Take photo',
          handler: async () => {
            this.imageUrl = await this.takePhoto(CameraSource.Camera);
          },
        },
        {
          text: 'Select from gallery',
          handler: async () => {
            this.imageUrl = await this.takePhoto(CameraSource.Photos);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();

    if (role === 'cancel') {
      return undefined;
    }
    
    return this.imageUrl;
  }

  private async initCamera(): Promise<void> {
    const permission = await Camera.requestPermissions();
    await this.savePermissionStatus(permission);
  }

  private async savePermissionStatus(permission: PermissionStatus): Promise<void> {
    await Preferences.set({
      key: CapacitorPreferences.CAMERA_PERMISSION_KEY,
      value: permission.camera === 'granted' ? 'true' : 'false',
    });
  }

  private async checkCameraPermission(): Promise<boolean> {
    const { value } = await Preferences.get({
      key: CapacitorPreferences.CAMERA_PERMISSION_KEY,
    });
    return value === 'true';
  }

  private async takePhoto(source: CameraSource): Promise<string | undefined> {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: source,
    });

    return photo.webPath;
  }

  public async uriToBlob(uri: string) {
    try {
      const res = await fetch(uri);
      return await res.blob();
    } catch (error) {
      return undefined;
    }
  }
}
