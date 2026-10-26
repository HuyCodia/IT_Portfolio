import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import type { Project } from '../types';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-[var(--background-color)] py-20 relative border-t border-[var(--border-color)]">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="mb-12 md:mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-[var(--primary-color)]">&gt;</span> Ausgewählte Projekte
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl text-lg">
            Ein Auszug aus meinen akademischen und persönlichen Arbeiten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card group bg-[var(--surface-color)] border border-[var(--border-color)] overflow-hidden h-full flex flex-col glow-border">
      <figure className="aspect-video w-full border-b border-[var(--border-color)] relative">
        <div className="project-overlay absolute inset-0 bg-[var(--primary-color)]/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />

        {project.year && (
          <div
            className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded text-xs font-mono font-semibold text-[var(--text-color)] bg-[#161B22]/90 border border-[var(--border-color)] backdrop-blur-md shadow-md flex items-center gap-1.5 pointer-events-none"
            style={{ borderRadius: '4px' }}
          >
            <i className="fa-regular fa-calendar text-[var(--primary-color)] text-[11px]" />
            <span>{project.year}</span>
          </div>
        )}

        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            className="project-media w-full h-full object-cover transition-all duration-500"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#161B22] to-[#0B0F14] text-[var(--text-muted)]">
            <i className="fa-solid fa-code text-3xl mb-2 text-[var(--primary-color)] opacity-70" />
            <span className="text-xs font-mono font-medium text-[var(--text-muted)]">
              {project.placeholderText || 'Projekt-Bild Platzhalter'}
            </span>
          </div>
        )}
      </figure>

      <div className="card-body p-6 flex flex-col flex-grow">
        <h3
          className="card-title text-xl font-bold text-[var(--text-color)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {project.title}
        </h3>

        <p className="text-[var(--text-muted)] text-sm mb-4 mt-2 flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[var(--secondary-color)]/10 border border-[var(--secondary-color)]/30 rounded text-xs text-[var(--secondary-color)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="card-actions justify-start gap-4 mt-auto border-t border-[var(--border-color)] pt-4">
          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <i className="fa-brands fa-github" /> source
            </a>
          ) : (
            <span
              className="text-sm font-semibold text-[var(--text-muted)] opacity-40 cursor-not-allowed flex items-center gap-1.5 select-none"
              style={{ fontFamily: 'var(--font-mono)' }}
              title="Quellcode ist für dieses Projekt nicht öffentlich verfügbar"
            >
              <i className="fa-brands fa-github opacity-60" /> source
            </span>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--text-color)] hover:text-[var(--accent-color)] transition-colors flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <i className="fa-solid fa-arrow-up-right-from-square" /> {project.demoLabel || 'website'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
