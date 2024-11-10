import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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
  @Input() disabled: boolean = false;
  @Output() confirmAction = new EventEmitter<void>();

  private isProcessing = false;

  protected async cancel() {
    this.isProcessing = false;
    this.modal.dismiss(null, 'cancel');
  }

  protected async confirm() {
    if (!this.isProcessing) {
      this.isProcessing = true;
      this.confirmAction.emit();
      await this.modal.dismiss(true, 'confirm');
      this.isProcessing = false;
    }
  }
}
