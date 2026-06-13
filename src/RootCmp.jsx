// import { AppHeader } from './cmps/AppHeader.jsx'
// import { StayIndex } from './pages/StayIndex.jsx'

// function App() {
//   return (
//     <div>
//       <AppHeader />
//       <StayIndex />
//     </div>
//   )
// }

// export default App


// import { AppHeader } from './cmps/AppHeader.jsx'
// import { StayIndex } from './pages/StayIndex.jsx'

// export function RootCmp() {
//   const [filterBy, setFilterBy] = useState({
//     location: '',
//     checkIn: '',
//     checkOut: '',
//     guests: ''
//   })

//   return (
//     <div>
//       <AppHeader onFilter={setFilterBy} />
//       <StayIndex filterBy={filterBy} />
//     </div>
//   )
// }
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { StayIndex } from './pages/StayIndex.jsx'

export function App() {
  const [filterBy, setFilterBy] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  })

  return (
    <div>
      <AppHeader onFilter={setFilterBy} />
      <main>
        <Routes>
          <Route path="/" element={<StayIndex filterBy={filterBy} />} />
          <Route path="/stay" element={<StayIndex filterBy={filterBy} />} />
        </Routes>
      </main>
    </div>
  )
}