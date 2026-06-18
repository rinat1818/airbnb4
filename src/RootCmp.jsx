
// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { StayIndex } from './pages/StayIndex.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { StayDetails } from './pages/StayDetails.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import './assets/styles/main.css'


export function RootCmp() {
    return (
        <div className="main-layout">
            <AppHeader />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/stay" element={<StayIndex />} />
                    <Route path="/stay/:stayId" element={<StayDetails />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </div>
            <AppFooter />
        </div>
    )
}