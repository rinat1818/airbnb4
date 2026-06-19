import { Link } from 'react-router-dom'
import { useState } from 'react'
import '../assets/styles/cmps/StayPreview.css'

export function StayPreview({ stay }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const image = stay.imgUrls?.[0]
    ?? 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'

  const avgRating = stay.reviews.length
    ? (stay.reviews.reduce((sum, r) => sum + r.rating, 0) / stay.reviews.length).toFixed(1)
    : null

  function toggleWishlist(e) {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(prev => !prev)
  }

  return (
    <Link to={`/stay/${stay._id}`} className="stay-preview-card">

      <div className="stay-image-wrapper">
        <img src={image} alt={stay.name} loading="lazy" className="stay-image" />

        {avgRating >= 4 && (
          <span className="guest-favourite">Guest favourite</span>
        )}

        <button className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`} onClick={toggleWishlist}>
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 28C16 28 3 19.25 3 11.5C3 7.91 5.91 5 9.5 5C11.74 5 13.73 6.06 15 7.67C16.27 6.06 18.26 5 20.5 5C24.09 5 27 7.91 27 11.5C27 19.25 16 28 16 28Z" />
          </svg>
        </button>

      </div>

      <div className="stay-info">

        <h3 className="stay-title">{stay.name}</h3>

        <p className="stay-location">
          {stay.loc?.city || 'Unknown City'}, {stay.loc?.country || 'Unknown Country'}
        </p>

        <p className="stay-price-rate">${stay.price}/night · ★ {avgRating}</p>

      </div>

    </Link>
  )
}