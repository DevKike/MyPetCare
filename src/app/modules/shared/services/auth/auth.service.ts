import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _angularFire: AngularFireAuth) {}

  public async register(email: string, password: string) {
    return await this._angularFire.createUserWithEmailAndPassword(email, password);
  }

  public async login(email: string, password: string) {
    return await this._angularFire.signInWithEmailAndPassword(email, password);
  }

  public async logout() {
    const logoutRes = await this._angularFire.signOut();
  }

  public async isAuth() {
    const user = await this._angularFire.currentUser;
    return !!user;
  }

  public async getAuthUserId() {
    const user = await this._angularFire.currentUser;
    return user?.uid;
  }
}
