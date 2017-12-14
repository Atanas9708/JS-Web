import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';
import { NotificationService } from './../../../services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private notifyService: NotificationService,
    private router: Router
  ) { }

  logUser(): void {
    this.notifyService.loadingAlert('Logging..');
    let payload: object = {
      username: this.username,
      password: this.password
    };

    this.authService.loginUser(payload).subscribe(res => {
      if (!res['error']) {
        this.notifyService.successAlert('Login successful!');
        sessionStorage.setItem('authtoken', res['_kmd']['authtoken']);
        sessionStorage.setItem('username', res['username']);
        sessionStorage.setItem('userId', res['_id']);
        if (res['_kmd']['roles'] !== undefined) {
          sessionStorage.setItem('isAdmin', 'true')
        }
        this.router.navigate(['/home']);

      }
    },
      err => {
        this.notifyService.errorAlert(err.error.description);
      })
  }
}
