import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Observable } from 'rxjs';
import { FirestoreCollection } from 'src/app/modules/shared/enums/FirestoreCollection';
import { ICreateVaccine, IVaccine } from 'src/app/modules/shared/interfaces/IVaccine';
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
    public vaccineForm!: FormGroup;
    public filePath: any;

    constructor(
      private readonly _storageSrv: StorageService,
      private readonly _firestoreSrv: FirestoreService
    ) {
      console.log('VaccinePage componente inicializado');
    }

    ngOnInit(){
        this.initForm();
    }

    async pickPDFFiles(){
      try {
        const result = await FilePicker.pickFiles({
          types: ['application/pdf'],
          readData: true
        });

        if (result && result.files.length > 0) {
          const file = result.files[0];
          const filePath = `vaccines/${file.name}`;

          await this._storageSrv.upload(filePath, file);
          this.filePath = await this._storageSrv.getUrl(filePath);

          console.log("archive pdf save successfully", this.filePath)
        } else {
          alert("no se selecciono nada");
        }
      } catch(error) {
        console.error("Error", error)
      }
    }



    async addVaccines(vaccine: IVaccine, file?: File): Promise<void> {
      console.log('Entrando al método addVaccines');
      try {
        const vaccineData: ICreateVaccine = {
          name: this.vaccineForm.value.name,
          applicationDate: this.vaccineForm.value.applicationDate,
          certificate: this.filePath || null
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

      this.vaccineForm = new FormGroup({
        name: this.name,
        applicationDate: this.applicationDate,
      });
    }

  }
