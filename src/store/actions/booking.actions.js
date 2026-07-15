import { bookingService } from '../../services/booking.service.js'

export function loadBookings(filterBy) {
    return async dispatch => {
        const bookings = await bookingService.query(filterBy)
        dispatch({ type: 'SET_BOOKINGS', bookings })
        return bookings
    }
}

export function addBooking(booking) {
    return async dispatch => {
        const savedBooking = await bookingService.save(booking)
        dispatch({ type: 'ADD_BOOKING', booking: savedBooking })
        return savedBooking
    }
}

export function removeBooking(bookingId) {
    return async dispatch => {
        await bookingService.remove(bookingId)
        dispatch({ type: 'REMOVE_BOOKING', bookingId })
    }
}