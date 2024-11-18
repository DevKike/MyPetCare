import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { ToastDuration, ToastPosition } from 'src/app/modules/shared/types/Toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  async showToast(message: string, duration: ToastDuration = 'short' , position: ToastPosition = 'bottom') {
    await Toast.show( {
      text: message,
      duration: duration,
      position: position
    });   
  }
}
