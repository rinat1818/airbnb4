import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {
  const mainImage = stay.imgUrls && stay.imgUrls.length > 0
    ? stay.imgUrls[0]
    : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80'

  return (

    <Link to={`/stay/${stay._id}`} className="stay-preview-card">
      <div className="image-container">
        <img src={mainImage} alt={stay.name} loading="lazy" />
      </div>

      <div className="stay-info">
        <div className="stay-header">
          <h2 className="stay-title">{stay.name}</h2>
        </div>

        <p className="stay-location">
          {stay.loc?.city || 'Unknown City'}, {stay.loc?.country || 'Unknown Country'}
        </p>

        <p className="stay-price">
          <span className="price-bold">${stay.price}</span> night
        </p>
      </div>
    </Link>
  )
}

