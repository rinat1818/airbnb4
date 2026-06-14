import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { loadStays } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'

export function StayIndex() {
  const stays = useSelector(state => state.stayModule.stays)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const locationFilter = searchParams.get('location') || ''

  useEffect(() => {
    dispatch(loadStays())
  }, [])

  const filteredStays = stays.filter(stay => {
    if (!locationFilter) return true
    const loc = locationFilter.toLowerCase()
    return stay.loc.city.toLowerCase().includes(loc) ||
           stay.loc.country.toLowerCase().includes(loc)
  })

  const isSearchPage = !!locationFilter

  return (
    <main>
      <StayList stays={isSearchPage ? filteredStays : filteredStays.slice(0, 30)} />
    </main>
  )
}

// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { loadStays } from '../store/actions/stay.actions.js'
// import { StayList } from '../cmps/StayList.jsx'

// export function StayIndex() {
//   const stays = useSelector(state => state.stayModule.stays)

//   useEffect(() => {
//     loadStays()
//   }, [])

//   return (
//     <main>
//       <StayList stays={stays} />
//     </main>
//   )
// }