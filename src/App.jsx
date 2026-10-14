import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { BasketballCourtBackground } from './components/BasketballCourtBackground';
import { siteConfig } from './data/siteConfig';

export function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [activeProjectId, setActiveProjectId] = useState(null);

  // Parse location hash
  const parseHash = () => {
    const hash = window.location.hash || '';
    if (hash.startsWith('#/project/')) {
      const id = hash.replace('#/project/', '').split('?')[0];
      setCurrentRoute('project');
      setActiveProjectId(id);
    } else {
      setCurrentRoute('home');
      setActiveProjectId(null);

      // Handle anchor scroll on initial load if present
      if (hash && hash !== '#/' && !hash.startsWith('#/')) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  useEffect(() => {
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleSelectProject = (projectId) => {
    window.location.hash = `#/project/${projectId}`;
  };

  const handleBackToHome = () => {
    window.location.hash = '#/';
  };

  const handleNavigate = (route, targetHash) => {
    if (route === 'home') {
      if (targetHash) {
        window.location.hash = targetHash;
      } else {
        window.location.hash = '#/';
      }
    }
  };

  return (
    <div className="app-root">
      {/* Blurry Dark Basketball Court Background with Scroll Animation */}
      <BasketballCourtBackground />

      {/* Skip to Main Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="mono-tag"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '1rem',
          zIndex: 9999,
          backgroundColor: 'var(--color-ice-blue)',
          color: 'var(--color-obsidian)',
          padding: '0.5rem 1rem',
          fontWeight: 'bold',
          transition: 'top var(--transition-fast)'
        }}
        onFocus={(e) => (e.currentTarget.style.top = '1rem')}
        onBlur={(e) => (e.currentTarget.style.top = '-100px')}
      >
        SKIP TO MAIN CONTENT ↓
      </a>

      {/* Persistent Navigation */}
      <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Page Routing */}
      {currentRoute === 'project' && activeProjectId ? (
        <ProjectDetail
          projectId={activeProjectId}
          onSelectProject={handleSelectProject}
          onBackToHome={handleBackToHome}
        />
      ) : (
        <Home onSelectProject={handleSelectProject} />
      )}

      {/* Persistent Engineering Footer */}
      <Footer />
    </div>
  );
}

export default App;
