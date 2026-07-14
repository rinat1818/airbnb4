import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import '../assets/styles/pages/BookingConfirm.css'

export function BookingConfirm() {
    const navigate = useNavigate()
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const [booking, setBooking] = useState(null)
    const [confirmed, setConfirmed] = useState(false)

    useEffect(() => {
        const pending = sessionStorage.getItem('pendingBooking')
        if (!pending) { navigate('/'); return }
        setBooking(JSON.parse(pending))
    }, [])

    function onConfirm() {
        setConfirmed(true)
        sessionStorage.removeItem('pendingBooking')
    }

    if (!booking) return null

    const checkIn = new Date(booking.checkIn)
    const checkOut = new Date(booking.checkOut)
    const formatDate = date => date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })

    const totalGuests = booking.guests.adults + booking.guests.children
    const guestSummary = [
        totalGuests > 0 && `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`,
        booking.guests.infants > 0 && `${booking.guests.infants} infant${booking.guests.infants > 1 ? 's' : ''}`,
        booking.guests.pets > 0 && `${booking.guests.pets} pet${booking.guests.pets > 1 ? 's' : ''}`
    ].filter(Boolean).join(', ')

    if (confirmed) return (
        <section className="booking-confirm">
            <div className="booking-success">
                <div className="booking-success-icon">✓</div>
                <h1>You're going to {booking.stayCity}!</h1>
                <p>Your reservation at <strong>{booking.stayName}</strong> is confirmed.</p>
                <p className="booking-success-dates">{formatDate(checkIn)} → {formatDate(checkOut)}</p>
                <button className="btn-confirm" onClick={() => navigate('/')}>Back to home</button>
            </div>
        </section>
    )

    return (
        <section className="booking-confirm">
            <button className="btn-back-confirm" onClick={() => navigate(-1)}>Back</button>

            <h1>Confirm your reservation</h1>
            {loggedinUser && (
                <p className="booking-greeting">Hi <strong>{loggedinUser.fullname}</strong>, review your trip details below</p>
            )}

            <div className="booking-confirm-layout">

                <div className="booking-confirm-details">

                    <div className="booking-confirm-section">
                        <h2>Your trip</h2>

                        <div className="booking-confirm-row">
                            <div className="booking-confirm-item">
                                <span className="booking-confirm-label">Check-in</span>
                                <span className="booking-confirm-value">{formatDate(checkIn)}</span>
                            </div>
                            <div className="booking-confirm-item">
                                <span className="booking-confirm-label">Check-out</span>
                                <span className="booking-confirm-value">{formatDate(checkOut)}</span>
                            </div>
                        </div>

                        <div className="booking-confirm-row">
                            <div className="booking-confirm-item">
                                <span className="booking-confirm-label">Duration</span>
                                <span className="booking-confirm-value">{booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
                            </div>
                            <div className="booking-confirm-item">
                                <span className="booking-confirm-label">Guests</span>
                                <span className="booking-confirm-value">{guestSummary}</span>
                            </div>
                        </div>
                    </div>

                    <hr className="confirm-divider" />

                    <div className="booking-confirm-section">
                        <h2>Price breakdown</h2>
                        <div className="booking-confirm-price-row">
                            <span>${booking.pricePerNight} × {booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
                            <span>${booking.totalPrice}</span>
                        </div>
                        <div className="booking-confirm-price-row booking-confirm-total">
                            <strong>Total (USD)</strong>
                            <strong>${booking.totalPrice}</strong>
                        </div>
                    </div>

                    <hr className="confirm-divider" />

                    <div className="booking-confirm-section">
                        <h2>Hosted by {booking.hostName}</h2>
                        <p className="booking-confirm-note">
                            By confirming, you agree that this is the best demo reservation and no actual charge will be made.
                        </p>
                    </div>

                    <button className="btn-confirm" onClick={onConfirm}>
                        Confirm reservation
                    </button>
                    <p className="booking-confirm-footnote">You won't be charged yet</p>
                </div>

                <div className="booking-confirm-property">
                    <div className="booking-confirm-card">
                        <img src={booking.stayImg} alt={booking.stayName} />
                        <div className="booking-confirm-card-info">
                            <p className="booking-confirm-card-type">{booking.stayType}</p>
                            <h3>{booking.stayName}</h3>
                            <p className="booking-confirm-card-location">{booking.stayCity}, {booking.stayCountry}</p>
                            <hr className="confirm-divider" />
                            <div className="booking-confirm-price-row">
                                <span>${booking.pricePerNight} / night</span>
                                <span>× {booking.nights} nights</span>
                            </div>
                            <div className="booking-confirm-price-row booking-confirm-total">
                                <strong>Total</strong>
                                <strong>${booking.totalPrice}</strong>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
