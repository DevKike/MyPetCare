import { Component, Input } from '@angular/core';
import { ButtonColor, ButtonExpand, ButtonFill, ButtonSlot, ButtonType } from 'src/app/modules/shared/types/Button';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label!: string ;
  @Input() type: ButtonType = 'button';
  @Input() disabled: boolean = false;
  @Input() ref!: string;
  @Input() icon?: string;
  @Input() color: ButtonColor = 'primary';
  @Input() expand!: ButtonExpand;
  @Input() shape: string = 'round';
  @Input() fill: ButtonFill = 'solid';
  @Input() slot!: ButtonSlot;


  constructor(private readonly _navSrv: NavigationService) {}

  public async navigate() {
    if (this.ref) {
      await this._navSrv.navigateTo(this.ref);
    }
  }
}
