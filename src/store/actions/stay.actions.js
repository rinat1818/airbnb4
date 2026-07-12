import { stayService } from '../../services/stayService.js'

export function loadStays() {
  return dispatch => {
    return stayService.query()
      .then(stays => {
        dispatch({ type: 'SET_STAYS', stays })
        return stays
      })
  }
}

export function removeStay(stayId) {
  return dispatch => {
    return stayService.remove(stayId)
      .then(() => {
        dispatch({ type: 'REMOVE_STAY', stayId })
      })
  }
}

export function saveStay(stay) {
  return dispatch => {
    return stayService.save(stay)
      .then(savedStay => {
        const type = stay._id ? 'UPDATE_STAY' : 'ADD_STAY'
        dispatch({ type, stay: savedStay })
        return savedStay
      })
  }
}

export function setFilter(filterBy) {
  return dispatch => {
    dispatch({ type: 'SET_FILTER', filterBy })
  }
}