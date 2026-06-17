import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StayPreview } from './StayPreview.jsx'

export function StayList({ stays, title }) {
  const listRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const navigate = useNavigate()

  function scroll(direction) {
    const list = listRef.current
    const scrollAmount = list.clientWidth
    list.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' })
  }

  function handleScroll() {
    const list = listRef.current
    setCanScrollLeft(list.scrollLeft > 0)
    setCanScrollRight(list.scrollLeft + list.clientWidth < list.scrollWidth - 1)
  }

  function onTitleArrowClick() {
    navigate(`/stay/search?location=${title}`)
  }

  return (
    <section className="stay-list">
      <div className="stay-list-header">
        <div className='stay-list-title'>
          <h2>Popular homes in {title}</h2>
          <button className="title-btn" onClick={onTitleArrowClick}>
            →
          </button>
        </div>

        <div className="stay-list__arrows">
          <button className="arrow-btn" onClick={() => scroll('left')} disabled={!canScrollLeft}>
            ‹
          </button>
          <button className="arrow-btn" onClick={() => scroll('right')} disabled={!canScrollRight}>
            ›
          </button>
        </div>
      </div>

      <ul ref={listRef} onScroll={handleScroll}>
        {stays.map(stay => (
          <li key={stay._id}>
            <StayPreview stay={stay} />
          </li>
        ))}
      </ul>
    </section>
  )
}