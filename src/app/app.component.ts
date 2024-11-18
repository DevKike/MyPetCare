import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _authSrv: AuthService,
    private readonly _router: Router,
  ) {}

  async ngOnInit() {
    const isAuth = await this._authSrv.isAuth();

    if (isAuth) {
      this._router.navigate(['/home']);
    } else {
      this._router.navigate(['/slide']);
    }
  }
}
