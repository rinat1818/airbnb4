import { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../store/actions/stay.actions.js'


// import { BiSearch } from 'react-icons/bi'



// import { getRandomLocationImage } from '../services/location.service.js'
import { getRandomLocationImage, getRandomLocationDescription } from '../services/location.service.js'
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
    { key: 'adults', label: 'Adults', sub: 'Ages 13 or above' },
    { key: 'children', label: 'Children', sub: 'Ages 2 – 12' },  // ← יש כאן רווח בהתחלה?
    { key: 'infants', label: 'Infants', sub: 'Under 2' },  // ← ואולי כאן?
    { key: 'pets', label: 'Pets', sub: 'Bringing a service animal?' },
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
                <div className={`location-picker ${activeField && activeField !== 'location' ? 'dimmed' : ''} ${activeField === 'location' ? 'active' : ''}`} ref={locationRef}>
                {/* <div className={`location-picker ${activeField && activeField !== 'location' ? 'dimmed' : ''}`} ref={locationRef}> */}
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
        <div className="location-dropdown-inner">
            {locations
                .filter(loc => loc.toLowerCase().includes(filterToEdit.location.toLowerCase()))
                .slice(0, 10)
                .map(loc => (
                    <div key={loc} className="location-item"
                        onClick={() => {
                            setFilterToEdit({ ...filterToEdit, location: loc })
                            setIsLocationOpen(false)
                        }}>
                        <img className="location-img" src={getRandomLocationImage()} alt={loc} />
                        <div>
                            <div className="location-name">{loc}</div>
                            <div className="location-desc">{getRandomLocationDescription()}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
)}
</div>
                {/* <div className={`date-picker-wrapper ${activeField && activeField !== 'date' ? 'dimmed' : ''}`}> */}
                <div className={`date-picker-wrapper ${activeField && activeField !== 'date' ? 'dimmed' : ''} ${activeField === 'date' ? 'active' : ''}`}>
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
                         formatWeekDay={day => day.charAt(0)}
                    />
                </div>

                {/* <div className={`guests-picker ${activeField && activeField !== 'guests' ? 'dimmed' : ''}`} ref={guestsRef}> */}
                <div className={`guests-picker ${activeField && activeField !== 'guests' ? 'dimmed' : ''} ${activeField === 'guests' ? 'active' : ''}`} ref={guestsRef}>
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
                    {/* {isGuestsOpen && (
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
                    )} */}
                    {isGuestsOpen && (
    <div className="guests-dropdown">
        {guestTypes.map(({ key, label, sub }) => (
            <div key={key} className="guest-row">
                <div>
                    <span className="guest-label">{label}</span>
                    <span className="guest-sub">{sub}</span>
                </div>
                <button onClick={() => updateGuests(key, -1)}>-</button>
                <span>{filterToEdit.guests[key]}</span>
                <button onClick={() => updateGuests(key, 1)}>+</button>
            </div>
        ))}
    </div>
)}
                </div>
              {/* <button className="search-btn" onClick={onSearch}>
    <BiSearch />
   
</button> */}

<button className="search-btn" onClick={onSearch}>🔍</button>
            </div>
        </section>
    )
}