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

export function AppHeader({ onFilter }) {
  return (
    <header className="app-header">
      <section className="header-container">
        <h1 className="logo">airbnb</h1>
        <StayFilter onFilter={onFilter} />
      </section>
    </header>
  )
}
// import { StaySearch } from './StaySearch.jsx'

// export function AppHeader({ onSearch }) {
//   return (
//     <header className="app-header">
//       <section className="header-container">
//         <h1 className="logo">airbnb</h1>
//         <StaySearch onSearch={onSearch} />
//       </section>
//     </header>
//   )
// }