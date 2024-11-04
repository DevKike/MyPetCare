import { Component } from '@angular/core';
import { LocalNotificationsService } from 'src/app/modules/shared/services/localNotifications/local-notifications.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private readonly _localNotificationSrv: LocalNotificationsService) {}

  scheduleNotification() {
    this._localNotificationSrv.scheduleNotification(
      1,
      'Notificación de Prueba',
      'Esta es una notificación programada',
      'Get 30% discounts on own Application',
      'Exciting offers!!',
      'res://drawable/logo_64',
      'res://drawable/huella_48',

    ).then(() => {
      console.log('Notificación programada');
    }).catch(error => {
      console.error('Error programando notificación', error);
    });
  }

}
