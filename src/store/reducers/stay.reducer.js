const initialState = {
  stays: [],
   filterBy: { location: '', startDate: null, endDate: null, guests: { adults: 0, children: 0, infants: 0, pets: 0 } }
}

export function stayReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_STAYS':
      return { ...state, stays: action.stays }
    case 'REMOVE_STAY':
      return { ...state, stays: state.stays.filter(s => s._id !== action.stayId) }
    case 'ADD_STAY':
      return { ...state, stays: [...state.stays, action.stay] }
    case 'UPDATE_STAY':
      return { ...state, stays: state.stays.map(s => s._id === action.stay._id ? action.stay : s) }
      case 'SET_FILTER':
    return { ...state, filterBy: action.filterBy }
    default:
      return state
  }
}