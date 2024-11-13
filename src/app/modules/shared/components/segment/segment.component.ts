import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent {
  protected selectedOption!: string;

  @Input() firstOptionLabel!: string;
  @Input() secondOptionLabel!: string;
  @Output() optionChange = new EventEmitter<string>();

  constructor() {}

  protected onOptionChange(event: any) {
    const selectedValue = event.detail.value;
    this.selectedOption = selectedValue === 'first' ? this.firstOptionLabel : this.secondOptionLabel;
    this.optionChange.emit(this.selectedOption);
  }
}
