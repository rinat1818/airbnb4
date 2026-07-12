import { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { BiSearch } from 'react-icons/bi'
import { setFilter } from '../store/actions/stay.actions.js'
import 'react-datepicker/dist/react-datepicker.css'

export function StayFilterCollapsed({ onClick }) {
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const dispatch = useDispatch()

    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [isGuestsOpen, setIsGuestsOpen] = useState(false)

    const guestsRef = useRef(null)
    useEffect(() => {
        setFilterToEdit(structuredClone(filterBy))
    }, [filterBy.location, filterBy.startDate, filterBy.endDate, filterBy.guests])


    useEffect(() => {
        function handleClickOutside(ev) {
            if (guestsRef.current && !guestsRef.current.contains(ev.target)) {
                setIsGuestsOpen(false)
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

    function onSearch() {
        setIsGuestsOpen(false)
        dispatch(setFilter(filterToEdit))
    }

    return (
        <section className="stay-filter-collapsed" onClick={onClick}>
            <div className="filter-container-collapsed">
                <input
                 className="filter-input-collapsed"
                    type="text"
                    name="location"
                    value={filterToEdit.location}
                    placeholder="Anywhere"
                    onChange={handleChange}
                />
                <DatePicker
                 className="filter-input-collapsed"
                    selectsRange
                    startDate={filterToEdit.startDate}
                    endDate={filterToEdit.endDate}
                    onChange={([start, end]) => setFilterToEdit({ ...filterToEdit, startDate: start, endDate: end })}
                    placeholderText="Anyweek"
                    monthsShown={2}
                    minDate={new Date()}
                     dateFormat="MMM d"
                />
                <div className="guests-picker-collapsed" ref={guestsRef}>
                    {/* <button onClick={() => setIsGuestsOpen(!isGuestsOpen)}>
                        {filterToEdit.guests.adults + filterToEdit.guests.children > 0
                            ? `${filterToEdit.guests.adults + filterToEdit.guests.children} guests`
                            : 'Add guests'}
                    </button> */}
                    <input
                     className="filter-input-collapsed  guests-input-collapsed"
                        type="text"
                        readOnly
                        value={filterToEdit.guests.adults + filterToEdit.guests.children > 0
                            ? `${filterToEdit.guests.adults + filterToEdit.guests.children} guests`
                            : ''}
                        placeholder="Add guests"
                        onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                    />
                    {isGuestsOpen && (
                        <div className="guests-dropdown-collapsed">
                            {guestTypes.map(({ key, label }) => (
                                <div className="guest-row-collapsed" key={key}>
                                    <span>{label}</span>
                                    <button onClick={() => updateGuests(key, -1)}>-</button>
                                    <span>{filterToEdit.guests[key]}</span>
                                    <button onClick={() => updateGuests(key, 1)}>+</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* <button onClick={onSearch}>🔍</button> */}
                <button className="search-btn" onClick={onSearch}>
    <BiSearch />
</button>
            </div>
        </section>
    )
}