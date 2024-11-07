import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() label!: string;
  @Input() isClickable: boolean = false;
  @Output() itemClick = new EventEmitter<string>();

  protected onItemClick() {
    if (this.isClickable) {
      this.itemClick.emit(this.label);
    }
  }
}
