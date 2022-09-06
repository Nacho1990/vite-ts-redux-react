import { Person } from '../models/people';
import { configureStore } from '@reduxjs/toolkit'
import { favotiresSlice, peopleSlice } from './states';

export interface AppStore{
  people: Person[];
  favorites: Person[];
}

export default configureStore<AppStore>({
  reducer: {
    people: peopleSlice.reducer,
    favorites: favotiresSlice.reducer,
  }
})