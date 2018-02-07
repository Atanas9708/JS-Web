import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const userToken = sessionStorage.getItem('token');

      if (userToken === null || userToken === undefined || userToken.length !== 116) {
        this.router.navigate(['/login']);
        return false;
      }
    return true;
  }
}
