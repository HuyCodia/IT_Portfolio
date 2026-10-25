import React, { useState } from 'react';
import { aboutItems, personalInfo } from '../data/portfolioData';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-20 bg-[var(--surface-color)] relative border-t border-[var(--border-color)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left / Info Column */}
          <div className="order-2 lg:order-1">
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-6 text-glow"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-[var(--accent-color)]">~/</span>Über_mich
            </h2>

            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">
              Ich bin Informatikstudent an der Leibniz Universität Hannover und interessiere mich für Softwareentwicklung, technische Zusammenhänge und moderne Technologien.
            </p>

            <div className="space-y-7">
              {aboutItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="w-11 h-11 shrink-0 rounded-lg bg-[var(--background-color)] border border-[var(--border-color)] flex items-center justify-center">
                    <i className={`${item.icon} text-lg text-[var(--primary-color)]`} />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-lg font-bold text-[var(--text-color)] mb-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[var(--text-muted)] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[var(--accent-color)] font-semibold hover:text-[var(--primary-color)] transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                $ ./let_us_collaborate.sh <i className="fa-solid fa-terminal text-sm" />
              </a>
            </div>
          </div>

          {/* Right / Profile Picture Column */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full max-w-md mx-auto">
              {/* Neon Glow Frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-2xl opacity-40 blur-lg" />
              {/* Angled background plate */}
              <div className="absolute -inset-4 bg-[var(--background-color)] border border-[var(--border-color)] rounded-2xl -z-10 transform rotate-3" />
              
              {/* Profile Image container */}
              <div className="relative aspect-square w-full rounded-2xl bg-[var(--surface-color)] overflow-hidden shadow-sm border border-[var(--border-color)]">
                {personalInfo.profileImage && !imgError ? (
                  <img
                    src={personalInfo.profileImage}
                    alt={`Porträt ${personalInfo.name}`}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#161B22] to-[#0B0F14] text-[var(--text-muted)]">
                    <i className="fa-solid fa-user text-5xl mb-3 text-[var(--primary-color)]" />
                    <span className="font-mono text-sm">{personalInfo.name}</span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">Profilbild Platzhalter</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

