
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { userService } from './services/user.service.js'

export function RootCmp() {
    const [filterBy, setFilterBy] = useState({ location: '' })
    const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())

    return (
        <div>
            {/* <AppHeader filterBy={filterBy} setFilterBy={setFilterBy} /> */}
            <AppHeader filterBy={filterBy} setFilterBy={setFilterBy} loggedinUser={loggedinUser} setLoggedinUser={setLoggedinUser} />
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/stay" element={<StayIndex />} />
                    <Route path="/stay/search" element={<StayIndex />} />
                    <Route path="/login" element={<LoginPage onSetUser={setLoggedinUser} />} />
                    <Route path="/signup" element={<SignupPage onSetUser={setLoggedinUser} />} />
                </Routes>
            </main>
        </div>
    )
}