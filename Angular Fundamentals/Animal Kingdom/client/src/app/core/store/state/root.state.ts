import { AuthState } from "./auth.state";
import { AnimalState } from "./animal.state";

export interface RootState {
  auth: AuthState,
  animals: AnimalState
}