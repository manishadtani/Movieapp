import { configureStore } from '@reduxjs/toolkit'
import { personSlice } from './reducers/personSlice'
import { movieSlice } from './reducers/movieSlice'
import { tvSlice } from './reducers/tvSlice'


export const store = configureStore({
  reducer: {
    person: personSlice.reducer,
    movie: movieSlice.reducer,
    tv: tvSlice.reducer
  }
})