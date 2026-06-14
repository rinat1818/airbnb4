import { storageService } from './storageService.js'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const STORAGE_KEY = 'users'

_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    query,
}

function query() {
    return storageService.query(STORAGE_KEY)
}

async function login(username, password) {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
        return user
    }
    return Promise.reject('Invalid username or password')
}

async function signup(userCred) {
    if (!userCred.imgUrl) {
        userCred.imgUrl = 'https://robohash.org/' + userCred.username + '?set=set2'
    }
    userCred.score = 10000

    const user = await storageService.post(STORAGE_KEY, userCred)
    return login(user.username, user.password)
}

function logout() {
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
            {
                _id: 'u101',
                fullname: 'User 1',
                imgUrl: 'https://robohash.org/user1?set=set2',
                username: 'user1',
                password: 'secret',
            },
            {
                _id: 'u102',
                fullname: 'User 2',
                imgUrl: 'https://robohash.org/user2?set=set2',
                username: 'user2',
                password: 'secret',
            },
        ]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    }
}