import React, { useEffect } from 'react';
import { getProjectById } from '../data/projects';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export function ProjectDetail({ projectId, onSelectProject, onBackToHome }) {
  const project = getProjectById(projectId);

  // Scroll to top upon mounting or when project changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <main className="container detail-page" style={{ textAlign: 'center', paddingBlock: '8rem' }}>
        <p className="mono-label mono-accent">404 / NOT FOUND</p>
        <h1 style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>PROJECT RECORD NOT FOUND</h1>
        <p style={{ marginBottom: '2.5rem' }}>The requested engineering specification could not be located.</p>
        <button onClick={onBackToHome} className="btn-primary">
          ← RETURN TO HOME
        </button>
      </main>
    );
  }

  return (
    <main className="container detail-page" id="main-content">
      {/* Detail Top Navigation */}
      <div className="detail-nav-bar">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            onBackToHome();
          }}
          className="detail-back-link"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>BACK TO ALL PROJECTS</span>
        </a>

        <div className="mono-label">
          <span className="mono-accent">{project.code}</span> / PROJECT
        </div>
      </div>

      {/* Brief Description of the Work with Thumbnail */}
      <section className="detail-brief" style={{ marginBottom: '3rem', maxWidth: '1200px' }}>
        <div
          className="detail-brief-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: '2.5rem',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <h1 className="detail-title">{project.title}</h1>
            <p className="detail-subtitle">{project.subtitle}</p>
            <p className="detail-prose" style={{ marginTop: '1.5rem', fontSize: '1.25rem', lineHeight: '1.8' }}>
              {project.sections.overview}
            </p>
          </div>
          <div className="detail-thumbnail-card">
            <img
              src={project.primaryImage}
              alt={`Thumbnail of ${project.title}`}
              className="detail-thumbnail-img"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '4px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
              }}
            />
          </div>
        </div>
      </section>

      {/* Videos */}
      {project.videos && project.videos.length > 0 && (
        <section className="detail-videos" aria-label="Hardware Demos" style={{ marginBottom: '4rem' }}>
          <h2 className="detail-section-heading">HARDWARE DEMOS &amp; KINEMATIC TESTS</h2>
          <div className="detail-video-grid">
            {project.videos.map((vid, idx) => (
              <div key={idx} className={`detail-video-card ${idx === 0 ? 'full-width' : ''}`}>
                <video
                  controls
                  muted
                  loop
                  playsInline
                  className="detail-video-player"
                  src={vid.src}
                >
                  Your browser does not support the video tag.
                </video>
                {vid.title && (
                  <span className="mono-label" style={{ marginTop: '0.65rem', display: 'block', fontSize: '0.78rem', color: 'var(--color-ice-blue)', fontFamily: 'var(--font-body)' }}>
                    {vid.title}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GitHub Repository - Clearly Represented */}
      <section className="detail-github" style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9rem',
            padding: '1rem 2.2rem',
            minWidth: '260px',
            justifyContent: 'center',
          }}
        >
          <ArrowUpRight size={17} aria-hidden="true" />
          <span>VIEW FLEXWALK ON GITHUB</span>
        </a>
        <p style={{ marginTop: '0.85rem', fontSize: '0.85rem', color: 'var(--color-muted)' }}>
          Design files, CAD geometry, and simulation test harnesses.
        </p>
      </section>
    </main>
  );
}
