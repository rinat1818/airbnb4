
// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AddStay } from './pages/AddStay.jsx'

// import { ScrollToTop } from './cmps/ScrollToTop.jsx'



import { ScrollToTop } from './cmps/ScrollToTop.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import './assets/styles/main.css'


export function RootCmp() {
    return (
        <div className="main-layout">
            <ScrollToTop />
            <AppHeader />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/stay" element={<StayIndex />} />
                    <Route path="/stay/search" element={<StayIndex />} />
                    <Route path="/stay/:stayId" element={<StayDetails />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/user" element={<UserDetails />} />
                    <Route path="/add-stay" element={<AddStay />} />
                </Routes>
            </div>
            <AppFooter />
        </div>
    )
}