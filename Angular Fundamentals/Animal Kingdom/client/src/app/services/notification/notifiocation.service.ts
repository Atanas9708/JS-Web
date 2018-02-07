import { Injectable } from '@angular/core';
declare const Materialize: any;

@Injectable()
export class NotificationService {
  
  successAlert(text: string, cb?) {
    Materialize.toast(text, 2000, 'green lighten-1', cb);
  }

  errorAlert(text: string, cb?) {
    Materialize.toast(text, 3000, 'red lighten-1', cb);
  }
}