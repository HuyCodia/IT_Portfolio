import React, { useState, useEffect, useRef, useCallback } from 'react';
import { projects } from '../data/portfolioData';
import type { Project } from '../types';

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dragStartXRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);

  const [containerWidth, setContainerWidth] = useState<number>(1104);
  const [maxCardHeight, setMaxCardHeight] = useState<number | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragDeltaX, setDragDeltaX] = useState<number>(0);
  const [autoDemoActive, setAutoDemoActive] = useState<boolean>(true);

  // Responsive visible cards count: 1 on mobile, 2 on tablet, 3 on desktop
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [gap, setGap] = useState<number>(32);

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      // clientWidth includes 16px left and 16px right padding (total 32px buffer)
      const rawWidth = containerRef.current.clientWidth;
      const width = Math.max(280, rawWidth - 32);
      setContainerWidth(width);
      if (width < 640) {
        setVisibleCount(1);
        setGap(16);
      } else if (width < 1024) {
        setVisibleCount(2);
        setGap(24);
      } else {
        setVisibleCount(3);
        setGap(32);
      }
    }
  }, []);

  // Equal-height measurement: measures natural height of all cards and synchronizes them to the highest card
  const syncEqualCardHeights = useCallback(() => {
    if (!cardElementsRef.current.length) return;
    const heights: number[] = [];
    cardElementsRef.current.forEach((el) => {
      if (el) {
        // Measure the card's scroll height
        heights.push(el.scrollHeight);
      }
    });
    if (heights.length > 0) {
      const tallest = Math.max(...heights);
      if (tallest > 200) {
        setMaxCardHeight(tallest);
      }
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const handleResize = () => {
      updateDimensions();
      setMaxCardHeight(undefined);
      requestAnimationFrame(syncEqualCardHeights);
    };
    window.addEventListener('resize', handleResize);

    const ro = new ResizeObserver(() => {
      updateDimensions();
      syncEqualCardHeights();
    });
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
    };
  }, [updateDimensions, syncEqualCardHeights]);

  // Sync heights after projects or containerWidth change
  useEffect(() => {
    const timer = setTimeout(() => {
      syncEqualCardHeights();
    }, 50);
    return () => clearTimeout(timer);
  }, [containerWidth, syncEqualCardHeights]);

  const maxIndex = Math.max(0, projects.length - visibleCount);
  const activeIndex = Math.min(currentIndex, maxIndex);

  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < maxIndex;

  const handlePrev = useCallback(() => {
    setAutoDemoActive(false);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setAutoDemoActive(false);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Restart showcase animation demonstration
  const handleReplayShowcase = useCallback(() => {
    setCurrentIndex(0);
    setAutoDemoActive(true);
  }, []);

  // Automated Horizontal Carousel Glide Showcase:
  // Demonstrates the three cards smoothly sliding to the left in a synchronized horizontal glide with clean ease-in-out easing,
  // bringing Card 4 and Card 5 smoothly into view from the right side.
  useEffect(() => {
    if (!autoDemoActive || isHovered || isDragging) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev < maxIndex) {
          return prev + 1;
        } else {
          // Pause at end, then loop back to initial 3 cards to repeat showcase
          return 0;
        }
      });
    }, activeIndex === 0 ? 3000 : 3800);

    return () => clearTimeout(timer);
  }, [autoDemoActive, isHovered, isDragging, activeIndex, maxIndex]);

  // Pointer / Drag gesture handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setAutoDemoActive(false);
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    hasMovedRef.current = false;
    setDragDeltaX(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 5) {
      hasMovedRef.current = true;
    }
    // Subtle rubber-band resistance when pulling beyond bounds
    if ((activeIndex === 0 && delta > 0) || (activeIndex === maxIndex && delta < 0)) {
      setDragDeltaX(delta * 0.3);
    } else {
      setDragDeltaX(delta);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = e.clientX - dragStartXRef.current;
    const threshold = 45;

    if (delta < -threshold && canScrollNext) {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    } else if (delta > threshold && canScrollPrev) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
    setDragDeltaX(0);
  };

  const handlePointerCancel = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragDeltaX(0);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Sub-pixel precise card width so exactly visibleCount cards fit side-by-side
  const cardWidth = containerWidth > 0
    ? (containerWidth - (visibleCount - 1) * gap) / visibleCount
    : 346;

  const currentTranslateX = -activeIndex * (cardWidth + gap) + dragDeltaX;

  return (
    <section id="projects" className="bg-[var(--background-color)] py-20 relative border-t border-[var(--border-color)]">
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--text-color)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-[var(--primary-color)]">&gt;</span> Ausgewählte Projekte
            </h2>

            <p className="text-[var(--text-muted)] max-w-2xl text-base md:text-lg mt-3">
              Ein Auszug aus meinen akademischen und persönlichen Arbeiten.
            </p>
          </div>

          {/* Minimalist Controls / Showcase indicator */}
          <div className="flex items-center gap-4 self-start sm:self-end">
            {/* Showcase Replay Toggle */}
            <button
              type="button"
              onClick={handleReplayShowcase}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-all duration-200 ${
                autoDemoActive
                  ? 'border-[var(--primary-color)]/50 text-[var(--primary-color)] bg-[var(--primary-color)]/10 shadow-[0_0_10px_rgba(0,191,255,0.15)]'
                  : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--primary-color)] hover:border-[var(--primary-color)] bg-[var(--surface-color)]'
              }`}
              title="Showcase Carousel Animation abspielen"
            >
              <i className={`fa-solid ${autoDemoActive ? 'fa-play text-[10px] animate-pulse text-[var(--primary-color)]' : 'fa-rotate-right text-xs'}`} />
              <span>{autoDemoActive ? 'Glide Demo' : 'Replay Demo'}</span>
            </button>

            {/* Pagination indicator dots */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Projekt Folien">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === idx}
                  onClick={() => {
                    setAutoDemoActive(false);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Gehe zu Folie ${idx + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    activeIndex === idx
                      ? 'w-6 bg-[var(--primary-color)] shadow-[0_0_8px_rgba(0,191,255,0.6)]'
                      : 'w-2 bg-[var(--border-color)] hover:bg-[var(--text-muted)]'
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <span
              className="font-mono text-xs text-zinc-500 select-none slashed-zero"
              style={{
                fontFamily:
                  'Consolas, "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
                color: '#71717A',
              }}
            >
              <span className="text-[var(--primary-color)] font-semibold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="opacity-40 mx-1">/</span>
              <span>{String(maxIndex + 1).padStart(2, '0')}</span>
            </span>
          </div>
        </div>

        {/* Horizontal Carousel Area with Left & Right Edge Navigation Arrows */}
        <div className="carousel-container-outer relative group/carousel" style={{ position: 'relative', width: '100%' }}>
          {/* Left Edge Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canScrollPrev}
            aria-label="Vorherige Projekte anzeigen (Slide nach rechts)"
            className="carousel-nav-btn carousel-nav-btn-prev"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 50,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Edge Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canScrollNext}
            aria-label="Nächste Projekte anzeigen (Slide nach links)"
            className="carousel-nav-btn carousel-nav-btn-next"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 50,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Horizontal Carousel Viewport Container with 16px glow-safe buffer */}
          <div
            ref={containerRef}
            className="carousel-viewport-glow-safe select-none touch-pan-y"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="region"
            aria-label="Ausgewählte Projekte Karussell"
            style={{
              position: 'relative',
              width: 'calc(100% + 32px)',
              margin: '-16px',
              padding: '16px',
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
          >
            {/* Synchronized horizontal glide track with clean ease-in-out easing & equal card stretching */}
            <div
              className="carousel-track"
              style={{
                display: 'flex',
                alignItems: 'stretch',
                gap: `${gap}px`,
                transform: `translateX(${currentTranslateX}px)`,
                transition: isDragging
                  ? 'none'
                  : 'transform 750ms cubic-bezier(0.65, 0, 0.35, 1)',
                willChange: 'transform',
              }}
            >
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardElementsRef.current[idx] = el;
                  }}
                  className="carousel-slide-item carousel-card-wrapper"
                  style={{
                    width: `${cardWidth}px`,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'stretch',
                    height: maxCardHeight ? `${maxCardHeight}px` : 'auto',
                    minHeight: maxCardHeight ? `${maxCardHeight}px` : undefined,
                    position: 'relative',
                  }}
                >
                  <ProjectCard
                    project={project}
                    hasMovedRef={hasMovedRef}
                    exactHeight={maxCardHeight}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  hasMovedRef?: React.RefObject<boolean>;
  exactHeight?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, hasMovedRef, exactHeight }) => {
  const [imgError, setImgError] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    // If the card was being dragged, prevent navigation
    if (hasMovedRef && hasMovedRef.current) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="card project-card-uniform group bg-[var(--surface-color)] border border-[var(--border-color)] overflow-hidden glow-border rounded-xl"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: exactHeight ? `${exactHeight}px` : '100%',
        minHeight: exactHeight ? `${exactHeight}px` : undefined,
        flex: '1 1 100%',
      }}
    >
      <figure
        className="aspect-video w-full border-b border-[var(--border-color)] relative overflow-hidden"
        style={{
          aspectRatio: '16/9',
          width: '100%',
          flexShrink: 0,
        }}
      >
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            className="project-media w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#161B22] to-[#0B0F14] text-[var(--text-muted)]">
            <i className="fa-solid fa-code text-3xl mb-2 text-[var(--primary-color)] opacity-70" />
            <span className="text-xs font-mono font-medium text-[var(--text-muted)]">
              {project.placeholderText || 'Projekt-Bild Platzhalter'}
            </span>
          </div>
        )}

        <div className="project-overlay absolute inset-0 bg-[var(--primary-color)]/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
      </figure>

      <div
        className="card-body p-6"
        style={{
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          height: '100%',
        }}
      >
        {/* Status & Jahr direkt unter dem Vorschaubild */}
        {(project.status || project.year) && (
          <div
            className="flex items-center justify-between mb-3"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              height: '1.5rem',
              minHeight: '1.5rem',
              flexShrink: 0,
            }}
          >
            {project.status && (
              <span
                className={`project-status-badge ${
                  project.status === 'In Progress'
                    ? 'project-status-in-progress'
                    : 'project-status-completed'
                }`}
              >
                {project.status}
              </span>
            )}
            {project.year && (
              <span
                className="font-mono text-xs text-zinc-500 ml-auto slashed-zero"
                style={{
                  fontFamily:
                    'Consolas, "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
                  color: '#71717A',
                }}
              >
                {project.year}
              </span>
            )}
          </div>
        )}

        {/* Title: Fixed minimum height to keep all descriptions aligned at the exact same vertical baseline */}
        <h3
          className="card-title project-title-uniform text-xl font-bold text-[var(--text-color)]"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            lineHeight: '1.75rem',
            fontWeight: 700,
            minHeight: '3.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '0.5rem',
            flexShrink: 0,
          }}
        >
          {project.title}
        </h3>

        {/* Description: Flex-grows to take all available space */}
        <p
          className="project-desc-uniform text-[var(--text-muted)] text-sm mb-4 mt-2"
          style={{
            fontSize: '0.875rem',
            lineHeight: '1.5rem',
            marginBottom: '1rem',
            flex: '1 1 auto',
            display: 'block',
          }}
        >
          {project.description}
        </p>

        {/* Tags: Consistent minimum height row */}
        <div
          className="project-tags-uniform flex flex-wrap gap-2 mb-6"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            minHeight: '3.25rem',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            flexShrink: 0,
          }}
        >
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

        {/* Action Links: Pinned to bottom border */}
        <div
          className="card-actions project-actions-uniform justify-start gap-4"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: 'auto',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1rem',
            flexShrink: 0,
          }}
        >
          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
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
              onClick={handleLinkClick}
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
