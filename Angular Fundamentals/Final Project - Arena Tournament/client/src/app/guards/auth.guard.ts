import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../services/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let currentUserId = sessionStorage.getItem('userId');
      this.userService.getCurrentUser(currentUserId).subscribe(res =>{
        if (!res['success']) {
          this.router.navigate(['/login']);
        }
      }, err => {
        this.router.navigate(['/login']);
        return false;
      });
    return true;
  }
}
