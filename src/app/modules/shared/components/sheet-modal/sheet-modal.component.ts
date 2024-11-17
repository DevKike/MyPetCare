import { Component, Input, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-sheet-modal',
  templateUrl: './sheet-modal.component.html',
  styleUrls: ['./sheet-modal.component.scss'],
})
export class SheetModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() selectedBreed: string = '';

  getModal() {
    return this.modal;
  }
}
