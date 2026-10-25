import React from 'react';
import { skillCategories } from '../data/portfolioData';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-[var(--background-color)] border-t border-[var(--border-color)]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 md:mb-16 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-color)] text-glow"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-[var(--secondary-color)]">&lt;</span> Technologien &amp; Tools{' '}
            <span className="text-[var(--secondary-color)]">/&gt;</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-lg">
            Ein Überblick über die Sprachen, Frameworks und Werkzeuge, mit denen ich regelmäßig arbeite und die ich im Studium vertieft habe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[var(--surface-color)] p-6 rounded-xl border border-[var(--border-color)] glow-border flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--background-color)] border border-[var(--border-color)] shadow-[0_0_15px_rgba(139,92,246,0.15)] flex items-center justify-center mb-6">
                <i className={`${category.icon} text-2xl text-[var(--secondary-color)]`} />
              </div>

              <h3
                className="text-xl font-bold mb-5 text-[var(--text-color)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {category.title}
              </h3>

              <ul className="space-y-3 w-full text-left">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-[var(--text-muted)] group">
                    <span className="text-[var(--primary-color)] text-xs opacity-50 group-hover:opacity-100 transition-opacity">
                      &gt;&gt;
                    </span>
                    <span className="font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

