import { userService } from '../../services/user.service.js'

export function login(credentials) {
    return async dispatch => {
        const user = await userService.login(credentials.username, credentials.password)
        dispatch({ type: 'SET_USER', user })
        return user
    }
}

export function signup(credentials) {
    return async dispatch => {
        const user = await userService.signup(credentials)
        dispatch({ type: 'SET_USER', user })
        return user
    }
}

export function logout() {
    return async dispatch => {
        await userService.logout()
        dispatch({ type: 'LOGOUT' })
    }
}

export function loadUser() {
    return dispatch => {
        const user = userService.getLoggedinUser()
        dispatch({ type: 'SET_USER', user })
    }
}

export function setFilter(filterBy) {
    return dispatch => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}