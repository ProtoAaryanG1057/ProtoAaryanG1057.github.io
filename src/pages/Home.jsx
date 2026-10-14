import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { projects } from '../data/projects';
import { HeroScene } from '../components/HeroScene';
import { ProjectCard } from '../components/ProjectCard';
import { RotateCcw, Zap, ArrowDownRight, Mail, Github, ArrowRight } from 'lucide-react';

export function Home({ onSelectProject }) {
  const [impulseCount, setImpulseCount] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleSculptureClick = () => {
    setImpulseCount((c) => c + 1);
  };

  const handleResetView = (e) => {
    e.stopPropagation();
    setResetTrigger((t) => t + 1);
  };

  const handleManualImpulse = (e) => {
    e.stopPropagation();
    setImpulseCount((c) => c + 1);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.querySelector(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="main-content">
      {/* 1. HERO SECTION */}
      <section className="hero-section" aria-label="Hero Introduction">
        <div className="container hero-layout">
          {/* Left Hero Column */}
          <div className="hero-content">
            <div className="hero-eyebrow-container">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-line" aria-hidden="true" />
                <span className="mono-label mono-accent">{siteConfig.hero.eyebrow}</span>
              </div>
              <div className="hero-photo-frame">
                <img
                  src="./images/myphoto.webp"
                  alt="Aaryan Gaikwad"
                  className="hero-visible-photo"
                />
              </div>
            </div>

            <h1 className="hero-headline">
              <span className="headline-row">
                {siteConfig.hero.headlinePart1}{' '}
                <span className="headline-accent">{siteConfig.hero.headlinePart2}</span>
              </span>
              {siteConfig.hero.headlinePart3 ? (
                <span className="headline-row">{siteConfig.hero.headlinePart3}</span>
              ) : null}
            </h1>

            <p className="hero-supporting">
              {siteConfig.hero.supportingText}
            </p>

            <div className="hero-actions">
              <a
                href="#work"
                onClick={(e) => scrollToSection(e, '#work')}
                className="btn-primary"
              >
                <span>{siteConfig.hero.primaryCtaText}</span>
              </a>

              <a
                href="#about"
                onClick={(e) => scrollToSection(e, '#about')}
                className="btn-secondary"
              >
                <span>{siteConfig.hero.secondaryCtaText}</span>
              </a>
            </div>

            {/* Left Telemetry Stamp */}
            <div className="hero-meta-strip">
              <div className="hero-meta-row">
                <span className="mono-label">PRIMARY DISCIPLINE</span>
                <span className="mono-label" style={{ color: 'var(--color-warm-white)' }}>
                  ROBOTICS &amp; MECHANISMS
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: 3D Interactive WebGL Sculpture */}
          <div className="hero-canvas-column">
            <HeroScene
              impulseCount={impulseCount}
              onCanvasClick={handleSculptureClick}
              resetTrigger={resetTrigger}
            />

            {/* Viewport Interaction Hint */}
            <div className="hero-interaction-hint">
              <span>DRAG TO ROTATE · CLICK IMPULSE</span>
            </div>

            {/* Controls Overlay */}
            <div className="hero-canvas-controls">
              <button
                type="button"
                onClick={handleManualImpulse}
                className="hero-control-btn"
                title="Trigger dynamic rotational impulse"
                aria-label="Trigger impulse"
              >
                <Zap size={13} color="var(--color-ice-blue)" aria-hidden="true" />
                <span>IMPULSE</span>
              </button>

              <button
                type="button"
                onClick={handleResetView}
                className="hero-control-btn"
                title="Reset camera and sculpture orientation"
                aria-label="Reset viewport"
              >
                <RotateCcw size={13} color="var(--color-titanium)" aria-hidden="true" />
                <span>RESET VIEW</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Footer Bar */}
        <div className="hero-footer-bar">
          <div className="container hero-footer-inner">
            <span className="mono-label">
              {siteConfig.hero.technicalCaption}
            </span>
            <span className="mono-label mono-accent">
              {siteConfig.hero.materialsLabel}
            </span>
          </div>
        </div>
      </section>

      {/* 2. SELECTED PROJECTS SECTION */}
      <section id="work" className="section-padding" aria-label="Selected Projects">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <span className="mono-label mono-accent">01 / PORTFOLIO</span>
            </div>
            <h2 className="section-title">PROTOTYPES AND PROBLEMS</h2>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}  
                project={project}
                onSelectProject={onSelectProject}
              />
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* 3. CAPABILITIES SECTION */}
      <section id="capabilities" className="section-padding" aria-label="Engineering Capabilities">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <span className="mono-label mono-accent">02 / DOMAINS</span>
            </div>
            <h2 className="section-title">TECHNICAL CAPABILITIES</h2>
            <p className="section-description">
              Practical competencies across mechanical design, robotic kinematics, embedded hardware, and computational simulation.
            </p>
          </div>

          <div className="capabilities-grid">
            {siteConfig.capabilities.map((cap) => (
              <div key={cap.category} className="capability-card">
                <div className="capability-card-header">
                  <h3 className="capability-card-title">{cap.category}</h3>
                  <span className="mono-label mono-accent">{cap.code}</span>
                </div>
                <p className="capability-card-desc">{cap.description}</p>
                <ul className="capability-skills-list">
                  {cap.skills.map((skill, idx) => (
                    <li key={idx} className="capability-skill-item">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* 4. ABOUT SECTION */}
      <section id="about" className="section-padding" aria-label="About Philosophy">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <span className="mono-label mono-accent">03 / PHILOSOPHY</span>
            </div>
            <h2 className="section-title">{siteConfig.about.headline}</h2>
            {siteConfig.about.subheading ? (
              <p className="section-description">{siteConfig.about.subheading}</p>
            ) : null}
          </div>

          <div className="about-grid">
            <div className="about-body-text">
              {siteConfig.about.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}

              <div style={{ marginTop: '1rem' }}>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="btn-secondary"
                >
                  <span>CONNECT FOR TECHNICAL INQUIRIES →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="section-padding" aria-label="Contact Information">
        <div className="container">
          <div className="contact-container">
            <div className="contact-header">
              <div className="section-eyebrow">
                <span className="mono-label mono-accent">04 / DIALOGUE</span>
              </div>
              <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
                {siteConfig.contact.headline}
              </h2>
              <p className="section-description" style={{ fontSize: '1.05rem', marginTop: '1rem' }}>
                {siteConfig.contact.subheading}
              </p>
            </div>

            <div className="contact-links-grid">
              {/* Email */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="contact-link-card"
              >
                <div className="contact-link-info">
                  <span className="contact-link-title">Direct Email</span>
                  <span className="contact-link-val">{siteConfig.contact.email}</span>
                </div>
                <Mail className="contact-link-icon" size={20} aria-hidden="true" />
              </a>

              {/* GitHub */}
              <a
                href={siteConfig.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-card"
              >
                <div className="contact-link-info">
                  <span className="contact-link-title">GitHub Profile</span>
                  <span className="contact-link-val">@ProtoAaryanG1057</span>
                </div>
                <Github className="contact-link-icon" size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
