import { useSelector } from 'react-redux'
import '../assets/styles/pages/UserDetails.css'

export function UserDetails() {

    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    if (!loggedinUser) return <div className="user-details">No user logged in</div>

    const today = new Date()
    const trips = loggedinUser.trips || []
    const pastTrips = trips.filter(trip => new Date(trip.endDate) < today)
    const upcomingTrips = trips.filter(trip => new Date(trip.endDate) > today)

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    return (
        <section className="user-details">

            <div className="user-details-header">
                <span className="user-avatar-wrap large">
                    <img src={loggedinUser.imgUrl} alt={loggedinUser.fullname} className="user-avatar" />
                </span>
                <div className="user-info">
                    <h2>{loggedinUser.fullname}</h2>
                    <p className="username">@{loggedinUser.username}</p>
                </div>
            </div>

            <div className="user-trips">

                <h3>Upcoming trips</h3>

                {!upcomingTrips.length && <p className="no-trips">No past trips yet</p>}

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

                {!pastTrips.length && <p className="no-trips">No past trips yet</p>}

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
            </div>

        </section>
    )
}