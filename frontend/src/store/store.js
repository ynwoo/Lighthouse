import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import studyReducer from './study'
import chatReducer from './chat'

const store = configureStore({
  reducer: {
    user: userReducer,
    study: studyReducer,
    chat: chatReducer,
  },
})
export default store
