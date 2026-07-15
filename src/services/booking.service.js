import { httpService } from './http.service.js'

const STORAGE_KEY = 'booking'

export const bookingService = {
    query,
    getById,
    save,
    remove,
    getBookingsByUser,
    getBookingsByHost,
}

function query(filterBy = {}) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(bookingId) {
    return httpService.get(`${STORAGE_KEY}/${bookingId}`)
}

function save(booking) {
    if (booking._id) return httpService.put(`${STORAGE_KEY}/${booking._id}`, booking)
    return httpService.post(STORAGE_KEY, booking)
}

function remove(bookingId) {
    return httpService.delete(`${STORAGE_KEY}/${bookingId}`)
}

// Convenience wrappers - adjust query param names to match your backend
function getBookingsByUser(userId) {
    return httpService.get(STORAGE_KEY, { userId })
}

function getBookingsByHost(hostId) {
    return httpService.get(STORAGE_KEY, { hostId })
}