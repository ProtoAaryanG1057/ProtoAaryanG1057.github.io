import React from 'react';
import { siteConfig } from '../data/siteConfig';
import { ArrowUp, Github, Mail } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        {/* Left Identity Column */}
        <div className="footer-left">
          <span className="footer-brand">{siteConfig.brand.title}</span>
          <p className="footer-copy">
            © {siteConfig.contact.copyrightYear} {siteConfig.brand.name}
          </p>
        </div>

        {/* Center / Right Links */}
        <div className="footer-links">
          <a
            href={siteConfig.contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link mono-label"
            aria-label="GitHub Profile"
          >
            GITHUB ↗
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="footer-link mono-label"
            aria-label="Send Email"
          >
            EMAIL ↗
          </a>
          <button
            onClick={scrollToTop}
            className="footer-link mono-label"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            aria-label="Back to top"
          >
            <span>TOP</span>
            <ArrowUp size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
