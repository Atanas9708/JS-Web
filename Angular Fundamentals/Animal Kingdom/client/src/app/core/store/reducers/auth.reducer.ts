import { AuthState } from "../state/auth.state";
import { AuthActions } from "../actions/auth.action";

const initialState: AuthState = {
  token: sessionStorage.getItem('token'),
  user: null,
  isLogged: null
};

export function authReducer(state = initialState, action: AuthActions.Actions): AuthState {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      const authData = action.payload;
      sessionStorage.setItem('token', authData.token);
      sessionStorage.setItem('name', authData.user.name);
      return Object.assign({}, state, {
        token: authData.token,
        user: {
          username: authData.user.name
        },
        isLogged: true
      });
    case AuthActions.REGISTER_SUCCESS:
      if (action.payload['success']) { }
    case AuthActions.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        token: sessionStorage.getItem('token'),
        user: null,
        isLogged: null
      });
    default: return state;
  }
}