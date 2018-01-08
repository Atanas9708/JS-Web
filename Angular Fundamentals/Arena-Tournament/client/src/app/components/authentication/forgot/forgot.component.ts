import { Component } from '@angular/core';
import { UserService } from './../../../services/user/user.service';
import { NotificationService } from './../../../services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {

  public email: string;

  constructor(
    private userService: UserService,
    private notify: NotificationService,
    private router: Router) { }

  forgotPass() {
    let payload = {
      email: this.email
    };

    this.userService.forgotPass(payload).subscribe(res => {
      if (res['success']) {
        this.notify.successAlert(res['message']);
      } else {
        this.router.navigate(['/forgot']);
        this.notify.errorAlert(res['message']);
      }
    })
  }

}
