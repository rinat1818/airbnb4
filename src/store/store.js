import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { stayReducer } from './reducers/stay.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { bookingReducer } from './reducers/booking.reducer.js'

const rootReducer = combineReducers({
  stayModule: stayReducer,
  userModule: userReducer,
  bookingModule: bookingReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))