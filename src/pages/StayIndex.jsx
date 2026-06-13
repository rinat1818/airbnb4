import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadStays } from '../store/actions/stay.actions.js'
import { StayList } from '../cmps/StayList.jsx'

export function StayIndex() {
  const stays = useSelector(state => state.stayModule.stays)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadStays())
  }, [])

  return (
    <main>
      <StayList stays={stays.slice(0, 30)} />
      {/* <StayList stays={stays} /> */}
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