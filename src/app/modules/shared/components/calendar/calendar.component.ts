import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent   {
  @Output() dateSelected = new EventEmitter<string>();


  onDateChange(event:any){
    const date = new Date(event.detail.value);
    const formattedDate = date.toISOString().split('T')[0];'YYYY-MM-DD'
    this.dateSelected.emit(formattedDate); 
  }

}
