import { useState, useEffect } from 'react';

/**
 * Custom Hook zur präzisen Erkennung der aktiven Sektion (Scroll-Spy).
 * Entkoppelt die Scroll- und Geometrieberechnung sauber von der UI.
 */
export function useScrollSpy(sectionIds: string[], offsetPercentage = 0.35): string {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY + window.innerHeight;
          const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
          );

          // Wenn der Nutzer das Seitenende erreicht hat, direkt die letzte Sektion aktivieren
          if (scrollPos >= docHeight - 80) {
            setActiveSection(sectionIds[sectionIds.length - 1] || '');
            ticking = false;
            return;
          }

          const threshold = window.innerHeight * offsetPercentage;
          let current = '';

          for (const id of sectionIds) {
            const element = document.getElementById(id);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= threshold) {
                current = id;
              }
            }
          }

          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds, offsetPercentage]);

  return activeSection;
}

