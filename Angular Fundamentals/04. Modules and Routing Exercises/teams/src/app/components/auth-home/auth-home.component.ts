import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-home',
  templateUrl: './auth-home.component.html',
  styleUrls: ['./auth-home.component.css']
})
export class AuthHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  attack(e) {
    this.router.navigate([`/attack/${e.target.value}`]);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
