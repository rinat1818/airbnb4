import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { stayReducer } from './reducers/stay.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

const rootReducer = combineReducers({
  stayModule: stayReducer,
  userModule: userReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))