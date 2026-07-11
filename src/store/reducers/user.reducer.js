const initialState = {
    loggedinUser: null,
    users: [],
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedinUser: action.user }
        case 'SET_USERS':
            return { ...state, users: action.users }
        case 'LOGOUT':
            return { ...state, loggedinUser: null }
        default:
            return state
    }
}