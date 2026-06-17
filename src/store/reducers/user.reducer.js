const initialState = {
    loggedinUser: null,
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedinUser: action.user }
        case 'LOGOUT':
            return { ...state, loggedinUser: null }
        default:
            return state
    }
}