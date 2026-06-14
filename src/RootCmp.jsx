
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx'
import { StayIndex } from './pages/StayIndex.jsx'

export function RootCmp() {
    const [filterBy, setFilterBy] = useState({ location: '' })


    return (
        <div>
            <AppHeader filterBy={filterBy} setFilterBy={setFilterBy} />
            <main>
                <Routes>
                    <Route path="/" element={<StayIndex />} />
                    <Route path="/stay" element={<StayIndex />} />
                    <Route path="/stay/search" element={<StayIndex />} />
                </Routes>
            </main>
        </div>
    )
}