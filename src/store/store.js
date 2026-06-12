import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { stayReducer } from './reducers/stay.reducer.js'

const rootReducer = combineReducers({
  stayModule: stayReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))