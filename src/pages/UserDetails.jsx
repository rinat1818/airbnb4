import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadUsers } from '../store/actions/user.actions.js'
import '../assets/styles/pages/UserDetails.css'

export function UserDetails() {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const stays = useSelector(state => state.stayModule.stays)
    const users = useSelector(state => state.userModule.users)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('about')

    // Reservations on a host's listings live inside *other* users' `trips`
    // arrays, so we need the full users collection, not just loggedinUser.
    useEffect(() => {
        if (loggedinUser?.isHost) dispatch(loadUsers())
    }, [loggedinUser?.isHost])

    if (!loggedinUser) return <div className="user-details">No user logged in</div>

    const today = new Date()
    const trips = loggedinUser.trips || []
    const pastTrips = trips.filter(trip => new Date(trip.endDate) < today)
    const upcomingTrips = trips.filter(trip => new Date(trip.endDate) > today)
    const listings = loggedinUser.stays || []
    const isHost = !!loggedinUser.isHost

    // Reviews live nested inside each stay's `reviews` array in stays.js,
    // so pull them from the stays this user hosts (or wrote, as a guest).
    const hostStays = isHost
        ? stays.filter(stay => stay.host?._id === loggedinUser._id)
        : []

    const allReviews = isHost
        ? hostStays.flatMap(stay =>
            (stay.reviews || []).map(review => ({ ...review, stayName: stay.name }))
        )
        : stays.flatMap(stay =>
            (stay.reviews || [])
                .filter(review => review.by?._id === loggedinUser._id)
                .map(review => ({ ...review, stayName: stay.name }))
        )

    const bestReviews = [...allReviews]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 3)

    // Reservations = other users' trips that booked one of this host's stays.
    const hostStayIds = hostStays.map(stay => stay._id)

    const allReservations = isHost
        ? (users || []).flatMap(user =>
            (user.trips || [])
                .filter(trip => hostStayIds.includes(trip.stay?._id))
                .map(trip => ({ ...trip, guest: user }))
        )
        : []

    const upcomingReservations = allReservations.filter(res => new Date(res.endDate) > today)
    const pastReservations = allReservations.filter(res => new Date(res.endDate) < today)

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const navItems = [
        { key: 'about', label: 'About me', thumb: <PersonIcon /> },
        { key: 'trips', label: 'Trips', thumb: <MountainIcon /> },
        ...(isHost ? [
            { key: 'listings', label: 'Listings', thumb: <HouseIcon /> },
            { key: 'reservations', label: 'Reservations', thumb: <CalendarIcon /> },
        ] : []),
    ]

    return (
        <section className="user-details">
            <div className="profile-layout">

                <nav className="profile-nav">
                    <h1 className="profile-nav-title">Profile</h1>
                    <ul>
                        {navItems.map(item => (
                            <li key={item.key}>
                                <button
                                    className={`profile-nav-btn ${activeTab === item.key ? 'active' : ''}`}
                                    onClick={() => setActiveTab(item.key)}
                                    title={item.label}
                                    aria-label={item.label}
                                >
                                    <span className="profile-nav-thumb">
                                        {item.thumb}
                                    </span>
                                    <span className="profile-nav-label">{item.label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="profile-content">

                    {activeTab === 'about' && (
                        <>
                            <div className="profile-content-header">
                                <h2>About me</h2>
                                <button className="edit-btn" type="button">Edit</button>
                            </div>

                            <div className="about-row">
                                <div className="about-card">
                                    <div className="about-card-left">
                                        <div className="about-card-avatar-wrap">
                                            <img src={loggedinUser.imgUrl} alt={loggedinUser.fullname} className="about-card-avatar" />
                                            <span className="verified-badge"><CheckIcon /></span>
                                        </div>
                                        <h2 className="about-card-name">{loggedinUser.fullname}</h2>
                                        <p className="about-card-role">{isHost ? 'Host' : 'Guest'}</p>
                                    </div>

                                    <div className="about-stats">
                                        <div className="about-stat">
                                            <strong>{trips.length}</strong>
                                            <span>{trips.length === 1 ? 'Trip' : 'Trips'}</span>
                                        </div>
                                        <div className="about-stat">
                                            <strong>{loggedinUser.reviewCount ?? 0}</strong>
                                            <span>{loggedinUser.reviewCount === 1 ? 'Review' : 'Reviews'}</span>
                                        </div>
                                        {typeof loggedinUser.yearsOnAirbnb === 'number' && (
                                            <div className="about-stat">
                                                <strong>{loggedinUser.yearsOnAirbnb}</strong>
                                                <span>{loggedinUser.yearsOnAirbnb === 1 ? 'Year on Airbnb' : 'Years on Airbnb'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <ul className="about-info-list">
                                    {loggedinUser.work && (
                                        <li>
                                            <BriefcaseIcon />
                                            <span>My work: {loggedinUser.work}</span>
                                        </li>
                                    )}
                                    {loggedinUser.languages?.length > 0 && (
                                        <li>
                                            <SpeechIcon />
                                            <span>Speaks {loggedinUser.languages.join(', ')}</span>
                                        </li>
                                    )}
                                    {loggedinUser.isIdentityVerified && (
                                        <li>
                                            <ShieldIcon />
                                            <span className="about-info-link">Identity verified</span>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <hr className="profile-divider" />

                            <div className="reviews-section">
                                <h2>My reviews</h2>
                                {!bestReviews.length && <p className="empty-state">No reviews yet</p>}
                                {!!bestReviews.length && (
                                    <ul className="review-list">
                                        {bestReviews.map(review => (
                                            <li key={`${review.by?._id}-${review.at}`} className="review-card">
                                                <div className="review-card-header">
                                                    <img
                                                        src={review.by?.imgUrl}
                                                        alt={review.by?.fullname}
                                                        className="review-avatar"
                                                    />
                                                    <div>
                                                        <h4>{review.by?.fullname}</h4>
                                                        <p className="review-date">{formatDate(review.at)}</p>
                                                    </div>
                                                </div>

                                                <div className="review-rating">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <StarIcon key={i} filled={i < Math.round(review.rating || 0)} />
                                                    ))}
                                                </div>

                                                <p className="review-txt">{review.txt}</p>
                                                <p className="review-stay">Stayed at {review.stayName}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'trips' && (
                        <>
                            <div className="profile-content-header">
                                <h2>Trips</h2>
                            </div>

                            <h3>Upcoming trips</h3>
                            {!upcomingTrips.length && <p className="empty-state">No upcoming trips yet</p>}
                            <ul className="trip-list">
                                {upcomingTrips.map(trip => (
                                    <li key={trip._id} className="trip-card">
                                        <img src={trip.stay.imgUrl} alt={trip.stay.name} className="trip-img" />
                                        <div className="trip-info">
                                            <h4>{trip.stay.name}</h4>
                                            <p className="trip-dates">{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</p>
                                            <p className="trip-price">${trip.stay.price} / night</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <h3>Past trips</h3>
                            {!pastTrips.length && <p className="empty-state">No past trips yet</p>}
                            <ul className="trip-list">
                                {pastTrips.map(trip => (
                                    <li key={trip._id} className="trip-card">
                                        <img src={trip.stay.imgUrl} alt={trip.stay.name} className="trip-img" />
                                        <div className="trip-info">
                                            <h4>{trip.stay.name}</h4>
                                            <p className="trip-dates">{formatDate(trip.startDate)} – {formatDate(trip.endDate)}</p>
                                            <p className="trip-price">${trip.stay.price} / night</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {activeTab === 'listings' && isHost && (
                        <>
                            <div className="profile-content-header">
                                <h2>Listings</h2>
                                <Link to="/add-stay" className="edit-btn">Add listing</Link>
                            </div>

                            {!listings.length && <p className="empty-state">No listings yet</p>}
                            <ul className="trip-list">
                                {listings.map(stay => (
                                    <li key={stay._id} className="trip-card listing-card">
                                        <Link to={`/stay/${stay._id}`} className="trip-card-link">
                                            <img src={stay.imgUrl} alt={stay.name} className="trip-img" />
                                            <div className="trip-info">
                                                <h4>{stay.name}</h4>
                                                <p className="trip-price">${stay.price} / night</p>
                                            </div>
                                        </Link>
                                        <Link to={`/add-stay/${stay._id}`} className="listing-edit-btn">
                                            Edit
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {activeTab === 'reservations' && isHost && (
                        <>
                            <div className="profile-content-header">
                                <h2>Reservations</h2>
                            </div>

                            <h3>Upcoming reservations</h3>
                            {!upcomingReservations.length && <p className="empty-state">No upcoming reservations yet</p>}
                            <ul className="trip-list">
                                {upcomingReservations.map(res => (
                                    <li key={res._id} className="trip-card">
                                        <img src={res.stay.imgUrl} alt={res.stay.name} className="trip-img" />
                                        <div className="trip-info">
                                            <h4>{res.stay.name}</h4>
                                            <p className="trip-dates">{formatDate(res.startDate)} – {formatDate(res.endDate)}</p>
                                            <p className="trip-price">${res.stay.price} / night</p>
                                            <p className="reservation-guest">Guest: {res.guest.fullname}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <h3>Past reservations</h3>
                            {!pastReservations.length && <p className="empty-state">No past reservations yet</p>}
                            <ul className="trip-list">
                                {pastReservations.map(res => (
                                    <li key={res._id} className="trip-card">
                                        <img src={res.stay.imgUrl} alt={res.stay.name} className="trip-img" />
                                        <div className="trip-info">
                                            <h4>{res.stay.name}</h4>
                                            <p className="trip-dates">{formatDate(res.startDate)} – {formatDate(res.endDate)}</p>
                                            <p className="trip-price">${res.stay.price} / night</p>
                                            <p className="reservation-guest">Guest: {res.guest.fullname}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                </div>
            </div>
        </section>
    )
}

function CheckIcon() {
    return (
        <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function ShieldIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
                d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"
                fill="none" stroke="#222222" strokeWidth="1.5" strokeLinejoin="round"
            />
        </svg>
    )
}

function PersonIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="8" r="4" fill="none" stroke="#717171" strokeWidth="1.5" />
            <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" fill="none" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function MountainIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
                d="M3 19l6.5-11 4 6.5L16 10l5 9z"
                fill="none" stroke="#717171" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"
            />
            <circle cx="8" cy="6.5" r="1.6" fill="none" stroke="#717171" strokeWidth="1.5" />
        </svg>
    )
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="#717171" strokeWidth="1.5" />
            <path d="M3.5 9.5h17" stroke="#717171" strokeWidth="1.5" />
            <path d="M8 3v4M16 3v4" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

function HouseIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
                d="M4 11.5L12 4l8 7.5"
                fill="none" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
            <path
                d="M6 10v9a1 1 0 0 0 1 1h3v-5.5h4V20h3a1 1 0 0 0 1-1v-9"
                fill="none" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            />
        </svg>
    )
}

function BriefcaseIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <rect x="3" y="7" width="18" height="12" rx="2" fill="none" stroke="#222222" strokeWidth="1.5" />
            <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" fill="none" stroke="#222222" strokeWidth="1.5" />
            <path d="M3 12h18" stroke="#222222" strokeWidth="1.5" />
        </svg>
    )
}

function SpeechIcon() {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
                d="M4 5h16v10H8l-4 4V5z"
                fill="none" stroke="#222222" strokeWidth="1.5" strokeLinejoin="round"
            />
        </svg>
    )
}

function StarIcon({ filled }) {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path
                d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"
                fill={filled ? '#222222' : 'none'}
                stroke="#222222"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    )
}