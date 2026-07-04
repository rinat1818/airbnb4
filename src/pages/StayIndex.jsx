import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
import { useSearchParams } from 'react-router-dom'
import '../assets/styles/pages/StayIndex.css'

export function StayIndex() {
  const stays = useSelector(state => state.stayModule.stays)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const filterBy = useSelector(state => state.stayModule.filterBy)
  const locationFilter = searchParams.get('location') || filterBy.location || ''

  useEffect(() => {
    dispatch(loadStays())
  }, [])

  const filteredStays = stays.filter(stay => {
    if (!locationFilter) return true
    const loc = locationFilter.toLowerCase()
    return stay.loc.city.toLowerCase().includes(loc) ||
      stay.loc.country.toLowerCase().includes(loc)
  })

  const staysByCountry = filteredStays.reduce((acc, stay) => {
    const country = stay.loc?.country || 'Other'
    if (!acc[country]) acc[country] = []
    acc[country].push(stay)
    return acc
  }, {})

  const isSearchPage = !!locationFilter

  return (
    <main className={`stay-index ${isSearchPage ? 'stay-index--search' : ''}`}>
      {isSearchPage ? (
        <StayList
          stays={filteredStays}
          title={`Over ${filteredStays.length} homes`}
          className="stay-list--filtered"
        />
      ) : (
        Object.entries(staysByCountry).map(([country, countryStays]) => (
          <StayList
            key={country}
            stays={countryStays}
            title={`Popular homes in ${country}`}
            location={country}
          />
        ))
      )}
    </main>
  )
}