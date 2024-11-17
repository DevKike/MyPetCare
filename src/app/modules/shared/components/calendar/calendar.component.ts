import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() initialDate: string = '';
  @Output() dateSelected = new EventEmitter<string>();

  onDateChange(event: any) {
    const date = new Date(event.detail.value);
    const formattedDate = date.toISOString().split('T')[0];
    this.dateSelected.emit(formattedDate);
  }
}
