import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatsService } from './core/services/statistics/statistics.service';
import { NotificationService } from './core/services/notification/notifiocation.service';
import { Store } from '@ngrx/store';
import { RootState } from './core/store/state/root.state';
import { selectIsLogged } from './core/store/reducers/index';
import { AuthActions } from './core/store/actions/auth.action';


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
    private notify: NotificationService,
    private store$: Store<RootState>) {
    this.store$.select(selectIsLogged)
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });


    // this.router.events.subscribe(e => {
    //   this.isLogged = sessionStorage.getItem('token') !== null;
    //   this.username = sessionStorage.getItem('name');
    //   this.animalAndUserStats();
    // })
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
    // sessionStorage.clear();
    // this.notify.successAlert('Successful logout!');
    // this.router.navigate(['/login']);

    this.store$.dispatch(new AuthActions.LogoutAction());

  }

}
