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

  constructor(private readonly _toastSrv: ToastService) {}
  ngOnInit() {
    this.animate = true;
  }



}
