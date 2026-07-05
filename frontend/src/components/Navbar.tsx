import { useState } from 'react'
import logo from '../assets/pathfinder-logo.png'
import './Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((open) => !open)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo" aria-label="PathFinder home">
          <img src={logo} alt="PathFinder" className="navbar-logo-image" />
        </a>

        <div className="navbar-links">
          <a href="#how-it-works" className="nav-link">
            How it works
          </a>
          <a href="#schools" className="nav-link">
            For schools
          </a>
          <a href="#login" className="nav-link">
            Log in
          </a>
        </div>

        <a href="#start" className="navbar-cta navbar-cta-desktop">
          Start assessment
        </a>

        {isMenuOpen ? (
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded="true"
            aria-controls="mobile-menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      <div id="mobile-menu" className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <a href="#how-it-works" className="mobile-nav-link" onClick={closeMenu}>
          How it works
        </a>
        <a href="#schools" className="mobile-nav-link" onClick={closeMenu}>
          For schools
        </a>
        <a href="#login" className="mobile-nav-link" onClick={closeMenu}>
          Log in
        </a>
        <a href="#start" className="mobile-cta" onClick={closeMenu}>
          Start assessment
        </a>
      </div>
    </nav>
  )
}

export default Navbar