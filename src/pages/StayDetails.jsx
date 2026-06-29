import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { stayService } from '../services/stayService.js'

export function StayDetails() {
    const { stayId } = useParams()
    const navigate = useNavigate()
    const [stay, setStay] = useState(null)
    const [currentImgIdx, setCurrentImgIdx] = useState(0)

    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)
    const [guests, setGuests] = useState(1)

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
        setTimeout(() => setToastVisible(false), 1500)
        setTimeout(() => setToast(null), 1500)
    }

    if (!stay) return <div className="loading">Loading...</div>

    const avgRating = stay.reviews.length
        ? (stay.reviews.reduce((sum, r) => sum + r.rate, 0) / stay.reviews.length).toFixed(1)
        : null

    function prevImg() {
        setCurrentImgIdx(i => (i === 0 ? stay.imgUrls.length - 1 : i - 1))
    }

    function nextImg() {
        setCurrentImgIdx(i => (i === stay.imgUrls.length - 1 ? 0 : i + 1))
    }

    const nights = checkIn && checkOut
        ? Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
        : 0
    const totalPrice = nights * stay.price

    function onReserve() {
        if (!checkIn || !checkOut) {
            showToast('Please select check-in and check-out dates', 'error')
            return
        }
        if (nights < 1) {
            showToast('Check-out must be after check-in', 'error')
            return
        }
        showToast(`Reservation confirmed! ${nights} night${nights > 1 ? 's' : ''} · $${totalPrice} total`, 'success')
    }

    return (
        <section className="stay-details">

            {toast && (
                <div className={`toast toast-${toast.type} ${toastVisible ? 'toast-enter' : 'toast-exit'}`}>
                    <span>{toast.type === 'success' ? '✓' : '✕'}</span>
                    {toast.message}
                </div>
            )}

            <button onClick={() => navigate(-1)} className="btn-back">← Back</button>
            <h1>{stay.name}</h1>
            <div className="stay-meta">
                {avgRating && <span>⭐ {avgRating} · {stay.reviews.length} reviews</span>}
                <br />
                <span>{stay.loc.city}, {stay.loc.country}</span>
            </div>

            <div className="carousel">
                <button className="carousel-btn prev" onClick={prevImg}>‹</button>
                <img
                    src={stay.imgUrls[currentImgIdx]}
                    alt={`${stay.name} photo ${currentImgIdx + 1}`}
                />
                <button className="carousel-btn next" onClick={nextImg}>›</button>
                <span className="carousel-counter">
                    {currentImgIdx + 1} / {stay.imgUrls.length}
                </span>
            </div>

            <div className="details-layout">

                <div className="details-body">
                    <div className="host-info">
                        <img
                            src={stay.host.imgUrl}
                            alt={stay.host.fullname}
                            className="host-avatar"
                        />
                        <div>
                            <h2>Hosted by {stay.host.fullname}</h2>
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
                            {/* {stay.amenities.map(amenity => (
                                <li key={amenity}>{amenity}</li>
                            ))} */}
                            {stay.amenities.map((amenity, index) => (
    <li key={`${amenity}-${index}`}>{amenity}</li>
))}
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
                        <label>GUESTS</label>
                        <div className="guest-counter">
                            <button onClick={() => setGuests(g => Math.max(1, g - 1))}>−</button>
                            <span>{guests} guest{guests > 1 ? 's' : ''}</span>
                            <button onClick={() => setGuests(g => Math.min(stay.capacity, g + 1))}>+</button>
                        </div>
                    </div>

                    <button className="btn-reserve" onClick={onReserve}>Reserve</button>

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
