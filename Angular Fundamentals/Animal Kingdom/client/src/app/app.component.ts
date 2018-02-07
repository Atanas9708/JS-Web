import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatsService } from './services/statistics/statistics.service';
import { NotificationService } from './services/notification/notifiocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isLogged: boolean;
  public username: string;
  public animals: number;
  public users: number;

  constructor(private router: Router,
    private statsService: StatsService,
    private notify: NotificationService) {
    this.router.events.subscribe(e => {
      this.isLogged = sessionStorage.getItem('token') !== null;
      this.username = sessionStorage.getItem('username');
      this.animalAndUserStats();
    })
  };

  ngOnInit(): void {
    this.animalAndUserStats();
  }

  animalAndUserStats(): void {
    this.statsService.getStats().subscribe(res => {
      this.animals = res['animals'];
      this.users = res['users'];
      sessionStorage.setItem('animals', String(this.animals));
    })
  }

  logout(): void {
    sessionStorage.clear();
    this.notify.successAlert('Successful logout!');
    this.router.navigate(['/login']);
  }

}
