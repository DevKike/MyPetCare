import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-sheet-modal',
  templateUrl: './sheet-modal.component.html',
  styleUrls: ['./sheet-modal.component.scss'],
})
export class SheetModalComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  constructor() { }

  ngOnInit() {}

  closeModal() {
    this.modal.dismiss();
  }



}
