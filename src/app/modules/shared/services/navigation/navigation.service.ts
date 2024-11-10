import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly _navCtrl: NavController) {}

  public async navigateTo(url: string) {
    await this._navCtrl.navigateForward(url);
  }

  public async navigateBack(url: string) {
    await this._navCtrl.navigateBack(url);
  }

  public async navigateRoot(url: string) {
    await this._navCtrl.navigateRoot(url);
  }
}
