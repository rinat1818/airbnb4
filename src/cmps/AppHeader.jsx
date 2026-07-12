import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StayFilter } from './StayFilter.jsx'
import { StayFilterCollapsed } from './StayFilterCollapsed.jsx'
import { logout } from '../store/actions/user.actions.js'
import { NavLink, useLocation } from 'react-router-dom'
import airbnb from '../assets/icons/airbnb.svg'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

export function AppHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [showFull, setShowFull] = useState(false)
    const [showCollapsed, setShowCollapsed] = useState(false)
    const [userExpanded, setUserExpanded] = useState(false)

    // const filterRef = useRef(null)
    const headerRef = useRef(null)
    const dispatch = useDispatch()
    const loggedinUser = useSelector(state => state.userModule.loggedinUser)

    const location = useLocation()
    const isHomePage = location.pathname === '/'

    // Same breakpoint used across the CSS for the mobile layout.
    function isMobileViewport() {
        return window.innerWidth <= 768
    }

    // Keep --header-height in sync with the header's real, current height
    // (it changes as the header collapses/expands on scroll), so any page
    // can pad its content correctly without hardcoding pixel values.
    useLayoutEffect(() => {
        const headerEl = headerRef.current
        if (!headerEl) return

        function updateHeaderHeight() {
            document.documentElement.style.setProperty('--header-height', `${headerEl.offsetHeight}px`)
        }

        updateHeaderHeight()

        const resizeObserver = new ResizeObserver(updateHeaderHeight)
        resizeObserver.observe(headerEl)

        return () => resizeObserver.disconnect()
    }, [])

    useEffect(() => {
        function handleScroll() {
            const scrollY = window.scrollY
            // if (isHomePage) {
            if (isHomePage || location.search) {
                if (scrollY > 100 && showFull && !userExpanded) {
                    setShowFull(false)
                    setTimeout(() => setShowCollapsed(true), 100)
                }
                // On mobile the filter should only open from an explicit tap,
                // not automatically re-expand just because the user scrolled
                // back up to the top of the page.
                if (!isMobileViewport() && scrollY < 50 && showCollapsed) {
                    setShowCollapsed(false)
                    setTimeout(() => setShowFull(true), 100)
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHomePage, showFull, showCollapsed])

    useEffect(() => {
        setTimeout(() => {
            if (!isMobileViewport() && isHomePage && window.scrollY < 100) {
                setShowFull(true)
                setShowCollapsed(false)
            } else {
                setShowFull(false)
                setShowCollapsed(true)
            }
            setUserExpanded(false)
            setIsMenuOpen(false)
            window.dispatchEvent(new Event('scroll'))
        }, 50)
    }, [location.pathname, location.search])
    //     useEffect(() => {
    //         if (isHomePage && window.scrollY < 100) {
    //     setShowFull(true)
    //     setShowCollapsed(false)
    // } else {
    //     setShowFull(false)
    //     setShowCollapsed(true)
    // }
    //         setUserExpanded(false)
    //           setIsMenuOpen(false)

    //         window.dispatchEvent(new Event('scroll'))

    //     }, [location.pathname, location.search])
    useEffect(() => {
        function handleClickOutside(ev) {
            if (!ev.target.closest('.header-bottom') && !ev.target.closest('.filter-collapsed-wrapper') && !ev.target.closest('.search-btn')) {

                if (showFull) {
                    if (isHomePage && window.scrollY < 100) {
                        setShowFull(true)
                        setShowCollapsed(false)
                        return
                    }
                    if (!isHomePage) return
                    setShowFull(false)
                    setShowCollapsed(true)
                    setUserExpanded(false)
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [showFull, isHomePage])


    async function onLogout() {
        await dispatch(logout())
        setIsMenuOpen(false)
    }

    // On mobile, while the user has actively opened the search filter,
    // lock the page: no background scroll, no touching anything else
    // until they close the filter (✕ button, search, or tap outside).
    useEffect(() => {
        document.body.classList.toggle('search-modal-lock', userExpanded)
        return () => document.body.classList.remove('search-modal-lock')
    }, [userExpanded])

    // Close the account/user dropdown when tapping anywhere outside it
    // (the menu button or the dropdown panel itself).
    useEffect(() => {
        function handleClickOutsideMenu(ev) {
            if (isMenuOpen && !ev.target.closest('.user-menu')) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutsideMenu)
        return () => document.removeEventListener('mousedown', handleClickOutsideMenu)
    }, [isMenuOpen])

    // Same mobile takeover treatment as the search filter: while the
    // dropdown is open, lock the page so nothing else can be scrolled
    // or touched until the menu is closed (tap the button again, pick
    // an item, or tap outside).
    useEffect(() => {
        document.body.classList.toggle('menu-modal-lock', isMenuOpen)
        return () => document.body.classList.remove('menu-modal-lock')
    }, [isMenuOpen])

    return (
        <header className="app-header" ref={headerRef}>
            <section className="header-container">
                <div className="header-top">

                    {/* <div className="logo-container">
                        <img src={airbnb} alt="logo" />
                            <span className="logo-text">airbob</span>
                    </div> */}
                    <Link to="/" className="logo-container">
                        <img src={airbnb} alt="logo" />
                        <span className="logo-text">airbob</span>
                    </Link>

                    <div
                        className={`filter-collapsed-wrapper ${showCollapsed ? 'visible' : ''}`}
                        onClick={() => { setShowCollapsed(false); setShowFull(true); setUserExpanded(true) }}
                    >
                        <StayFilterCollapsed onClick={() => { setShowCollapsed(false); setShowFull(true) }} />
                    </div>
                    <div className="user-menu">
                        {loggedinUser && !loggedinUser.isHost && (
                            <NavLink to="/add-stay" className="host-link">Become a Host</NavLink>
                        )}
                        <button className={`menu-btn ${loggedinUser ? 'logged-in' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {loggedinUser ? (
                                <img src={loggedinUser.imgUrl} alt={loggedinUser.fullname} className="user-avatar" />
                            ) : (
                                '☰'
                            )}
                        </button>
                        {isMenuOpen && (
                            <div className="dropdown">
                                {loggedinUser ? (
                                    <>
                                        {!loggedinUser.isHost && (
                                            <NavLink to="/add-stay" className="host-link-dropdown" onClick={() => setIsMenuOpen(false)}>Become a Host</NavLink>
                                        )}
                                        <NavLink to="/user" onClick={() => setIsMenuOpen(false)}>My user</NavLink>
                                        <NavLink to="/" onClick={onLogout}>Logout</NavLink>
                                    </>

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
                    <button
                        type="button"
                        className="filter-close-btn"
                        onClick={() => { setShowFull(false); setShowCollapsed(true); setUserExpanded(false) }}
                        aria-label="Close search"
                    >
                        ✕
                    </button>
                    <StayFilter onSearchDone={() => setUserExpanded(false)} />
                </div>
            </section>
        </header>
    )
}