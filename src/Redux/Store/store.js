import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/moviesSlice'
import tvReducer from './reducers/tvSlice'
import peopleReducer from './reducers/peopleSlice'
import authReducer from '../Features/authSlice'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    people: peopleReducer,
    auth: authReducer,
  },
})
