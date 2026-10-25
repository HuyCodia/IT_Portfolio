# IT Portfolio - Huy Dang (React + TypeScript + Vite)

Ein 1:1 Nachbau des Portfolios von Site123 in einem sauberen, modernen React-Projekt – **vollständig werbefrei** und flexibel anpassbar.

## 🚀 Features

- **1:1 Design & Farben**: Originales futuristisches Dark-Mode Design (`#0B0F14`), Neonblau (`#00BFFF`), Violett (`#8B5CF6`) und Türkis (`#00E5C0`).
- **Typografie**: Outfit (Headings), Inter (Body) und JetBrains Mono (Code/Status).
- **Vollständige Abschnitte**:
  - **Header**: Sticky Navbar mit Logo (`Huy Dang_` mit Cursor-Pulsieren), Scroll-Spy und mobilem Drawer-Menü.
  - **Hero**: Neon-Glow Headings, `AVAILABLE_FOR_WORK` Status-Badge, CTA-Buttons und Social-Links.
  - **Projekte**: Cards mit Hover-Grayscale-Effekt, Tags, GitHub- & Live-Demo-Links.
  - **Technologien & Tools**: Kategorisierte Übersicht über Programmiersprachen, Frontend, Backend & Tools.
  - **Über mich**: Milestones mit Icons, Terminal-Link und Profilfoto mit leuchtendem Glow-Rahmen.
  - **Kontakt**: Interaktives Kontaktformular mit Erfolgsmeldung, Zurücksetzen-Funktion und E-Mail-Shortcut.
  - **Footer**: Brand, Navigation, Social Links und dynamisches Copyright.
- **Bilder & Platzhalter**: Alle originalen Assets befinden sich in `src/assets/`. Fehlt ein Bild, wird automatisch ein eleganter Platzhalter gerendert.

## 📁 Projektstruktur

```
src/
├── assets/                  # Bilder (Profilfoto, Projekt-Screenshots)
│   ├── profile.jpg
│   ├── project-tixel.png
│   ├── project-battleship.png
│   └── project-ecommerce.jpg
├── components/              # Modulare UI-Komponenten
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   └── portfolioData.ts     # Zentrale Konfiguration (Texte, Links, Projekte, Skills)
├── types/
│   └── index.ts             # TypeScript Typdefinitionen
├── App.tsx                  # Hauptkomponente mit Scroll-Spy
├── index.css                # Globale Tokens, Utility-Klassen und Animationen
└── main.tsx                 # React Root
```

## 🛠️ Entwicklung & Build

### Entwicklungsserver starten
```bash
npm run dev
```

### Produktions-Build erstellen
```bash
npm run build
```

### Linting ausführen
```bash
npm run lint
```

## 🖼️ Eigene Bilder austauschen
Um eigene Screenshots oder ein neues Profilfoto einzubinden:
1. Neue Bilddatei in den Ordner `src/assets/` ablegen.
2. In [src/data/portfolioData.ts](file:///c:/Users/huyda/Desktop/IT_Portfolio/src/data/portfolioData.ts) den entsprechenden Import bzw. Pfad anpassen.
