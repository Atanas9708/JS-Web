import { Injectable } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthActions } from "../actions/auth.action";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { RootState } from "../state/root.state";
import { NotificationService } from "../../services/notification/notifiocation.service";

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private store$: Store<RootState>,
    private notify: NotificationService) { }

  @Effect() login$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGIN)
    .switchMap((action: AuthActions.LoginAction) =>
      this.authService.loginUser(action.payload))
    .map(data => {
      this.notify.successAlert(data.message);
      this.router.navigate(['/']);
      return new AuthActions.LoginSuccessAction(data)
    })
    .catch(() => Observable.of({ type: 'LOGIN_FAILED' }));


  @Effect() register$: Observable<Action> = this.actions$
    .ofType(AuthActions.REGISTER)
    .switchMap((action: AuthActions.RegisterAction) =>
      this.authService.registerUser(action.payload))
    .map(data => {
      this.notify.successAlert(data.message);
      this.router.navigate(['/login']);
      return new AuthActions.RegisterSuccessAction(data)
    })
    .catch(() => Observable.of({ type: 'REGISTER_FAILED' }));


  @Effect() logout$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do((action: AuthActions.LogoutAction) => {
      return this.authService.logout();
    })
    .map(() => {
      this.notify.successAlert('Logout Successfull');
      this.router.navigate(['/login']);
      return new AuthActions.LogoutSuccessAction();
    })
}