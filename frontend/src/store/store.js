import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import studyReducer from './study'

const store = configureStore({
  reducer: {
    user: userReducer,
    study: studyReducer,
  },
})
export default store
