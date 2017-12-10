import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  public team: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.team = sessionStorage.getItem('team');
  }

  back(): void {
    this.router.navigate(['/logged']);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
