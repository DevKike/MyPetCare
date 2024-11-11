import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirestoreCollection } from 'src/app/enums/FirestoreCollection';
import { ICreateVaccine, IVaccine } from 'src/app/interfaces/IVaccine';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { StorageService } from 'src/app/modules/shared/services/storage/storage.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.page.html',
  styleUrls: ['./vaccine.page.scss'],
})
  export class VaccinePage implements OnInit{
    public name!: FormControl;
    public applicationDate!: FormControl;
    public certificate!: FormControl;
    public vaccineForm!: FormGroup;

    constructor(
      private readonly _storageSrv: StorageService,
      private readonly _firestoreSrv: FirestoreService
    ) {
      console.log('VaccinePage componente inicializado');
    }

    ngOnInit(){
        this.initForm();
    }

    
    
    async addVaccines(vaccine: IVaccine, file?: File): Promise<void> { 
      console.log('Entrando al método addVaccines');
      try {
        if (file) {
          const filePath = `vaccines/certificates/${new Date().getTime()}_${
            file.name
          }`;
          await this._storageSrv.upload(filePath, file);
          vaccine.certificate = await this._storageSrv.getUrl(filePath);
        }

        const vaccineData: ICreateVaccine = {
          name: this.vaccineForm.value.name,
          applicationDate: this.vaccineForm.value.applicationDate,
          certificate: this.vaccineForm.value.certificate
        }
    
        if (vaccine.id) {
          await this._firestoreSrv.update('vaccines', vaccine.id, vaccine);
        } else {
          await this._firestoreSrv.save(FirestoreCollection.VACCINES, vaccineData);
        }
        console.log('vaccine data successfully')
      } catch(error) {
        console.log('error saving',error)
      }
    
    }
  
    getVaccines(): Observable<IVaccine[]> {
      return this._firestoreSrv.getCollectionDocuments('vaccines');
    }
  
    async deleteVaccines(id: string): Promise<void> {
        await this._firestoreSrv.delete('vaccines', id);
    }

    private initForm() {
      this.name = new FormControl('', [Validators.required]);
      this.applicationDate = new FormControl('', [Validators.required]);
      this.certificate = new FormControl('', [Validators.required]);

      this.vaccineForm = new FormGroup({
        name: this.name,
        applicationDate: this.applicationDate,
        certificate: this.certificate
      });
    }

  }
