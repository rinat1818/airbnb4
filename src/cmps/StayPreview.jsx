export function StayPreview({ stay }) {
  return (
    <article>
      <img src={stay.imgUrls[0]} alt={stay.name} />
      <h2>{stay.name}</h2>
      <p>{stay.loc.city}, {stay.loc.country}</p>
      <p>${stay.price} / night</p>
    </article>
  )
}