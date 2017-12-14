import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from './services/search/search.service';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification/notification.service';


import { Subject } from 'rxjs/Subject';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private targetedPost$ = new Subject<string>();
  public posts: object[] = [];

  public isLogged: boolean;
  public username: string;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private notifyService: NotificationService) {

    router.events.subscribe(e => {
      this.isLogged = sessionStorage.getItem('username') !== null;
      this.username = sessionStorage.getItem('username');
    });
  }

  ngOnInit() {
    this.targetedPost$.pipe(
      debounceTime(300),
      switchMap(p => this.searchService.searchPost(p))
    ).subscribe(res => {
      if (res.length === 0) {
        document.getElementById('post').style.display = 'none';
        document.getElementById('notFound').style.display = 'block';
      } else {
        document.getElementById('notFound').style.display = 'none';
        document.getElementById('post').style.display = 'block'; 
      }
       this.posts = res;      
    })
    //distinctUntilChanged removed
  }

  search(e): void {
    if (e.target.value === '') {
      document.getElementById('post').style.display = 'none';
      document.getElementById('notFound').style.display = 'none';
    } else {
      this.targetedPost$.next(e.target.value);
    }
  }

  logout(): void {
    this.isLogged = false;
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.notifyService.successAlert('Logout successful!');
  }

  ngOnDestroy(): void {
    this.targetedPost$.unsubscribe();
  }
}
