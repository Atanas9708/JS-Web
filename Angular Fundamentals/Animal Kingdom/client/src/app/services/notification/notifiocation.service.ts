import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
  
  constructor(public toastr: ToastrService) { }

  successAlert(text: string, cb?) {
    this.toastr.success(text);
  }

  errorAlert(text: string, cb?) {
    this.toastr.error(text);
  }
}