import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../assets/styles/pages/UserDetails.css'

export function UserDetails() {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)
    const [activeTab, setActiveTab] = useState('about')

    if (!loggedinUser) return <div className="user-details">No user logged in</div>

    const today = new Date()
    const trips = loggedinUser.trips || []
    const pastTrips = trips.filter(trip => new Date(trip.endDate) < today)
    const upcomingTrips = trips.filter(trip => new Date(trip.endDate) > today)
    const listings = loggedinUser.stays || []
    const isHost = !!loggedinUser.isHost

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    function isImageThumb(thumb) {
        return typeof thumb === 'string' && (thumb.startsWith('http') || thumb.startsWith('/'))
    }

    const navItems = [
        { key: 'about', label: 'About me', thumb: loggedinUser.imgUrl },
        { key: 'trips', label: 'Trips', thumb: trips[0]?.stay?.imgUrl },
        ...(isHost ? [{ key: 'listings', label: 'Listings', thumb: <HouseIcon /> }] : []),
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
                                >
                                    <span className="profile-nav-thumb">
                                        {isImageThumb(item.thumb)
                                            ? <img src={item.thumb} alt="" />
                                            : item.thumb || <PersonIcon />}
                                    </span>
                                    {item.label}
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
                                        <h3 className="about-card-name">{loggedinUser.fullname}</h3>
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
                                        {isHost && (
                                            <div className="about-stat">
                                                <strong>{listings.length}</strong>
                                                <span>{listings.length === 1 ? 'Listing' : 'Listings'}</span>
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
                                <p className="empty-state">No reviews yet</p>
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