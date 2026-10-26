import profileImg from "../assets/profile.jpg";
import projectTixelImg from "../assets/project-tixel.png";
import projectBattleshipImg from "../assets/project-battleship.png";
import projectVideoPortfolioImg from "../assets/project-videoportfolio.png";
import type { Project, SkillCategory, AboutItem, NavLink } from "../types";

export const personalInfo = {
  name: "Huy Dang",
  title: "Informatik-Student & Entwickler",
  status: "System.status: AVAILABLE_FOR_WORK",
  location: "Hannover, DE",
  email: "hud903@gmail.com",
  github: "https://github.com/HuyCodia",
  linkedin: "https://www.linkedin.com/in/huy-dang-013921162/",
  heroHeading: {
    greeting: "Hi, ich bin",
    name: "Huy Dang",
    welcome: "Willkommen in meinem Entwickler-Portfolio.",
  },
  heroSubtitle:
    "Hier findest du meine Softwareprojekte, technischen Fähigkeiten und Einblicke in meine Arbeit als Informatikstudent.",
  profileImage: profileImg,
};

export const navLinks: NavLink[] = [
  { id: "projects", label: "Projekte", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "about", label: "Über_mich", href: "#about" },
  { id: "contact", label: "Kontakt", href: "#contact", isCta: true },
];

export const projects: Project[] = [
  {
    id: "tixel-control-center",
    title: "Redesign des TIXEL Control Centers (TIXstream MFT)",
    description:
      "Im Rahmen eines studentischen Teamprojekts in Zusammenarbeit mit TIXEL arbeitete ich an der Überarbeitung der webbasierten Benutzeroberfläche des TIXEL Control Centers für TIXstream MFT. Ziel war es, die bestehende Oberfläche zu verbessern und die Benutzerführung übersichtlicher und intuitiver zu gestalten.",
    tags: ["Vue.js", "JavaScript", "Tailwind CSS", "HTML5"],
    image: projectTixelImg,
    placeholderText: "TIXEL Control Center Screenshot",
    demoUrl: "https://tixeltec.com/ps_tixstreammft_de.html",
    demoLabel: "website",
    year: "2024",
  },
  {
    id: "battleship-game",
    title: "Battleship Game",
    description:
      "Ein digitales Strategiespiel, bei dem Spieler gegeneinander oder gegen einen KI-Gegner antreten. Das Spiel umfasst die Platzierung von Schiffen, die Auswertung von Treffern und Fehlschüssen sowie die Erkennung versenkter Schiffe. Eine grafische Benutzeroberfläche ermöglicht eine intuitive Bedienung.",
    tags: ["Java", "JavaFX", "Scene Builder"],
    image: projectBattleshipImg,
    placeholderText: "Battleship Game GUI Screenshot",
    sourceUrl: "https://github.com/HuyCodia",
    year: "2023",
  },
  {
    id: "video-portfolio",
    title: "Huy Dang | Video Portfolio",
    description:
      "Eine moderne, performante Portfolio-Website für Video-Editing, Football Edits, KI-Videocreation und cinemastische Visuals. Entwickelt mit React, Tailwind CSS, interaktiver Projektgalerie und responsivem Layout.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    image: projectVideoPortfolioImg,
    placeholderText: "Huy Dang | Video Portfolio Screenshot",
    sourceUrl: "https://github.com/HuyCodia/Videograph_Portfolio",
    demoUrl: "https://huydang-video.vercel.app/",
    demoLabel: "website",
    year: "2025",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programmiersprachen",
    icon: "fa-solid fa-code",
    skills: ["Java", "Python", "JavaScript / TypeScript", "C++"],
  },
  {
    id: "frontend",
    title: "Web & Frontend",
    icon: "fa-solid fa-laptop-code",
    skills: [
      "HTML5 & CSS3",
      "Tailwind CSS",
      "Vue.js",
      "JavaFX",
      "Scene Builder",
    ],
  },
  {
    id: "backend",
    title: "Backend & Datenbanken",
    icon: "fa-solid fa-server",
    skills: ["Node.js & Express", "SQLite"],
  },
  {
    id: "tools",
    title: "Tools & Methoden",
    icon: "fa-solid fa-screwdriver-wrench",
    skills: ["Git & GitHub", "Agile / Scrum", "Linux / Bash"],
  },
];

export const aboutItems: AboutItem[] = [
  {
    id: "education",
    title: "Studium & Grundlagen",
    icon: "fa-solid fa-code",
    content:
      'Während meines Studiums habe ich mir fundierte Grundlagen in verschiedenen Bereichen der Informatik angeeignet, darunter <strong class="text-[var(--primary-color)] font-semibold">Softwareentwicklung, Algorithmen und Datenstrukturen, Datenbanken</strong> und <strong class="text-[var(--primary-color)] font-semibold">Softwarequalität</strong>. In verschiedenen Studienprojekten konnte ich diese Kenntnisse praktisch anwenden.',
  },
  {
    id: "practice",
    title: "Projekte & Praxis",
    icon: "fa-solid fa-desktop",
    content:
      'Dazu gehören die Entwicklung eines digitalen <strong class="text-[var(--primary-color)] font-semibold">Battleship-Spiels mit Java</strong> und grafischer Benutzeroberfläche sowie die Mitarbeit an einem Projekt in Zusammenarbeit mit der <strong class="text-[var(--primary-color)] font-semibold">TIXEL GmbH</strong>, bei dem ich an der Überarbeitung einer webbasierten Benutzeroberfläche mitgewirkt habe.',
  },
  {
    id: "tutor",
    title: "Tutor & Hiwi",
    icon: "fa-solid fa-user-group",
    content:
      'Darüber hinaus war ich als Tutor im Modul <strong class="text-[var(--primary-color)] font-semibold">„Programmieren I"</strong> sowie als wissenschaftliche Hilfskraft in den Bereichen <strong class="text-[var(--primary-color)] font-semibold">Diskrete Strukturen</strong> und <strong class="text-[var(--primary-color)] font-semibold">Lineare Algebra</strong> tätig. Dabei beschäftigte ich mich unter anderem mit der Erstellung interaktiver Online-Aufgaben auf der Lernplattform <strong class="text-[var(--primary-color)] font-semibold">ILIAS</strong> sowie der Aufbereitung mathematischer Aufgaben und Musterlösungen mit <strong class="text-[var(--primary-color)] font-semibold">LaTeX</strong>.',
  },
  {
    id: "media",
    title: "Interessen & Medien",
    icon: "fa-solid fa-circle-play",
    content:
      'Neben der Informatik interessiere ich mich für <strong class="text-[var(--primary-color)] font-semibold">Videobearbeitung und digitale Medien</strong>. Ich verfolge aktuelle Trends auf Plattformen wie YouTube, Instagram und TikTok und beschäftige mich mit der kreativen Gestaltung und Aufbereitung digitaler Inhalte.',
  },
  {
    id: "goal",
    title: "Mein Ziel",
    icon: "fa-solid fa-crosshairs",
    content:
      'Auf dieser Website präsentiere ich meine Projekte, gebe Einblicke in meine bisherigen Erfahrungen und zeige, womit ich mich aktuell beschäftige. Dabei möchte ich meine <strong class="text-[var(--primary-color)] font-semibold">Kenntnisse kontinuierlich erweitern</strong>, neue Technologien kennenlernen und mich sowohl fachlich als auch praktisch weiterentwickeln.',
  },
];
