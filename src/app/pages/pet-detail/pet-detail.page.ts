import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { FirestoreCollection } from 'src/app/enums/FirestoreCollection';
import { IPet } from 'src/app/interfaces/IPet';
import { AlertService } from 'src/app/modules/shared/services/alert/alert.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _firestoreService: FirestoreService,
    private _toastService: ToastService,
    private _alertService: AlertService

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
      const confirmed = await this._alertService.presentConfirmAlert(
        'Confirm Delete',
        'Are you sure you want to delete this pet?',
        'Delete',
        'Cancel'
      );

      if (!confirmed) return;

      const petId = this._route.snapshot.paramMap.get('id');
      if (!petId) {
        this._toastService.showToast('Pet ID not found');
        return;
      }

      await this._firestoreService.delete(FirestoreCollection.PETS, petId);
      this._toastService.showToast('Pet deleted successfully');
      await this._router.navigate(['/my-pets'], { replaceUrl: true });
    } catch (error) {
      console.error('Error deleting pet:', error);
      this._toastService.showToast('Error deleting pet');
    }
  }

  private async loadPetDetails() {
    try {
      const petId = this._route.snapshot.paramMap.get('id');

      if (!petId) {
        this._toastService.showToast('Pet ID not found');
        this._router.navigate(['/my-pets']);
        return;
      }

      this._firestoreService
        .getDocumentById(FirestoreCollection.PETS, petId)
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
              this._toastService.showToast('Pet not found');
              this._router.navigate(['/my-pets']);
            }
          },
          (error) => {
            console.error('Error loading pet details:', error);
            this._toastService.showToast('Error loading pet details');
            this._router.navigate(['/my-pets']);
          }
        );
    } catch (error) {
      console.error('Error in loadPetDetails:', error);
      this._toastService.showToast('Error loading pet details');
      this._router.navigate(['/my-pets']);
    }
  }

  protected async savePetDetails() {
    try {
      if (this.editForm.invalid) {
        this._toastService.showToast('Please fill all required fields');
        return;
      }

      const petId = this._route.snapshot.paramMap.get('id');
      if (!petId) {
        this._toastService.showToast('Pet ID not found');
        return;
      }

      const updatedPet = {
        ...this.pet,
        ...this.editForm.value,
      };

      await this._firestoreService.update(
        FirestoreCollection.PETS,
        petId,
        updatedPet
      );
      this._toastService.showToast('Pet details updated successfully');
      await this._router.navigate(['/my-pets'], { replaceUrl: true });
    } catch (error) {
      console.error('Error saving pet details:', error);
      this._toastService.showToast('Error saving pet details');
    }
  }
}
