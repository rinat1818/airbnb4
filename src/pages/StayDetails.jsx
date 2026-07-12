import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { useSelector } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { stayService } from '../services/stayService.js'

export function StayDetails() {
    const { stayId } = useParams()
    const navigate = useNavigate()
    const [stay, setStay] = useState(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    // const [checkIn, setCheckIn] = useState(null)
    // const [checkOut, setCheckOut] = useState(null)
    // const [guests, setGuests] = useState(1)

    const filterBy = useSelector(state => state.stayModule.filterBy)
const [checkIn, setCheckIn] = useState(filterBy.startDate || null)
const [checkOut, setCheckOut] = useState(filterBy.endDate || null)
const [guests, setGuests] = useState({ adults: filterBy.guests?.adults || 1, children: filterBy.guests?.children || 0, infants: filterBy.guests?.infants || 0, pets: filterBy.guests?.pets || 0 })
const [guestsOpen, setGuestsOpen] = useState(false)


    const [toast, setToast] = useState(null) 
    const [toastVisible, setToastVisible] = useState(false)

    

    useEffect(() => {
        stayService.get(stayId)
            .then(stay => setStay(stay))
            .catch(err => {
                console.error('Failed to load stay:', err)
                navigate('/')
            })
    }, [stayId])

    function showToast(message, type = 'success') {
        setToast({ message, type })
        setToastVisible(true)
        setTimeout(() => setToastVisible(false), 3500)
        setTimeout(() => setToast(null), 4000)
    }

    if (!stay) return <div className="loading">Loading...</div>
const avgRating = stay.reviews?.length
    ? (stay.reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / stay.reviews.length).toFixed(1)
    : null
    // const avgRating = stay.reviews.length
    //     ? (stay.reviews.reduce((sum, r) => sum + (r.rate || 0), 0) / stay.reviews.length).toFixed(1)
    //     : null

    const nights = checkIn && checkOut
        ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
        : 0
    const totalPrice = nights * stay.price

    const totalGuests = guests.adults + guests.children
    const guestSummary = [
        totalGuests > 0 && `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`,
        guests.infants > 0 && `${guests.infants} infant${guests.infants > 1 ? 's' : ''}`,
        guests.pets > 0 && `${guests.pets} pet${guests.pets > 1 ? 's' : ''}`
    ].filter(Boolean).join(', ')

    function updateGuests(type, delta) {
        setGuests(prev => {
            const next = { ...prev, [type]: Math.max(0, prev[type] + delta) }
            if (type === 'adults') next.adults = Math.max(1, next.adults)
            if ((next.adults + next.children) > stay.capacity) return prev
            return next
        })
    }

    function onReserve() {
        if (!checkIn || !checkOut) {
            showToast('Please select check-in and check-out dates', 'error')
            return
        }
        if (nights < 1) {
            showToast('Check-out must be after check-in', 'error')
            return
        }
        showToast(`Reservation confirmed! ${nights} night${nights > 1 ? 's' : ''} · ${guestSummary} · $${totalPrice} total`, 'success')
    }

    return (
        <section className="stay-details">

            {toast && (
                <div className={`toast toast-${toast.type} ${toastVisible ? 'toast-enter' : 'toast-exit'}`}>
                    <span>{toast.type === 'success' ? '✓' : '✕'}</span>
                    {toast.message}
                </div>
            )}

            <button onClick={() => navigate(-1)} className="btn-back"></button>
            <h1>{stay.name}</h1>
            {/* <div className="stay-meta">
                {avgRating && <span>⭐ {avgRating} · {stay.reviews.length} reviews</span>}
                <br />
                <span>{stay.loc.city}, {stay.loc.country}</span>
            </div> */}

            <div className={`photo-grid photos-${Math.min(stay.imgUrls.length, 5)}`}>
                {stay.imgUrls.slice(0, 5).map((url, idx) => (
                    <div key={idx} className={`photo-cell ${idx === 0 ? 'photo-main' : ''}`}>
                        <img src={url} alt={`${stay.name} photo ${idx + 1}`} />
                    </div>
                ))}
                <button className="btn-show-photos" onClick={() => setShowAllPhotos(true)}>
                    Show all photos
                </button>
            </div>

            <div className="details-layout">

                <div className="details-body">
                    <div className="host-info">
                        <img
                            // src={stay.host.imgUrl}
                            src={stay.host?.imgUrl}

alt={stay.host?.fullname}
                            // alt={stay.host.fullname}
                            className="host-avatar"
                        />
                        <div>

                            <h2>Hosted by {stay.host?.fullname}</h2>
                            {/* <h2>Hosted by {stay.host.fullname}</h2> */}
                            <p>{stay.type} · Up to {stay.capacity} guests</p>
                        </div>
                    </div>

                    <hr />

                    <div className="stay-description">
                        <h2>About this place</h2>
                        <p>{stay.summary}</p>
                    </div>

                    <hr />

                    <div className="stay-amenities">
                        <h2>What this place offers</h2>
                        <ul>
                            {stay.amenities.map((amenity, index) => (
    <li key={`${amenity}-${index}`}>{amenity}</li>
))}
                            {/* {stay.amenities.map(amenity => (
                                <li key={amenity}>{amenity}</li>
                            ))} */}
                        </ul>
                    </div>
                </div>

                <div className="booking-widget">
                    <div className="booking-price">
                        <span className="price">${stay.price}</span>
                        <span className="per-night"> / night</span>
                    </div>

                    {avgRating && (
                        <div className="booking-rating">
                            ⭐ {avgRating} · {stay.reviews.length} reviews
                        </div>
                    )}

                    <div className="booking-dates">
                        <div className="date-field">
                            <label>CHECK-IN</label>
                            <DatePicker
                                selected={checkIn}
                                onChange={date => {
                                    setCheckIn(date)
                                    if (checkOut && date >= checkOut) setCheckOut(null)
                                }}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={new Date()}
                                placeholderText="Add date"
                            />
                        </div>
                        <div className="date-field">
                            <label>CHECK-OUT</label>
                            <DatePicker
                                selected={checkOut}
                                onChange={date => setCheckOut(date)}
                                selectsEnd
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={checkIn || new Date()}
                                placeholderText="Add date"
                            />
                        </div>
                    </div>

                    <div className="guest-field">
                        <div className="guest-field-trigger" onClick={() => setGuestsOpen(o => !o)}>
                            <label>GUESTS</label>
                            <div className="guest-field-value">
                                <span>{guestSummary}</span>
                                <span className={`guest-chevron ${guestsOpen ? 'open' : ''}`}>⌃</span>
                            </div>
                        </div>

                        {guestsOpen && (
                            <div className="guest-dropdown">
                                {[
                                    { type: 'adults',   label: 'Adults',   sub: 'Age 13+' },
                                    { type: 'children', label: 'Children', sub: 'Ages 2–12' },
                                    { type: 'infants',  label: 'Infants',  sub: 'Under 2' },
                                    { type: 'pets',     label: 'Pets',     sub: null },
                                ].map(({ type, label, sub }) => (
                                    <div key={type} className="guest-row">
                                        <div className="guest-row-info">
                                            <span className="guest-row-label">{label}</span>
                                            {sub && <span className="guest-row-sub">{sub}</span>}
                                        </div>
                                        <div className="guest-row-counter">
                                            <button
                                                onClick={() => updateGuests(type, -1)}
                                                disabled={guests[type] === 0 || (type === 'adults' && guests[type] === 1)}
                                            >−</button>
                                            <span>{guests[type]}</span>
                                            <button
                                                onClick={() => updateGuests(type, 1)}
                                                disabled={type !== 'infants' && type !== 'pets' && totalGuests >= stay.capacity}
                                            >+</button>
                                        </div>
                                    </div>
                                ))}
                                <p className="guest-max-note">
                                    This place has a maximum of {stay.capacity} guests, not including infants.
                                </p>
                                <button className="guest-close" onClick={() => setGuestsOpen(false)}>Close</button>
                            </div>
                        )}
                    </div>

                    <button
                        className="btn-reserve"
                        onClick={onReserve}
                        onMouseMove={ev => {
                            const rect = ev.currentTarget.getBoundingClientRect()
                            ev.currentTarget.style.setProperty('--x', `${ev.clientX - rect.left}px`)
                            ev.currentTarget.style.setProperty('--y', `${ev.clientY - rect.top}px`)
                        }}
                    >
                        Reserve
                    </button>

                    {nights > 0 && (
                        <div className="booking-summary">
                            <div>
                                <span>${stay.price} × {nights} night{nights > 1 ? 's' : ''}</span>
                                <span>${totalPrice}</span>
                            </div>
                            <div className="booking-total">
                                <strong>Total</strong>
                                <strong>${totalPrice}</strong>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}
