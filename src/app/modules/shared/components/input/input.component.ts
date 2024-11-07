import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputType } from 'src/app/types/InputType';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() type!: InputType;
  @Input() fill!: string;
  @Input() label!: string;
  @Input() placeHolder!: string;
  @Input() helperText!: string;
  @Input() errorText!: string;
  @Input() model: any;
  @Input() isEmail: boolean = false;
  @Input() control!: FormControl;

  constructor() {}

  public keyUp(event: any) {
    this.control.setValue(event.target.value);
  }
}
