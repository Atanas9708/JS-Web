import { Action } from '@ngrx/store';

export namespace AuthActions {
  export const LOGIN = 'LOGIN';
  export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  export const LOGIN_FAIL = 'LOGIN_FAIL';
  export const REGISTER = 'REGISTER';
  export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
  export const REGISTER_FAIL = 'REGISTER_FAIL';
  export const LOGOUT = 'LOGOUT';
  export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

  export class LoginAction implements Action {
    readonly type = LOGIN;

    constructor(public payload: { email: string, password: string }) { }
  }

  export class LoginSuccessAction implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: any) { }
  }

  export class LoginFailAction implements Action {
    readonly type = LOGIN_FAIL;

    constructor(public paylaod: any) { }
  }

  export class RegisterAction implements Action {
    readonly type = REGISTER;

    constructor(public payload: { email: string, name: string, password: string }) { }
  }

  export class RegisterSuccessAction implements Action {
    readonly type = REGISTER_SUCCESS;

    constructor(public payload: any) { }
  }

  export class RegisterFailAction implements Action {
    readonly type = REGISTER_FAIL;

    constructor(public payload: any) { }
  }

  export class LogoutAction implements Action {
    readonly type = LOGOUT;
    
    constructor() { }
  }

  export class LogoutSuccessAction implements Action {
    readonly type = LOGOUT_SUCCESS;

    constructor() {  }
  }

  export type Actions = 
    LoginAction |
    LoginSuccessAction |
    LoginFailAction |
    RegisterAction |
    RegisterSuccessAction |
    RegisterFailAction |
    LogoutAction |
    LogoutSuccessAction
}