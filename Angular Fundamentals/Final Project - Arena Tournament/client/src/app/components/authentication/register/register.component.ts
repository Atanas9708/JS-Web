import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth/auth.service';
import { NotificationService } from './../../../services/notification/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string;
  username: string;
  password: string;
  repeatPass: string;

  constructor(
    private authService: AuthService,
    private notifyService: NotificationService,
    private router: Router) { }


  regUser(): void {
    let payload: object = {
      email: this.email,
      username: this.username,
      password: this.password,
      repeatPass: this.repeatPass,
      isAdmin: false
    };

    let checkedPayload = this.validateFields(payload);

    if (checkedPayload) {
      this.authService.registerUser(payload).subscribe(res => {
        this.notifyService.loadingAlert('Registering..');
        if (res['success']) {
          this.notifyService.successAlert('Registration successful!');          
          sessionStorage.setItem('authtoken', res['token']);
          sessionStorage.setItem('username', res['user']['username']);
          sessionStorage.setItem('userId', res['user']['userId']);
          sessionStorage.setItem('isAdmin', res['user']['isAdmin']);
          this.router.navigate(['/home']);
        } else {
          this.notifyService.errorAlert(res['message']);
        }
      },
        err => {
          this.notifyService.errorAlert(err.error.description);
        })
    }
  }

  validateFields(payload): boolean {

    if (!payload['email'] || !payload['username'] || !payload['password'] || !payload['repeatPass']) {
      this.notifyService.errorAlert('Please fill all the input fields.');
      return false;
    }

    if (payload['email'].length < 5) {
      this.notifyService.errorAlert('Email must be at least 5 characters long!');
      return false;
    }

    if (payload['username'].length < 5) {
      this.notifyService.errorAlert('Username must be at least 5 characters long!');
      return false;
    }

    if (payload['password'].length < 4) {
      this.notifyService.errorAlert('Password must be at least 4 characters long!');
      return false;
    }

    if (payload['password'] !== payload['repeatPass']) {
      this.notifyService.errorAlert('Passwords must match!');
      return false;
    }

    return true;
  }

}
