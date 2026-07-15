const initialState = {
    bookings: [],
}

export function bookingReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOOKINGS': {
            const merged = [...state.bookings]
            action.bookings.forEach(booking => {
                const idx = merged.findIndex(b => b._id === booking._id)
                if (idx === -1) merged.push(booking)
                else merged[idx] = booking
            })
            return { ...state, bookings: merged }
        }
        case 'ADD_BOOKING':
            return { ...state, bookings: [...state.bookings, action.booking] }
        case 'REMOVE_BOOKING':
            return { ...state, bookings: state.bookings.filter(b => b._id !== action.bookingId) }
        default:
            return state
    }
}