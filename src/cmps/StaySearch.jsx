// import { useState } from 'react'

// export function StaySearch({ onSearch }) {
//   const [searchTxt, setSearchTxt] = useState('')

//   function onSubmit(ev) {
//     ev.preventDefault()
//     onSearch(searchTxt)
//   }

//   return (
//     <form className="stay-search" onSubmit={onSubmit}>
//       <input
//         type="text"
//         placeholder="Search destinations..."
//         value={searchTxt}
//         onChange={ev => setSearchTxt(ev.target.value)}
//       />
//       <button type="submit">🔍</button>
//     </form>
//   )
// }