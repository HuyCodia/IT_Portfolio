import React from "react";
import { personalInfo } from "../data/portfolioData";

export const Hero: React.FC = () => {
  return (
    <section className="relative mx-auto w-full px-6 py-20 lg:py-32 flex flex-col items-center text-center overflow-hidden">
      {/* Abstract grid background */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--background-color)]/20 via-transparent to-[var(--background-color)] pointer-events-none" />

      {/* Status Badge */}
      <div
        className="relative z-10 inline-flex items-center gap-2 rounded-full bg-[var(--surface-color)] px-4 py-2 text-sm font-medium text-[var(--accent-color)] mb-8 border border-[var(--border-color)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {/* Radar-Ping Container mit garantiert perfektem Kreis */}
        <span className="relative flex h-2.5 w-2.5 shrink-0 aspect-square items-center justify-center">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75"
            style={{ borderRadius: "50%" }}
          />
          <span
            className="relative inline-block shrink-0 rounded-full bg-[var(--accent-color)]"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
            }}
          />
        </span>
        {personalInfo.status}
      </div>

      {/* Main Heading */}
      <h1
        className="relative z-10 text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-color)] mb-6 leading-tight text-glow"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {personalInfo.heroHeading.greeting}{" "}
        <span className="text-[var(--primary-color)]">
          {personalInfo.heroHeading.name}
        </span>
        .<br />
        {personalInfo.heroHeading.welcome}
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 max-w-2xl text-lg md:text-xl text-[var(--text-muted)] mb-10 leading-relaxed">
        {personalInfo.heroSubtitle}
      </p>

      {/* Call to Actions */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4">
        <a
          href="#projects"
          className="btn border border-[var(--primary-color)]! bg-[var(--primary-color)]/10! text-[var(--primary-color)]! hover:bg-[var(--primary-color)]! hover:text-[#0B0F14]! px-8 py-3 rounded-lg h-auto font-bold transition-all glow-border inline-flex items-center justify-center"
        >
          Projekte ansehen
        </a>
        <a
          href="#contact"
          className="btn btn-outline border-[var(--border-color)]! text-[var(--text-color)]! hover:bg-[var(--surface-color)]! hover:border-[var(--primary-color)]! hover:text-[var(--primary-color)]! px-8 py-3 rounded-lg h-auto font-medium transition-all inline-flex items-center justify-center"
        >
          Kontakt aufnehmen
        </a>
      </div>

      {/* Social Links */}
      <div className="relative z-10 mt-16 flex gap-6 text-[var(--text-muted)]">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub-Profil von Huy Dang"
          className="text-2xl hover:text-[var(--text-color)] transition-colors"
        >
          <i className="fa-brands fa-github" />
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn-Profil von Huy Dang"
          className="text-2xl hover:text-[var(--primary-color)] transition-colors"
        >
          <i className="fa-brands fa-linkedin" />
        </a>
      </div>
    </section>
  );
};
