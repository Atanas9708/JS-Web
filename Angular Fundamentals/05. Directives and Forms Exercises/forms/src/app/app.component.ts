import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';
import { PasswordValidation } from './validatePass';

const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public register: FormGroup;

  constructor(private fb: FormBuilder, private validatorService: ValidatorService) { }

  ngOnInit(): void {
    this.register = this.fb.group({
      mail: ['', [Validators.required, Validators.pattern(new RegExp(mailRegex)), this.checkMail.bind(this)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      auth: this.fb.group({
        password: ['', [Validators.required]],
        repeatPass: ['', [Validators.required]]
      }, {
          validator: PasswordValidation.MatchPassword
        }),
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', []],
      zip: ['', []]

    })
  }

  checkMail(v) {
    return this.validatorService.validateMail(v.value) ? null : { duplicate: true };
  }

  submit(e): void {
    console.log(e);
  }

}
