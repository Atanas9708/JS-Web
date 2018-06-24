import { Animal } from "../../models/view-models/animal.view.model";

export interface AnimalState {
  animals: Array<Animal>,
  stats: object
}

export const initialState: AnimalState = {
  animals: [],
  stats: {
    users: 0,
    animals: 0
  }
} 