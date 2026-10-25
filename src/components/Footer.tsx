import React from 'react';
import { navLinks, personalInfo } from '../data/portfolioData';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--background-color)] pt-14 pb-8 border-t border-[var(--border-color)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-[var(--border-color)]">
          {/* Brand */}
          <div>
            <a
              href="#top"
              className="inline-block text-2xl font-bold text-[var(--text-color)] transition-colors hover:text-[var(--primary-color)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {personalInfo.name}
              <span className="text-[var(--primary-color)] animate-pulse">_</span>
            </a>
            <p
              className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {personalInfo.title}.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Navigation
            </p>
            <nav
              className="flex flex-col items-start gap-2 text-sm"
              aria-label="Footer-Navigation"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="text-[var(--text-muted)] hover:text-[var(--primary-color)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Social
            </p>
            <nav
              className="flex flex-col items-start gap-2 text-sm"
              aria-label="Social-Media"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary-color)] transition-colors"
              >
                <i className="fa-brands fa-github w-4 text-center" /> GitHub
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary-color)] transition-colors"
              >
                <i className="fa-brands fa-linkedin w-4 text-center" /> LinkedIn
              </a>
            </nav>
          </div>

          {/* Direkt */}
          <div>
            <p
              className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Direkt
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="block font-bold text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {personalInfo.email}
            </a>
            <p
              className="mt-2 text-sm text-[var(--text-muted)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {personalInfo.location}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-sm text-[var(--text-muted)]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            &copy; {CURRENT_YEAR} {personalInfo.name}. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};
