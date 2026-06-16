import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function StayFilterCollapsed({ filterBy, setFilterBy, onClick }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [startDate, setStartDate] = useState(null)

    const [endDate, setEndDate] = useState(null)

    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })
    const [isGuestsOpen, setIsGuestsOpen] = useState(false)

    const guestsRef = useRef(null)

    const navigate = useNavigate()

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterToEdit({ ...filterToEdit, [name]: value })
    }

    function updateGuests(type, diff) {
        setGuests(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + diff)
        }))
    }
    const guestTypes = [
        { key: 'adults', label: 'Adults' },
        { key: 'children', label: 'Children' },
        { key: 'infants', label: 'Infants' },
        { key: 'pets', label: 'Pets' },
    ]
    useEffect(() => {
        function handleClickOutside(ev) {
            if (guestsRef.current && !guestsRef.current.contains(ev.target)) {
                setIsGuestsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function onSearch() {
        setIsGuestsOpen(false)
        navigate(`/stay/search?location=${filterToEdit.location}`)
    }

    return (
    <section className="stay-filter-collapsed" onClick={onClick}>
            <div className="filter-container-collapsed">
                <input
                    type="text"
                    name="location"
                    value={filterToEdit.location}
                    placeholder="Search by city or country"
                    onChange={handleChange}
                />
                <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setStartDate(update[0])
                        setEndDate(update[1])
                    }}
                    placeholderText="Select dates"
                    monthsShown={2}
                    minDate={new Date()}
                />
                <div className="guests-picker" ref={guestsRef}>
                    <button onClick={() => setIsGuestsOpen(!isGuestsOpen)}>
                        {guests.adults + guests.children} guests
                    </button>
                    {isGuestsOpen && (
                        <div className="guests-dropdown">
                            {guestTypes.map(({ key, label }) => (
                                <div className="guest-row" key={key}>
                                    <span>{label}</span>
                                    <button onClick={() => updateGuests(key, -1)}>-</button>
                                    <span>{guests[key]}</span>
                                    <button onClick={() => updateGuests(key, 1)}>+</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button onClick={onSearch}>🔍</button>
        </section>
    )
}