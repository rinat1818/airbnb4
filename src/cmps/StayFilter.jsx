import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../store/actions/stay.actions.js'
import 'react-datepicker/dist/react-datepicker.css'


export function StayFilter({ onSearchDone }) {
    const stays = useSelector(state => state.stayModule.stays)
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const dispatch = useDispatch()

    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [guests, setGuests] = useState({ adults: 1, children: 0, infants: 0, pets: 0 })
    const [isGuestsOpen, setIsGuestsOpen] = useState(false)
    const [isLocationOpen, setIsLocationOpen] = useState(false)

    const guestsRef = useRef(null)
    const locationRef = useRef(null)

    const locations = [...new Set([
        ...stays.map(s => s.loc.city),
        ...stays.map(s => s.loc.country)
    ])].sort()

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
    useEffect(() => {
        function handleClickOutside(ev) {
            if (locationRef.current && !locationRef.current.contains(ev.target)) {
                setIsLocationOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    function onSearch() {
    setIsGuestsOpen(false)
    dispatch(setFilter(filterToEdit))
    if (onSearchDone) onSearchDone()
}
    return (
        <section className="stay-filter">
            <div className="filter-container">
                <div className="location-picker" ref={locationRef}>
                    <input
                        type="text"
                        name="location"
                        value={filterToEdit.location}
                        placeholder="Search by city or country"
                        onChange={handleChange}
                        onFocus={() => setIsLocationOpen(true)}
                    />
                    {isLocationOpen && (
                        <div className="location-dropdown">
                            {locations
                                .filter(loc => loc.toLowerCase().includes(filterToEdit.location.toLowerCase()))
                                .slice(0, 10)
                                .map(loc => (
                                    <div key={loc} className="location-item"
                                        onClick={() => {
                                            setFilterToEdit({ ...filterToEdit, location: loc })
                                            setIsLocationOpen(false)
                                        }}>
                                        {loc}
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>

                <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={([start, end]) => { setStartDate(start); setEndDate(end) }}
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
                                <div key={key} className="guest-row">
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