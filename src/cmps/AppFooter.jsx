import React from 'react'
import '../assets/styles/cmps/AppFooter.css'
import FacebookIcon from '../assets/icons/facebook.svg'
import InstagramIcon from '../assets/icons/instagram.svg'
import TwitterIcon from '../assets/icons/twitter.svg'
import GlobeIcon from '../assets/icons/globe.svg'

const footerData = {
    Support: [
        { label: 'Help Center', href: '#' },
        { label: 'Get help with a safety issue', href: '#' },
        { label: 'AirCover', href: '#' },
        { label: 'Travel insurance', href: '#' },
        { label: 'Anti-discrimination', href: '#' },
        { label: 'Disability support', href: '#' },
        { label: 'Cancellation options', href: '#' },
        { label: 'Report neighborhood concern', href: '#' },
    ],
    Hosting: [
        { label: 'Airbnb your home', href: '#' },
        { label: 'Airbnb your experience', href: '#' },
        { label: 'Airbnb your service', href: '#' },
        { label: 'AirCover for Hosts', href: '#' },
        { label: 'Hosting resources', href: '#' },
        { label: 'Community forum', href: '#' },
        { label: 'Hosting responsibly', href: '#' },
        { label: 'Airbnb-friendly apartments', href: '#' },
        { label: 'Join a free hosting class', href: '#' },
        { label: 'Find a co‑host', href: '#' },
        { label: 'Refer a host', href: '#' },
    ],
    Airbob: [
        { label: '2026 Summer Release', href: '#' },
        { label: 'Newsroom', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Investors', href: '#' },
        { label: 'Gift cards', href: '#' },
        { label: 'Airbnb.org emergency stays', href: '#' },
    ],
}


export function AppFooter() {
    return (
        <footer className="main-footer">
            <div className="links-container">
                {Object.entries(footerData).map(([section, links]) => (
                    <div className="links-column" key={section}>
                        <h3 className="links-heading">{section}</h3>
                        <ul className="links-list">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <a className="footer-link" target="_blank" rel="noopener noreferrer">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="footer-bottom">
                <div className="copyright-container">
                    <span>© 2026 Airbob, Inc.</span>
                    <span className="dot">·</span>
                    <a className="privacy-link">Privacy</a>
                    <span className="dot">·</span>
                    <a className="terms-link">Terms</a>
                    <span className="dot">·</span>
                    <a className="choice-link">Your Privacy Choices</a>
                </div>

                <div className="social-container">
                    <img src={GlobeIcon} alt="Globe" />
                    <h3>English (US)</h3>
                    <h3>$ USD</h3>
                    <div className="icons-container">
                        <button className="icon-btn">
                            <img src={FacebookIcon} alt="Facebook" />
                        </button>
                        <button className="icon-btn">
                            <img src={TwitterIcon} alt="Twitter" />
                        </button>
                        <button className="icon-btn">
                            <img src={InstagramIcon} alt="Instagram" />
                        </button>
                    </div>
                </div>
            </div>
        </footer >
    )
}