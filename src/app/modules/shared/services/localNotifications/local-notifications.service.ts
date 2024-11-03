import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor() {
    this.initialize();
   }

   async initialize() {

    await LocalNotifications.requestPermissions();
  }

  async scheduleNotification(title: string, body: string, id: number) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: id,

        }
      ]
    });
  }

  async getPendingNotifications() {
    const pending = await LocalNotifications.getPending();
    return pending;
  }

  async cancelNotification(id: number) {
    await LocalNotifications.cancel({ notifications: [{ id }] });
  }
}
