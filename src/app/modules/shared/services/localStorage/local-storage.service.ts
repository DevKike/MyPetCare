import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
  }

  async requestFileUploadPermission(): Promise<boolean> {
    const permissionGranted = await this.getPermission('fileUploadPermission');
    
    if (permissionGranted) {
      return true;
    }

    const userConfirmed = confirm('¿Permites que esta aplicación suba archivos PDF?');
    
    if (userConfirmed) {
      await this.setPermission('fileUploadPermission', true);
      return true;
    } else {
      await this.setPermission('fileUploadPermission', false);
      return false;
    }
  }

  async getPermission(key: string): Promise<boolean> {
    const { value } = await Preferences.get({ key });
    return value === 'true';
  }



  async setPermission(key: string, value: boolean): Promise<void> {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value),
    });
  }

  async removePermission(key: string): Promise<void> {
    await Preferences.remove({ key: key });
  }

  async clearAllPermissions(): Promise<void>{
    await Preferences.clear();
  }
}
