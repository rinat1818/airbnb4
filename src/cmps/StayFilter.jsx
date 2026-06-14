// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export function StayFilter({ filterBy, setFilterBy }) {
//     const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
//     const navigate = useNavigate()

//     function handleChange(ev) {
//         const { name, value } = ev.target
//         setFilterToEdit({ ...filterToEdit, [name]: value })
//     }

//     function onSearch() {
//         setFilterBy(filterToEdit)
//         navigate('/stay/search')
//     }

//     return (
//         <section className="stay-filter">
//             <input
//                 type="text"
//                 name="location"
//                 value={filterToEdit.location}
//                 placeholder="Search by city or country"
//                 onChange={handleChange}
//             />
//             <button onClick={onSearch}>🔍</button>
//         </section>
//     )
// }


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function StayFilter({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const navigate = useNavigate()

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterToEdit({ ...filterToEdit, [name]: value })
    }

    function onSearch() {
        navigate(`/stay/search?location=${filterToEdit.location}`)
    }

    return (
        <section className="stay-filter">
            <input
                type="text"
                name="location"
                value={filterToEdit.location}
                placeholder="Search by city or country"
                onChange={handleChange}
            />
            <button onClick={onSearch}>🔍</button>
        </section>
    )
}