
import { httpService } from './http.service.js'
import { storageService } from './storageService.js'

const USE_BACKEND = false
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const STORAGE_KEY = 'users'

if (!USE_BACKEND) _createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    query,
}

function query() {
    if (USE_BACKEND) return httpService.get('user')
    return storageService.query(STORAGE_KEY)
}

async function login(username, password) {
    if (USE_BACKEND) {
        const user = await httpService.post('auth/login', { username, password })
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    }
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    }
    return Promise.reject('Invalid username or password')
}

async function signup(userCred) {
    if (!userCred.imgUrl) {
        userCred.imgUrl = 'https://robohash.org/' + userCred.username + '?set=set5'
    }
    if (USE_BACKEND) {
        const user = await httpService.post('auth/signup', userCred)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    }
    userCred.score = 10000
    const user = await storageService.post(STORAGE_KEY, userCred)
    return login(user.username, user.password)
}

function logout() {
    if (USE_BACKEND) httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _createUsers() {
    let users = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!users || !users.length) {
        users = [
            { _id: 'u101', fullname: 'User 1', imgUrl: 'https://robohash.org/user1?set=set5', username: 'user1', password: 'user1', isAdmin: false },
            { _id: 'u102', fullname: 'User 2', imgUrl: 'https://robohash.org/user2?set=set5', username: 'user2', password: 'user2', isAdmin: false },
            { _id: 'u103', fullname: 'User 3', imgUrl: 'https://robohash.org/user3?set=set5', username: 'user3', password: 'user3', isAdmin: false },
            { _id: 'u104', fullname: 'User 4', imgUrl: 'https://robohash.org/user4?set=set5', username: 'user4', password: 'user4', isAdmin: false },
            { _id: 'u105', fullname: 'User 5', imgUrl: 'https://robohash.org/user5?set=set5', username: 'user5', password: 'user5', isAdmin: false },
        ]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    }
}