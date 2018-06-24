import { ActionReducerMap, createSelector } from '@ngrx/store';
import { RootState } from '../state/root.state';
import { authReducer } from './auth.reducer';
import { animalReducer } from './animal.reducer';
import { AuthState } from '../state/auth.state';
import { AnimalState } from '../state/animal.state';


export const combineRootReducers: ActionReducerMap<RootState> = {
  auth: authReducer,
  animals: animalReducer
};

export const selectAuth = (state: RootState) => state.auth;
export const selectAnimals = (state: RootState) => state.animals;
export const selectAuthToken = createSelector(selectAuth, (state: AuthState) => state.token);
export const selectIsLogged = createSelector(selectAuth, (state: AuthState) => state.isLogged);
//export const selectStats = createSelector(selectAnimals, selectAuth);