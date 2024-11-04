import { Component } from '@angular/core';
import { LocalNotificationsService } from '../modules/shared/services/localNotifications/local-notifications.service';
import { ToastService } from '../modules/shared/services/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private readonly _localNotificationSrv: LocalNotificationsService, private readonly _toastSrv: ToastService) {}

  scheduleNotification() {
    this._localNotificationSrv.scheduleNotification(
      'Notificación de Prueba',
      'Esta es una notificación programada',
      1
    ).then(() => {
      console.log('Notificación programada');
      this._toastSrv.showToast('notificacion programada con existo', 'long' , 'center')
    }).catch(error => {
      console.error('Error programando notificación', error);
      this._toastSrv.showToast('error al notiificar')
    });
  }

  showSuccesToast() {
    this._toastSrv.showToast('operacion reaalizada,' ,'long', 'center');
  }

}
