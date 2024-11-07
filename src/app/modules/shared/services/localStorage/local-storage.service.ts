import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

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
