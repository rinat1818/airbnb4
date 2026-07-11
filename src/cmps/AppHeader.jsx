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
        setTimeout(() => {
            if (isHomePage && window.scrollY < 100) {
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
                    {/* <Link to="/add-stay" className="host-link">מארח</Link> */}
                    <div className="user-menu">
                        {loggedinUser && !loggedinUser.isHost && <Link to="/add-stay" className="host-link">Become a Host</Link>}
                        <button className={`menu-btn ${loggedinUser ? 'logged-in' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {loggedinUser ? (
                                <img src={loggedinUser.imgUrl} alt={loggedinUser.fullname} className="user-avatar" />
                            ) : (
                                '☰'
                            )}
                            {/* {loggedinUser && <Link to="/add-stay" className="host-link">מארח</Link>} */}
                        </button>
                        {isMenuOpen && (
                            <div className="dropdown">
                                {loggedinUser ? (
                                    <>
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
                    {/* <StayFilter onSearchDone={() => { setTimeout(() => { setShowFull(false); setShowCollapsed(true); setUserExpanded(false) }, 50) }} /> */}
                    <StayFilter onSearchDone={() => setUserExpanded(false)} />
                </div>
            </section>
        </header>
    )
}