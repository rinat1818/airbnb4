import { httpService } from './http.service.js'
import { storageService } from './storageService.js'
import { users } from '../data/users.js'


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
    getById,
    update,
}

function query() {
    if (USE_BACKEND) return httpService.get('user')
    return storageService.query(STORAGE_KEY)
}

async function getById(userId) {
    if (USE_BACKEND) return httpService.get(`user/${userId}`)
    const savedUsers = await storageService.query(STORAGE_KEY)
    return savedUsers.find(u => u._id === userId)
}

async function update(user) {
    if (USE_BACKEND) {
        const savedUser = await httpService.put(`user/${user._id}`, user)
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(savedUser))
        return savedUser
    }
    const savedUsers = await storageService.query(STORAGE_KEY)
    const idx = savedUsers.findIndex(u => u._id === user._id)
    if (idx === -1) return Promise.reject('User not found')
    savedUsers[idx] = user
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedUsers))
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
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
    let savedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!savedUsers || !savedUsers.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    }
}