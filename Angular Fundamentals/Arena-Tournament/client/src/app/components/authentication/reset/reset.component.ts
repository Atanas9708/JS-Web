import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user/user.service';
import { NotificationService } from './../../../services/notification/notification.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent {

  public password: string;
  public repeatPass: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private notify: NotificationService
  ) { }

  resetPassword() {
    let validatedPass = this.passwordValidation(this.password, this.repeatPass);

    if (validatedPass) {
      let token = this.activatedRoute.snapshot.params['token'];
      let payload = {
        token,
        password: this.password,
        repeatPass: this.repeatPass
      }

      this.userService.resetPass(payload).subscribe(res => {
        if (res['success']) {
          this.notify.successAlert(res['message']);
          this.router.navigate(['/login']);
        }
      })
    }

  }

  passwordValidation(password, repeatPassword) {
    if (password.length < 4) {
      this.notify.errorAlert('Passowrd must be at least 4 characters long!');
      return false;
    }

    if (password !== repeatPassword) {
      this.notify.errorAlert('Passowrds must match!');
      return false;
    }

    return true;
  }

}
