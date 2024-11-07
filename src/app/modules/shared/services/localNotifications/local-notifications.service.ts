import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LocalNotificationsService {
  constructor() {
    this.initialize();
  }

  async initialize() {
    const permission = await LocalNotifications.requestPermissions();

    await Preferences.set({
      key: 'notificationPermission',
      value: permission.display === 'granted' ? 'true' : 'false',
    });


  }

  async checkNotificationPermission(): Promise<boolean> {
    const { value } = await Preferences.get({ key: 'notificationPermission' });
    return value === 'true';
  }

  async scheduleNotification(
    id: number,
    title: string,
    body: string,
    largeBody: string,
    summaryText: string,
    largeIcon: string,
    smallIcon: string
  ) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: id,
          title: title,
          body: body,
          largeBody: largeBody,
          summaryText: summaryText,
          largeIcon: largeIcon,
          smallIcon: smallIcon,
        },
      ],
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
