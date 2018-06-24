import { initialState, AnimalState } from "../state/animal.state";

export function animalReducer(state = initialState, action): AnimalState {
  switch (action.type) {
    default: return state;
  }
}