import { useState, useEffect } from 'react'

import { StayFilter } from './StayFilter.jsx'
import { StayFilterCollapsed } from './StayFilterCollapsed.jsx'

import { userService } from '../services/user.service.js'
import { NavLink, useLocation } from 'react-router-dom'

export function AppHeader({ filterBy, setFilterBy, loggedinUser, setLoggedinUser }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showFull, setShowFull] = useState(false)
    const [showCollapsed, setShowCollapsed] = useState(false)
    const [userExpanded, setUserExpanded] = useState(false)

    const location = useLocation()
    const isHomePage = location.pathname === '/'

    useEffect(() => {
        function handleScroll() {
            const scrollY = window.scrollY
            if (isHomePage) {
                if (scrollY > 100 && showFull && !userExpanded) {
                    setShowFull(false)
                    setTimeout(() => setShowCollapsed(true), 100)
                }
                if (scrollY < 50 && showCollapsed) {
                    setShowCollapsed(false)
                    setTimeout(() => setShowFull(true), 100)
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHomePage, showFull, showCollapsed])

    useEffect(() => {
        if (isHomePage && window.scrollY < 100) {
            setShowFull(true)
            setShowCollapsed(false)
        } else {
            setShowFull(false)
            setShowCollapsed(true)
        }
    }, [location.pathname])

    async function onLogout() {
        await userService.logout()
        setLoggedinUser(null)
        setIsMenuOpen(false)
    }

    return (
        <header className="app-header">
            <section className="header-container">
                <div className="header-top">
                    <h1 className="logo">airbnb</h1>
                    <div
                        className={`filter-collapsed-wrapper ${showCollapsed ? 'visible' : ''}`}
                        onClick={() => { setShowCollapsed(false); setShowFull(true); setUserExpanded(true) }}
                    >
                        <StayFilterCollapsed filterBy={filterBy} setFilterBy={setFilterBy} onClick={() => { setShowCollapsed(false); setShowFull(true) }} />
                    </div>
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
                </div>
                <div className={`header-bottom ${showFull ? 'visible' : ''}`}>
                    <StayFilter filterBy={filterBy} setFilterBy={setFilterBy} onSearchDone={() => { setShowFull(false); setShowCollapsed(true); setUserExpanded(false) }} />
                </div>
            </section>
        </header>
    )
}