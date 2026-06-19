import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StayPreview } from './StayPreview.jsx'
import ArrowRigth from '../assets/icons/arrow-right.svg'
import AngleRight from '../assets/icons/angle-right.svg'
import AngleLeft from '../assets/icons/angle-left.svg'

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
            <img src={ArrowRigth} alt="All the stays in the country"/>
          </button>
        </div>

        <div className="stay-list__arrows">
          <button className="arrow-btn" onClick={() => scroll('left')} disabled={!canScrollLeft}>
            <img src={AngleLeft} alt="Scroll left"/>
          </button>
          <button className="arrow-btn" onClick={() => scroll('right')} disabled={!canScrollRight}>
            <img src={AngleRight} alt="Scroll right"/>
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