import { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../store/actions/stay.actions.js'
import 'react-datepicker/dist/react-datepicker.css'

export function StayFilter({ onSearchDone }) {
    const stays = useSelector(state => state.stayModule.stays)
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [isGuestsOpen, setIsGuestsOpen] = useState(false)
    const [isLocationOpen, setIsLocationOpen] = useState(false)

    const [activeField, setActiveField] = useState(null)

    const guestsRef = useRef(null)
    const locationRef = useRef(null)

    const filterRef = useRef(null)

    const locations = [...new Set([
        ...stays.map(s => s.loc.city),
        ...stays.map(s => s.loc.country)
    ])].sort(() => Math.random() - 0.5)

    // useEffect(() => {
    //     setFilterToEdit(structuredClone(filterBy))
    // }, [filterBy])

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

    useEffect(() => {
        function handleClickOutside(ev) {
            if (filterRef.current && !filterRef.current.contains(ev.target)) {
                setActiveField(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterToEdit({ ...filterToEdit, [name]: value })
    }

    function updateGuests(type, diff) {
        setFilterToEdit(prev => ({
            ...prev,
            guests: {
                ...prev.guests,
                [type]: Math.max(0, prev.guests[type] + diff)
            }
        }))
    }

    const guestTypes = [
        { key: 'adults', label: 'Adults' },
        { key: 'children', label: 'Children' },
        { key: 'infants', label: 'Infants' },
        { key: 'pets', label: 'Pets' },
    ]

    function onSearch(ev) {
        ev.nativeEvent.stopImmediatePropagation()
        setIsGuestsOpen(false)
        setActiveField(null)
        dispatch(setFilter(filterToEdit))
        navigate('/')
    }
    return (
        <section className="stay-filter">
            <div className={`filter-container ${activeField ? 'has-active' : ''}`} ref={filterRef}>
                <div className={`location-picker ${activeField && activeField !== 'location' ? 'dimmed' : ''}`} ref={locationRef}>
                    <label className="filter-label">Where</label>
                    <input
                        type="text"
                        name="location"
                        autoComplete="off"
                        value={filterToEdit.location}
                        placeholder="Search by city or country"
                        onChange={handleChange}
                        onFocus={() => { setIsLocationOpen(true); setActiveField('location') }}
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
                <div className={`date-picker-wrapper ${activeField && activeField !== 'date' ? 'dimmed' : ''}`}>
                    <label className="filter-label">When</label>
                    <DatePicker
                        selectsRange
                        startDate={filterToEdit.startDate}
                        endDate={filterToEdit.endDate}
                        onChange={([start, end]) => setFilterToEdit({ ...filterToEdit, startDate: start, endDate: end })}
                        placeholderText="Select dates"
                        monthsShown={2}
                        minDate={new Date()}
                        onFocus={() => setActiveField('date')}
                    />
                </div>

                {/* <DatePicker
                    selectsRange
                    startDate={filterToEdit.startDate}
                    endDate={filterToEdit.endDate}
                    onChange={([start, end]) => setFilterToEdit({ ...filterToEdit, startDate: start, endDate: end })}
                    placeholderText="Select dates"
                    monthsShown={2}
                    minDate={new Date()}
                /> */}
                <div className={`guests-picker ${activeField && activeField !== 'guests' ? 'dimmed' : ''}`} ref={guestsRef}>
                    <label className="filter-label">Who</label>

                    <input
                        type="text"
                        readOnly
                        value={filterToEdit.guests.adults + filterToEdit.guests.children > 0
                            ? `${filterToEdit.guests.adults + filterToEdit.guests.children} guests`
                            : ''}
                        placeholder="Add guests"
                        onClick={() => { setIsGuestsOpen(!isGuestsOpen); setActiveField('guests') }}
                    />
                    {isGuestsOpen && (
                        <div className="guests-dropdown">
                            {guestTypes.map(({ key, label }) => (
                                <div key={key} className="guest-row">
                                    <span>{label}</span>
                                    <button onClick={() => updateGuests(key, -1)}>-</button>
                                    <span>{filterToEdit.guests[key]}</span>
                                    <button onClick={() => updateGuests(key, 1)}>+</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button className="search-btn" onClick={onSearch}>🔍</button>
            </div>
        </section>
    )
}