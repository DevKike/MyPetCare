import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private readonly _ngFireStorageSrv: AngularFireStorage) {}

  public async upload(filePath: string, file: any): Promise<void> {
    try {
      await this._ngFireStorageSrv.upload(filePath, file);
    } catch (error) {
      throw error;
    }
  }

  public async getUrl(filePath: string): Promise<string> {
    try {
      const pathRef = this._ngFireStorageSrv.ref(filePath);
      return await lastValueFrom(pathRef.getDownloadURL());
    } catch (error) {
      throw error;
    }
  }
}
