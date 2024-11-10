import { Component, Input,} from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() ref!: string;
  @Input() icon?: string;
  @Input() color!:  'primary' | 'dark' | 'medium';
  @Input() expand!: 'block' | 'full';
  @Input() fill!: 'clear' | 'outline' | 'solid'
  @Input() slot!: 'start' | 'end'


  constructor(private readonly _navCtrl: NavController) { }

  public navigate() {
    if(this.ref) {
      this._navCtrl.navigateForward([this.ref]);
    }
  }

}
