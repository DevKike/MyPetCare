import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private readonly _navCtrl: NavController) {}

  public navigateTo(url: string) {
    this._navCtrl.navigateForward(url);
  }

  public navigateBack(url: string) {
    this._navCtrl.navigateBack(url);
  }

  public navigateRoot(url: string) {
    this._navCtrl.navigateRoot(url);
  }
}
