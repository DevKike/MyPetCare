import { Component, OnInit } from '@angular/core';
import { LocalNotificationsService } from 'src/app/modules/shared/services/localNotifications/local-notifications.service';
import { ToastService } from 'src/app/modules/shared/services/toast/toast.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  animate = false;

  constructor(private readonly _localNotificationSrv: LocalNotificationsService, private readonly _toastSrv: ToastService) {}
  ngOnInit() {
    this.animate = true;
  }

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
