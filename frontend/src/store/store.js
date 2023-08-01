import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import studyReducer from './study'

export default configureStore({
  reducer: {
    user: userReducer,
    study: studyReducer,
  },
})
