import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  async showToast(message: string, duration: 'short' | 'long' = 'short' , position: 'top' | 'center' | 'bottom' = 'bottom') {
    await Toast.show( {
      text: message,
      duration: duration,
      position: position
    });   
  }
}
