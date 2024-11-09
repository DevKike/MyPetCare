import { Component, Input,} from '@angular/core';
import { NavController } from '@ionic/angular';
import { ButtonColor, ButtonType } from 'src/app/types/Button';

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

  constructor(private readonly _navCtrl: NavController) { }

  public navigate() {
    if(this.ref) {
      this._navCtrl.navigateForward([this.ref]);
    }
  }

}
