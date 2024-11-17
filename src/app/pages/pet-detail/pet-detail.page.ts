import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { AlertService } from 'src/app/modules/shared/services/alert/alert.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';
import { take } from 'rxjs/operators';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { IPet } from 'src/app/modules/shared/interfaces/IPet';
import { FirestoreCollection } from 'src/app/modules/shared/enums/FirestoreCollection';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.page.html',
  styleUrls: ['./pet-detail.page.scss'],
})
export class PetDetailPage implements OnInit {
  public pet: Partial<IPet> = {};
  public editForm!: FormGroup;
  public name!: FormControl;
  public breed!: FormControl;
  public age!: FormControl;
  public gender!: FormControl;
  public birthDate!: FormControl;
  public imageUrl: string =
    'https://cdn-icons-png.freepik.com/512/6596/6596121.png';
  @ViewChild(IonModal) modalInstance!: IonModal;
  private isPetDeleted = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _firestoreSrv: FirestoreService,
    private _toastSrv: ToastService,
    private _alertSrv: AlertService,
    private _loadingSrv: LoadingService
  ) {
    this.initializeForm();
  }

  public onGenderChange(selectedGender: string) {
    this.editForm.patchValue({ gender: selectedGender });
  }

  public onBreedSelected(selectedBreed: string) {
    this.editForm.patchValue({ breed: selectedBreed });
  }

  public OnDateSelected(selectedDate: string) {
    this.editForm.patchValue({ birthDate: selectedDate });
  }

  private initializeForm() {
    this.name = new FormControl('');
    this.breed = new FormControl('');
    this.age = new FormControl('');
    this.gender = new FormControl('');
    this.birthDate = new FormControl('');

    this.editForm = new FormGroup({
      name: this.name,
      breed: this.breed,
      age: this.age,
      gender: this.gender,
      birthDate: this.birthDate,
    });
  }

  ngOnInit() {
    this.loadPetDetails();
  }
  public async deletePet() {

    try {
      const confirmed = await this._alertSrv.presentConfirmAlert(
        'Confirm Delete',
        'Are you sure you want to delete this pet?',
        'Delete',
        'Cancel'
      );

      if (!confirmed) return;

      const petId = this._route.snapshot.paramMap.get('id');
      if (!petId) {
        this._toastSrv.showToast('Pet ID not found');
        return;
      }
      await this._loadingSrv.showLoading('Deleting Pet')
      await this._firestoreSrv.delete(FirestoreCollection.PETS, petId);
      this.isPetDeleted = true;

      this._toastSrv.showToast('Pet deleted successfully');
      this._loadingSrv.hideLoading();
      await this._router.navigate(['/my-pets'], { replaceUrl: true });
    } catch (error) {
      console.error('Error deleting pet:', error);
      this._toastSrv.showToast('Error deleting pet');
    }
  }

  private async loadPetDetails() {
    if (this.isPetDeleted) return;

    try {
      const petId = this._route.snapshot.paramMap.get('id');

      if (!petId) {
        this._toastSrv.showToast('Pet ID not found');
        await this._router.navigate(['/my-pets']);
        return;
      }

      this._firestoreSrv
        .getDocumentById(FirestoreCollection.PETS, petId)
        .pipe(take(1))
        .subscribe(
          (data: IPet) => {
            if (data) {
              this.pet = data;
              this.editForm.patchValue({
                name: data.name,
                breed: data.breed,
                age: data.age,
                gender: data.gender,
                birthDate: data.birthDate,
              });
            } else {
              this._toastSrv.showToast('Pet not found');
              this._router.navigate(['/my-pets']);
            }
          },
          (error) => {
            console.error('Error loading pet details:', error);
            this._toastSrv.showToast('Error loading pet details');
            this._router.navigate(['/my-pets']);
          }
        );
    } catch (error) {
      console.error('Error in loadPetDetails:', error);
      this._toastSrv.showToast('Error loading pet details');
      await this._router.navigate(['/my-pets']);
    }
  }
  protected async savePetDetails() {
    try {
      if (this.editForm.invalid) {
        this._toastSrv.showToast('Please fill all required fields');
        return;
      }

      const petId = this._route.snapshot.paramMap.get('id');
      if (!petId) {
        this._toastSrv.showToast('Pet ID not found');
        return;
      }

      const updatedPet = {
        ...this.pet,
        ...this.editForm.value,
      };

      await this._firestoreSrv.update(
        FirestoreCollection.PETS,
        petId,
        updatedPet
      );
      this._toastSrv.showToast('Pet details updated successfully');
      await this._router.navigate(['/my-pets'], { replaceUrl: true });
    } catch (error) {
      console.error('Error saving pet details:', error);
      this._toastSrv.showToast('Error saving pet details');
    }
  }
}
