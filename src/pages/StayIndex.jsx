import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'
// import { AppHeader } from '../cmps/AppHeader.jsx'

export function StayIndex({ filterBy }) {
  const stays = useSelector(state => state.stayModule.stays)
  const dispatch = useDispatch()
    

  useEffect(() => {
    dispatch(loadStays())
  }, [])

   const filteredStays = stays.filter(stay => {
    if (filterBy.location) {
      const loc = filterBy.location.toLowerCase()
      if (!stay.loc.city.toLowerCase().includes(loc) &&
          !stay.loc.country.toLowerCase().includes(loc)) return false
    }
    if (filterBy.guests && stay.capacity < +filterBy.guests) return false
    return true
  })

  return (
    <main>
       
      <StayList stays={stays.slice(0, 30)} />
   
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