import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { NavigationService } from 'src/app/modules/shared/services/navigation/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  constructor(
    private readonly _authSrv: AuthService,
    private readonly _navSrv: NavigationService,
  ) {}

  ngOnInit() {}

  protected async doSignOut() {
    try {
      const isAuth = await this._authSrv.isAuth();
      if (isAuth) {
        await this._authSrv.singOut();
        this._navSrv.navigateBack('principal');
      }
    } catch (error) {
      throw error;
    }
  }

  protected async doDeleteAccount() {
    try {

    } catch (error) {
      throw error;
    }
  }

  private initForm() {
 
  }
}
