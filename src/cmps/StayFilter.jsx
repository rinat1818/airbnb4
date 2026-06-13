import { useState } from 'react'

export function StayFilter({ onFilter }) {
  const [filterBy, setFilterBy] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  })

  function handleChange(ev) {
    const { name, value } = ev.target
    const newFilter = { ...filterBy, [name]: value }
    setFilterBy(newFilter)
    onFilter(newFilter)
  }

  return (
    <div className="stay-filter">
      <input
        type="text"
        name="location"
        placeholder="Where — city or country"
        value={filterBy.location}
        onChange={handleChange}
      />
      <input
        type="date"
        name="checkIn"
        value={filterBy.checkIn}
        onChange={handleChange}
      />
      <input
        type="date"
        name="checkOut"
        value={filterBy.checkOut}
        onChange={handleChange}
      />
      <input
        type="number"
        name="guests"
        placeholder="Guests"
        min="1"
        value={filterBy.guests}
        onChange={handleChange}
      />
      <button onClick={() => onFilter(filterBy)}>🔍</button>
    </div>
  )
}