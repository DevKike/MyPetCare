import { Component, OnInit } from '@angular/core';
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
  constructor(
    private readonly _firestoreSrv: FirestoreService,
    private readonly _authSrv: AuthService
  ) {}

  ngOnInit() {}

  protected async doRegister() {
    try {
      const authUser: IAuthUser = {
        email: 'alvarito@gmail.com',
        password: 'alvaro123',
      };

      const newUser: ICreateUser = {
        name: 'John',
        lastName: 'John',
        age: 23,
        phoneNumber: 3013259938,
      };

      const res = await this._authSrv.register(authUser.email, authUser.password);
      const userId = res.user?.uid;

      await this._firestoreSrv.save(FirestoreCollection.USERS, newUser, userId);
    } catch (error) {
      throw error;
    }
  }
}
