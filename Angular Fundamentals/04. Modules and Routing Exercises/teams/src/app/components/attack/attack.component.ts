import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit {

  public team: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.team = this.activatedRoute.snapshot.params['team'];
  }

  back(): void {
    this.router.navigate(['/logged']);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }

}
