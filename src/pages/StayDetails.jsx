import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { stayService } from '../services/stayService.js'

export function StayDetails() {
    const { stayId } = useParams()
    const navigate = useNavigate()
    const [stay, setStay] = useState(null)
    const [currentImgIdx, setCurrentImgIdx] = useState(0)

    useEffect(() => {
        stayService.get(stayId)
            .then(stay => setStay(stay))
            .catch(err => {
                console.error('Failed to load stay:', err)
                navigate('/')
            })
    }, [stayId])

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

    return (
        <section className="stay-details">
            <button onClick={() => navigate(-1)} className="btn-back">← Back</button>
            <h1>{stay.name}</h1>
            <div className="stay-meta">
                {avgRating && <span>⭐ {avgRating} · {stay.reviews.length} reviews</span>}
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
                        {stay.amenities.map(amenity => (
                            <li key={amenity}>{amenity}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    )
}
