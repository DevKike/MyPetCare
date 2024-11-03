import { Component } from '@angular/core';
import { LocalNotificationsService } from '../modules/shared/services/localNotifications/local-notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private readonly _localNotificationSrv: LocalNotificationsService) {}

  scheduleNotification() {
    this._localNotificationSrv.scheduleNotification(
      'Notificación de Prueba',
      'Esta es una notificación programada',
      1
    ).then(() => {
      console.log('Notificación programada');
    }).catch(error => {
      console.error('Error programando notificación', error);
    });
  }

}
