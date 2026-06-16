import { Link } from 'react-router-dom'
import '../assets/styles/cmps/StayPreview.css'

export function StayPreview({ stay }) {
  const image = stay.imgUrls?.[0]
    ?? 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'

  const avgRating = stay.reviews.length
    ? (stay.reviews.reduce((sum, r) => sum + r.rate, 0) / stay.reviews.length).toFixed(1)
    : null

  return (
    <Link to={`/stay/${stay._id}`} className="stay-preview-card">

      <div className="stay-image-wrapper">
        <img src={image} alt={stay.name} loading="lazy" className="stay-image" />
      </div>

      <div className="stay-info">

        <h2 className="stay-title">{stay.name}</h2>

        <p className="stay-location">
          {stay.loc?.city || 'Unknown City'}, {stay.loc?.country || 'Unknown Country'}
        </p>

        <p className="stay-price-rate">${stay.price}/night · ★ {avgRating}</p>

      </div>

    </Link>
  )
}