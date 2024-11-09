import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  constructor(private readonly _authSrv: AuthService) {}

  ngOnInit() {}

  protected async signInWithGoogle() {
    try {
      const res = await this._authSrv.signInWithGoogle();
      console.log('🚀 ~ PrincipalPage ~ SignInWithGoogle ~ res:', res);
    } catch (error) {
      throw error;
    }
  }
}
