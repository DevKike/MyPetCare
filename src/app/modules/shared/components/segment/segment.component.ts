import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss'],
})
export class SegmentComponent {
  protected selectedOption!: string;

  @Input() firstOptionLabel!: string;
  @Input() secondOptionLabel!: string;

  constructor() {}

  protected onOptionChange(event: any) {
    const selectedValue = event.detail.value;
    this.selectedOption = selectedValue === 'first' ? this.firstOptionLabel : this.secondOptionLabel;
  }
}
