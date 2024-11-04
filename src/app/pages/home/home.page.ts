import { Component } from '@angular/core';
<<<<<<< HEAD:src/app/home/home.page.ts
import { LocalNotificationsService } from '../modules/shared/services/localNotifications/local-notifications.service';
import { ToastService } from '../modules/shared/services/toast/toast.service';

=======
import { LocalNotificationsService } from 'src/app/modules/shared/services/localNotifications/local-notifications.service';
>>>>>>> ca6971d89ed91b3f9c9f8854785f2eeedac52cf0:src/app/pages/home/home.page.ts
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private readonly _localNotificationSrv: LocalNotificationsService, private readonly _toastSrv: ToastService) {}

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
