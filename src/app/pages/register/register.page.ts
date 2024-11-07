import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreCollection } from 'src/app/enums/FirestoreCollection';
import { IAuthUser, ICreateUser } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { FirestoreService } from 'src/app/modules/shared/services/firestore/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public email!: FormControl;
  public password!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public phoneNumber!: FormControl;
  public registerForm!: FormGroup;
  public uid: string = '';
  protected imageUrl: string = 'https://cdn-icons-png.freepik.com/512/6596/6596121.png';
  protected filePath!: string;
  private fileToUpload: any;

  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _authSrv: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  protected async doRegister() {
    try {

      const authUser: IAuthUser = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }

      const userData: ICreateUser = {
        name: this.registerForm.value.name,
        lastName: this.registerForm.value.lastName,
        age: this.registerForm.value.age,
        phoneNumber: this.registerForm.value.phoneNumber,
        imageUrl: this.registerForm.value.imageUrl
      }

      const res = await this._authSrv.register(authUser.email, authUser.password);
      const userId = res.user?.uid;

      await this._firestoreSrv.save(FirestoreCollection.USERS, userData, userId);
    } catch (error) {
      throw error;
    }
  }

  private initForm() {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.age = new FormControl('', [Validators.required, Validators.min(0)]);
    this.phoneNumber = new FormControl('', [Validators.required]);

    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      phone_number: this.phoneNumber,
    });
  }
}
