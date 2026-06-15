import { Link } from 'react-router-dom'

export function StayPreview({ stay }) {
  return (
    <Link to={`/stay/${stay._id}`}>
      <article>
        <img src={stay.imgUrls[0]} alt={stay.name} />
        <h2>{stay.name}</h2>
        <p>{stay.loc.city}, {stay.loc.country}</p>
        <p>${stay.price} / night</p>
      </article>

    </Link>
  )
}

