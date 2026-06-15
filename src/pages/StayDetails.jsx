import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { stayService } from '../services/stayService.js'

export function StayDetails() {
    const { stayId } = useParams()
    const navigate = useNavigate()
    const [stay, setStay] = useState(null)

    useEffect(() => {
        async function loadStay() {
            try {
                const stay = await stayService.get(stayId)
                setStay(stay)
            } catch (err) {
                console.error('Failed to load stay:', err)
                navigate('/')
            }
        }
        loadStay()
    }, [stayId])

    if (!stay) return <div className="loading">Loading...</div>

    return (
        <section className="stay-details">
            <button onClick={() => navigate(-1)} className="btn-back">← Back</button>

            <h1>{stay.name}</h1>
            <p>{stay.loc.city}, {stay.loc.country}</p>

            <div className="photos-placeholder">
                <img src={stay.imgUrls[0]} alt={stay.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            </div>

            <div className="details-body">
                <p>{stay.summary}</p>
            </div>
        </section>
    )
}
