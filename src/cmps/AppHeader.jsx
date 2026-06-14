// export function AppHeader() {
//   return (
//     <header className="app-header">
//       <section className="header-container">
//         <h1>Airbnb</h1>
//       </section>
//     </header>
//   )
// }

// export function AppHeader() {
//   return (
//     <header className="app-header">
//       <section className="header-container">
//         <h1 className="logo">airbnb</h1>
//       </section>
//     </header>
//   )
// }
import { StayFilter } from './StayFilter.jsx'

export function AppHeader({ filterBy, setFilterBy }) {
  return (
    <header className="app-header">
      <section className="header-container">
        <h1 className="logo">airbnb</h1>
        <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} />
      </section>
    </header>
  )
}


