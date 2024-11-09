import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ButtonColor, ButtonType } from 'src/app/types/Button';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: ButtonType = 'button';
  @Input() disabled: boolean = false;
  @Input() ref!: string;
  @Input() icon?: string;
  @Input() color: ButtonColor = 'primary';
  @Input() expand!: string;
  @Input() shape!: string;

  constructor(private readonly _navSrv: NavigationService) {}

  public navigate() {
    if (this.ref) {
      this._navSrv.navigateTo(this.ref);
    }
  }
}
