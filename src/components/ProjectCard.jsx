import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard({ project, onSelectProject }) {
  const handleClick = (e) => {
    e.preventDefault();
    onSelectProject(project.id);
  };

  return (
    <article className="project-card">
      {/* Card Header Stamp */}
      <div className="project-card-header">
        <span className="project-card-code">{project.code}</span>
        <span className="project-card-status">{project.status}</span>
      </div>

      {/* Media / CAD Preview Viewport */}
      <a
        href={`#/project/${project.id}`}
        onClick={handleClick}
        className="project-card-media"
        aria-label={`View documentation for ${project.title}`}
      >
        <img
          src={project.primaryImage}
          alt={`Technical drawing and rendering for ${project.title}`}
          className="project-card-img"
          loading="lazy"
        />
        <div className="card-media-overlay" />
      </a>

      {/* Card Body */}
      <div className="project-card-body">
        <span className="project-card-category">{project.category}</span>
        <h3 className="project-card-title">
          <a href={`#/project/${project.id}`} onClick={handleClick}>
            {project.title}
          </a>
        </h3>
        <p className="project-card-summary">{project.summary}</p>

        {/* Highlight Specifications */}
        <div className="project-card-specs">
          {project.specs.slice(0, 2).map((spec, idx) => (
            <div key={idx} className="project-card-spec-item">
              <span className="project-card-spec-label">{spec.label}</span>
              <span className="project-card-spec-val">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Technical Tags */}
        <div className="project-card-tags">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span key={idx} className="mono-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer Link */}
        <div className="project-card-footer">
          <a
            href={`#/project/${project.id}`}
            onClick={handleClick}
            className="project-card-link"
          >
            <span>VIEW ARCHITECTURE</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
