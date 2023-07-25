import { combineReducers } from 'redux'
import study from './modules/study'
import user from './modules/user'

const rootReducer = combineReducers({ study, user })

export default rootReducer
