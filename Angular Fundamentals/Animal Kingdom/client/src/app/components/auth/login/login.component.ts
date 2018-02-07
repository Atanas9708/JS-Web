import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationService } from '../../../services/notification/notifiocation.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthService, private notify: NotificationService) { }

  login(): void {
    const payload = {
      email: this.email,
      password: this.password
    }

    const validatedForm = this.validateLoginForm(payload);

    if (validatedForm['success']) {
      this.authService.loginUser(payload).subscribe(res => {
        if (res['success']) {
          sessionStorage.setItem('token', res['token']);
          sessionStorage.setItem('username', res['user']['name']);
          this.notify.successAlert('Successful login!');
          this.router.navigate(['/list']);
        } else {
          this.notify.errorAlert(res['message']);
          this.router.navigate(['/login']);
        }
      })
    }
  }


  validateLoginForm(payload): object {
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
      isFormValid = false;
      this.notify.errorAlert('Please provide your email address.');
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
      isFormValid = false;
      this.notify.errorAlert('Please provide your password.');
    }

    if (!isFormValid) {
      message = 'Check the form for errors.';
    }

    return {
      success: isFormValid,
      message
    }
  }

}
