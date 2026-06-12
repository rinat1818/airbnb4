import { stayService } from '../../services/stayService.js'

export function loadStays() {
  return dispatch => {
    stayService.query()
      .then(stays => {
        dispatch({ type: 'SET_STAYS', stays })
      })
  }
}

export function removeStay(stayId) {
  return dispatch => {
    stayService.remove(stayId)
      .then(() => {
        dispatch({ type: 'REMOVE_STAY', stayId })
      })
  }
}

export function saveStay(stay) {
  return dispatch => {
    stayService.save(stay)
      .then(savedStay => {
        const type = stay._id ? 'UPDATE_STAY' : 'ADD_STAY'
        dispatch({ type, stay: savedStay })
      })
  }
}