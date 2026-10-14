import React, { useEffect } from 'react';
import { getProjectById, projects } from '../data/projects';
import { siteConfig } from '../data/siteConfig';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

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

  // Calculate Previous and Next project indices
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

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
          <span className="mono-accent">{project.code}</span> / ARCHIVAL SPECIFICATION
        </div>
      </div>

      {/* Detail Header */}
      <header className="detail-header">
        <div className="detail-meta-eyebrow">
          <span className="mono-tag" style={{ color: 'var(--color-ice-blue)' }}>{project.code}</span>
          <span className="mono-tag">{project.category}</span>
          <span className="mono-tag">{project.timeline}</span>
          <span className="mono-tag" style={{ borderColor: 'rgba(158, 220, 255, 0.4)' }}>
            STATUS: {project.status}
          </span>
        </div>

        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-subtitle">{project.subtitle}</p>
      </header>

      {/* Main CAD / Schematic Media & Specifications Matrix */}
      <div className="detail-media-container">
        {/* Main Technical Image */}
        <div className="detail-main-img-card">
          <img
            src={project.primaryImage}
            alt={`Engineering visual for ${project.title}`}
            className="detail-main-img"
          />
          <div className="card-media-overlay" />
        </div>

        {/* Specifications Matrix Sidebar */}
        <aside className="detail-specs-sidebar" aria-label="System Specifications">
          <h2 className="detail-specs-title">SPECIFICATION MATRIX</h2>
          <div className="detail-specs-list">
            {project.specs.map((item, idx) => (
              <div key={idx} className="detail-spec-row">
                <span className="detail-spec-label">{item.label}</span>
                <span className="detail-spec-value">{item.value}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Deep Dive Engineering Documentation Grid */}
      <div className="detail-content-grid">
        <article className="detail-article">
          {/* Section: Project Brief & Highlights */}
          <section className="detail-section-block">
            <h2 className="detail-section-heading">PROJECT BRIEF</h2>
            <p className="detail-prose">{project.sections.overview}</p>
            {project.sections.systemArchitecture && (
              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(158, 220, 255, 0.15)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-ice-blue)', fontFamily: 'var(--font-headline)', marginBottom: '0.85rem' }}>
                  SYSTEM ARCHITECTURE &amp; ACTUATION
                </h3>
                <p className="detail-prose" style={{ whiteSpace: 'pre-line' }}>
                  {project.sections.systemArchitecture}
                </p>
              </div>
            )}
          </section>

          {/* Secondary CAD Assembly Visual */}
          {project.secondaryImage && (
            <section className="detail-section-block">
              <h2 className="detail-section-heading">CAD ASSEMBLY &amp; STRUCTURAL DESIGN</h2>
              <div className="detail-main-img-card" style={{ maxHeight: '440px', marginBlock: '0.5rem' }}>
                <img
                  src={project.secondaryImage}
                  alt={`Supplementary engineering assembly for ${project.title}`}
                  className="detail-main-img"
                />
                <div className="card-media-overlay" />
              </div>
              <p className="detail-prose" style={{ marginTop: '0.75rem', fontSize: '0.98rem', color: '#D4DAE2' }}>
                Exploded CAD assembly highlighting the modular 3D-printed chassis links, flanged ball bearing seats, and high-holding-torque spur gear stages.
              </p>
            </section>
          )}

          {/* Section: Demos & Video Gallery */}
          {project.videos && project.videos.length > 0 && (
            <section className="detail-section-block">
              <h2 className="detail-section-heading">HARDWARE DEMOS &amp; KINEMATIC TESTS</h2>
              <p className="detail-prose">
                Empirical test recordings verifying bipedal lower-body joint articulation, stance stability, and swing-phase motion.
              </p>
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
        </article>

        {/* Right Sticky Sidebar: Tools & Metadata */}
        <aside className="detail-sidebar-column">
          <div className="detail-tools-card">
            <h3 className="detail-tools-title">TECHNOLOGIES &amp; TOOLS</h3>
            <div className="detail-tools-tags">
              {project.sections.technologiesUsed.map((tech, idx) => (
                <span key={idx} className="mono-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-tools-card">
            <h3 className="detail-tools-title">DISCIPLINE REPOSITORY</h3>
            <p className="detail-tools-desc">
              Design files, CAD step geometry, and simulation test harnesses.
            </p>
            <a
              href={project.repoUrl || siteConfig.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>VIEW ON GITHUB</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>

      {/* Pagination Footer */}
      {projects.length > 1 && (
        <nav className="project-pagination" aria-label="Project Navigation">
          <a
            href={`#/project/${prevProject.id}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectProject(prevProject.id);
            }}
            className="pagination-card"
          >
            <span className="pagination-label">← PREVIOUS SYSTEM ({prevProject.code})</span>
            <span className="pagination-title">{prevProject.title}</span>
          </a>

          <a
            href={`#/project/${nextProject.id}`}
            onClick={(e) => {
              e.preventDefault();
              onSelectProject(nextProject.id);
            }}
            className="pagination-card next"
          >
            <span className="pagination-label">NEXT SYSTEM ({nextProject.code}) →</span>
            <span className="pagination-title">{nextProject.title}</span>
          </a>
        </nav>
      )}
    </main>
  );
}
