import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore/firestore.service';
import { StorageService } from '../storage/storage.service';
import { IVaccine } from 'src/app/interfaces/IVaccine';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VaccineService {
  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _storageSrv: StorageService
  ) {}

  async addVaccines(vaccine: IVaccine, file?: File): Promise<void> {
    if (file) {
      const filePath = `vaccines/certificates/${new Date().getTime()}_${
        file.name
      }`;
      await this._storageSrv.upload(filePath, file);
      vaccine.certificate = await this._storageSrv.getUrl(filePath);
    }

    if (vaccine.id) {
      await this._firestoreSrv.update('vaccines', vaccine.id, vaccine);
    } else {
      await this._firestoreSrv.save('vaccines', vaccine);
    }
  }

  getVaccines(): Observable<IVaccine[]> {
    return this._firestoreSrv.getCollectionDocuments('vaccines');
  }

  async deleteVaccines(id: string): Promise<void> {
      await this._firestoreSrv.delete('vaccines', id);
  }
}
