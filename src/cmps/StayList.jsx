import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StayPreview } from './StayPreview.jsx'
import ArrowRigth from '../assets/icons/arrow-right.svg'
import AngleRight from '../assets/icons/angle-right.svg'
import AngleLeft from '../assets/icons/angle-left.svg'

export function StayList({ stays, title, className = '', location = '' }) {
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
    navigate(`/stay/?location=${location}`)
  }

  const isFiltered = className.includes('stay-list--filtered')

  return (
    <section className={`stay-list ${className}`}>
      {!isFiltered ? (
        <div className="stay-list-header">
          <div className='stay-list-title'>
            <h2>{title}</h2>
            <button className="title-btn" onClick={onTitleArrowClick}>
              <img src={ArrowRigth} alt="All the stays in the country" />
            </button>
          </div>
          <div className="stay-list__arrows">
            <button className="arrow-btn" onClick={() => scroll('left')} disabled={!canScrollLeft}>
              <img src={AngleLeft} alt="Scroll left" />
            </button>
            <button className="arrow-btn" onClick={() => scroll('right')} disabled={!canScrollRight}>
              <img src={AngleRight} alt="Scroll right" />
            </button>
          </div>
        </div>
      ) : (
        title && <h2 className="stay-list-filtered-title">{title}</h2>
      )}

      <ul ref={isFiltered ? null : listRef} onScroll={isFiltered ? null : handleScroll}>
        {stays.map(stay => (
          <li key={stay._id}>
            <StayPreview stay={stay} />
          </li>
        ))}
      </ul>
    </section>
  )
}