
import { StayFilter } from './StayFilter.jsx'
import { userService } from '../services/user.service.js'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export function AppHeader({ filterBy, setFilterBy, loggedinUser, setLoggedinUser }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    async function onLogout() {
        await userService.logout()
        setLoggedinUser(null)
        setIsMenuOpen(false)
    }

    return (
        <header className="app-header">
            <section className="header-container">
                <h1 className="logo">airbnb</h1>
                <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} />
                <div className="user-menu">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {loggedinUser ? loggedinUser.fullname : 'butten'}
                    </button>
                    {isMenuOpen && (
                        <div className="dropdown">
                            {loggedinUser ? (
                                <button onClick={onLogout}>Logout</button>
                            ) : (
                                <>
                                    <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Log in</NavLink>
                                    <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>Sign up</NavLink>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </header>
    )
}


