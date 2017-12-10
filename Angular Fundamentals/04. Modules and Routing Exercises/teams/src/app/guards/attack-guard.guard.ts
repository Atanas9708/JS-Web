import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AttackGuard implements CanActivate {
  constructor(private router: Router) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      let targetedTeam = next.params['team'];
      let userTeam = sessionStorage.getItem('team');

      if (targetedTeam === userTeam) {
        this.router.navigate(['/forbidden']);
        return false;
      }

    return true;
  }
}
