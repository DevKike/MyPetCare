import { Component, Input } from '@angular/core';
import { ButtonSlot } from 'src/app/modules/shared/types/Button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() slot!: ButtonSlot;
  @Input() href!: string;

  constructor() {}
}
