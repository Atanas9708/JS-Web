import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationService } from '../../../services/notification/notifiocation.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string;
  name: string;
  password: string;

  constructor(private router: Router, private authService: AuthService, private notify: NotificationService) { }

  register(): void {
    const payload = {
      email: this.email,
      name: this.name,
      password: this.password
    };

    const validatedForm: object = this.validateSignupForm(payload);

    if (validatedForm['success']) {
      this.authService.registerUser(payload).subscribe(res => {
        if (res['success']) {
          this.notify.successAlert('Successful registration!');
          this.router.navigate(['/login']);
        } else {
          this.notify.errorAlert(res['message']);
        }
      })
    }
  }


  validateSignupForm(payload): object {
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string') {
      isFormValid = false;
      this.notify.errorAlert('Please provide a correct email address.');
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 4) {
      isFormValid = false;
      this.notify.errorAlert('Password must have at least 4 characters.');
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
      isFormValid = false;
      this.notify.errorAlert('Please provide your name.');
    }

    if (!isFormValid) {
      message = 'Check the form for errors.'
    }

    return {
      success: isFormValid,
      message
    }
  }
}
