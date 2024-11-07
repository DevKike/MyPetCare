import { Component, Input, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss'],
})
export class CardModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() headerTitle!: string

  protected async cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  protected async confirm() {
    await this.modal.dismiss(true, 'confirm');
  }
}
