import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: any;
  constructor(private readonly loandingCtrl: LoadingController) { }

  public async showLoanding(message: string = 'loanding...') {
    this.loading = await this.loandingCtrl.create ({
      message,
      spinner: 'crescent',
      cssClass: 'custom-loanding'
    });
    await this.loading.present();
  }

  public async hideLoanding() {
    if(this.loading) {
      await this.loading.dissmis();
      this.loading = null;
    }
  }
}
