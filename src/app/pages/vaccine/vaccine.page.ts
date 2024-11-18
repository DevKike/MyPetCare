import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Observable } from 'rxjs';
import { FirestoreCollection } from 'src/app/modules/shared/enums/FirestoreCollection';
import { ICreateVaccine, IVaccine } from 'src/app/modules/shared/interfaces/IVaccine';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { LocalStorageService } from 'src/app/modules/shared/services/localStorage/local-storage.service';
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
    public fileUploaded: boolean = false;
    public fileName: string | null = null;  

   

    constructor(
      private readonly _storageSrv: StorageService,
      private readonly _firestoreSrv: FirestoreService,
      private readonly _localStorage: LocalStorageService,
    ) {
      console.log('VaccinePage componente inicializado');
    }

    ngOnInit(){
        this.initForm();
    }
    

    async openPDF() {
      console.log("Opening file with path:", this.filePath);
      
        try {
          await FileOpener.openFile({
            path: this.filePath,
            mimeType: 'application/pdf'
          });
          console.log('archive was opened')
        } catch (error) {
          console.log('error', error)
      }
    }

    async pickPDFFiles(){
      try {

        const permissionGranted = await this._localStorage.requestFileUploadPermission();

        if(!permissionGranted) {
          alert('Permiso denegado');
          return;
        }

        const result = await FilePicker.pickFiles({
          types: ['application/pdf'],
          readData: true
        });
        

        if (result && result.files.length > 0) {
          const file = result.files[0];
          const filePath = `vaccines/${file.name}`;

          await this._storageSrv.upload(filePath, file);
          this.filePath = await this._storageSrv.getUrl(filePath);
          this.fileUploaded = true;
          this.fileName = file.name;

          await this._localStorage.setPermission('pdfPermission', true)
          console.log("archive pdf save successfully", this.filePath)
        } else {
          alert("no se selecciono nada");
        }
      } catch(error) {
        console.error("Error", error)
      }
    }

    
    
    async addVaccines(vaccine: IVaccine, file?: File): Promise<void> { 
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
