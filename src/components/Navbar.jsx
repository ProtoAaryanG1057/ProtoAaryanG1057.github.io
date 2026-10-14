import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar({ currentRoute, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (currentRoute !== 'home') {
      // If on detail page, navigate to home first, then scroll
      onNavigate('home', href);
    } else {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: isScrolled ? 'rgba(11, 13, 16, 0.94)' : 'rgba(11, 13, 16, 0.75)',
        borderBottomColor: isScrolled ? 'rgba(183, 184, 181, 0.2)' : 'rgba(183, 184, 181, 0.1)'
      }}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="container navbar-inner">
        {/* Brand Identity */}
        <a href="#/" onClick={handleBrandClick} className="nav-brand" aria-label="Home">
          <svg
            className="brand-logo-basketball"
            viewBox="0 0 32 32"
            width="30"
            height="30"
            fill="none"
            aria-hidden="true"
          >
            {/* Backboard */}
            <rect x="23" y="4" width="2.5" height="18" rx="1" fill="#FFFFFF" fillOpacity="0.85" />
            <line x1="21" y1="15" x2="23" y2="15" stroke="#FF5500" strokeWidth="2.5" />

            {/* Back rim arc */}
            <path d="M 6 15 A 8 2.8 0 0 1 22 15" fill="none" stroke="#FF5500" strokeWidth="2.2" />

            {/* Nylon Net */}
            <g stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.75" fill="none">
              <path d="M 7 15 L 10 24 L 18 24 L 21 15" />
              <line x1="11" y1="15" x2="16" y2="24" strokeWidth="0.9" />
              <line x1="17" y1="15" x2="12" y2="24" strokeWidth="0.9" />
              <ellipse cx="14" cy="19.5" rx="5.2" ry="1.6" strokeWidth="0.8" />
            </g>

            {/* The Basketball Entering the Rim */}
            <g>
              <circle cx="14" cy="12" r="5.2" fill="#FA7921" stroke="#1A0600" strokeWidth="0.9" />
              <line x1="8.8" y1="12" x2="19.2" y2="12" stroke="#1A0600" strokeWidth="0.8" />
              <line x1="14" y1="6.8" x2="14" y2="17.2" stroke="#1A0600" strokeWidth="0.8" />
              <path d="M 10.5 8.2 Q 14 12 10.5 15.8" fill="none" stroke="#1A0600" strokeWidth="0.7" />
              <path d="M 17.5 8.2 Q 14 12 17.5 15.8" fill="none" stroke="#1A0600" strokeWidth="0.7" />
            </g>

            {/* Front rim arc covering front of ball */}
            <path d="M 6 15 A 8 2.8 0 0 0 22 15" fill="none" stroke="#FF5500" strokeWidth="2.4" />
          </svg>

          <div>
            <span className="brand-title">{siteConfig.brand.title}</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {siteConfig.navigation.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="nav-link"
                onClick={(e) => handleNavClick(item.href, e)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mobile-only-contact" style={{ display: mobileMenuOpen ? 'block' : 'none' }}>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mono-tag"
              style={{ color: 'var(--color-ice-blue)' }}
            >
              DIRECT CONTACT →
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}
