import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FirebaseError, FirebaseErrorMessage } from 'src/app/enums/FirebaseError';
import { ToastMessages } from 'src/app/enums/ToastMessage';
import { IAuthUser } from 'src/app/interfaces/IUser';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { LoadingService } from 'src/app/modules/shared/services/loading/loading.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  protected email!: FormControl;

  protected password!: FormControl;
  protected signInForm!: FormGroup;

  constructor(
    private readonly _authSrv: AuthService,
    private readonly _navCtr: NavController,
    private readonly _loadingSrv: LoadingService,
    private readonly _toastSrv: ToastService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  protected async doSignIn() {
    await this._loadingSrv.showLoading();
    try {
      const authUser: IAuthUser = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      };

      await this._authSrv.login(authUser.email, authUser.password);
      await this._navCtr.navigateForward('/home');
      await this._toastSrv.showToast(ToastMessages.SIGN_IN_WITH_SUCCESS);
    } catch (error: any) {
      if (error.code === FirebaseError.AUTH_INVALID_CREDENTIAL) {
        this._toastSrv.showToast(FirebaseErrorMessage.AUTH_INVALID_CREDENTIAL, "short");
      }
      throw error;
    } finally {
      await this._loadingSrv.hideLoading();
    }
  }

  private initForm() {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', [Validators.required]);

    this.signInForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
}
