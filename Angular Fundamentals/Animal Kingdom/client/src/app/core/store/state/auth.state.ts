export interface AuthState {
  token: string,
  user: {
    username: string
  },
  isLogged: boolean
}