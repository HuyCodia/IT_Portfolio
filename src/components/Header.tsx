import React, { useState, useEffect } from 'react';
import { navLinks, personalInfo } from '../data/portfolioData';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      className="sticky top-6 md:top-8 z-50 w-full flex justify-center px-4 pointer-events-none"
      style={{ top: '24px' }}
    >
      {/* Nur der Kasten um den Inhalt (kein durchgehender Balken über den Bildschirm) */}
      <div className="pointer-events-auto flex items-center justify-between md:justify-center gap-6 md:gap-8 rounded-xl border border-[var(--border-color)] bg-[var(--surface-color)]/90 px-6 py-2.5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.5)] glow-border">
        {/* Brand / Logo */}
        <a
          href="#top"
          className="text-xl md:text-2xl font-bold text-[var(--text-color)] transition-all hover:text-glow shrink-0"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {personalInfo.name}
          <span className="text-[var(--primary-color)] animate-pulse">_</span>
        </a>

        {/* Desktop Navigation - behält Inhalt und Abstände exakt bei */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Hauptnavigation"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            if (link.isCta) {
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`btn btn-sm contact-cta border border-[var(--primary-color)]! glow-border ${
                    isActive ? 'is-active' : ''
                  }`}
                >
                  {link.label}
                </a>
              );
            }
            return (
              <a
                key={link.id}
                href={link.href}
                className={`text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--primary-color)] ${
                  isActive ? 'is-active' : ''
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile Navigation Toggle (nur auf Mobilgeräten rechts sichtbar) */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Menü öffnen"
            className="btn btn-ghost btn-circle text-[var(--text-color)] flex items-center justify-center p-2 rounded-lg hover:bg-[var(--background-color)] transition-colors"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`} />
          </button>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div
              className="absolute right-0 mt-3 w-56 rounded-xl bg-[var(--surface-color)] p-3 shadow-[0_4px_30px_rgba(0,0,0,0.7)] border border-[var(--border-color)] z-50"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                          link.isCta
                            ? 'contact-cta font-medium border border-[var(--primary-color)] text-center mt-2'
                            : isActive
                            ? 'text-[var(--primary-color)] bg-[var(--background-color)] font-medium'
                            : 'text-[var(--text-muted)] hover:text-[var(--primary-color)] hover:bg-[var(--background-color)]'
                        }`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
