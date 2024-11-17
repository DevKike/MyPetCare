import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _alertController: AlertController) {}

  async presentConfirmAlert(
    header: string,
    message: string,
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this._alertController.create({
        header,
        message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => resolve(false),
          },
          {
            text: confirmText,
            handler: () => resolve(true),
          },
        ],
      });

      await alert.present();
    });
  }
}
