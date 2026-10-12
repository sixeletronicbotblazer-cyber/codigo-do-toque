'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

const A = '/assets/';
const previews = [
  { src: '01-preparo.png', alt: 'Prévia protegida de página interna do guia, etapa 1 de 6' },
  { src: '02-visao-do-conteudo.png', alt: 'Prévia protegida de página interna do guia, etapa 2 de 6' },
  { src: '03-primeira-manobra.png', alt: 'Prévia protegida de página interna do guia, etapa 3 de 6' },
  { src: '04-manobra-intermediaria.png', alt: 'Prévia protegida de página interna do guia, etapa 4 de 6' },
  { src: '05-ritmo.png', alt: 'Prévia protegida de página interna do guia, etapa 5 de 6' },
  { src: '06-ultima-manobra.png', alt: 'Prévia protegida de página interna do guia, etapa 6 de 6' },
];

/**
 * Preview carousel with:
 * - Continuous auto-scroll at ~1.2x speed
 * - Pauses on hover, focus, or drag
 * - Direction reverses at edges (ping-pong)
 * - Mouse drag + touch swipe support
 * - Resumes smoothly after interaction
 * - Respects prefers-reduced-motion
 */
export function PreviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const posRef = useRef(0);
  const dirRef = useRef(-1); // -1 = left, 1 = right
  const dragging = useRef(false);
  const dragStart = useRef(0);
  const posAtDragStart = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  /* Detect prefers-reduced-motion */
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* Auto-scroll animation loop */
  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    const getSpeed = () => window.innerWidth < 700 ? 18 : 24; // px/s

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!paused && !dragging.current) {
        const speed = getSpeed();
        posRef.current += dirRef.current * speed * dt;

        const maxScroll = track.scrollWidth - track.clientWidth;
        // Reverse at edges
        if (posRef.current <= 0) {
          posRef.current = 0;
          dirRef.current = 1;
        } else if (posRef.current >= maxScroll) {
          posRef.current = maxScroll;
          dirRef.current = -1;
        }
        track.scrollLeft = posRef.current;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, reducedMotion]);

  /* Drag / swipe handlers */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    dragStart.current = e.clientX;
    posAtDragStart.current = posRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const delta = dragStart.current - e.clientX;
    const track = trackRef.current;
    if (!track) return;
    const newPos = posAtDragStart.current + delta;
    const maxScroll = track.scrollWidth - track.clientWidth;
    posRef.current = Math.max(0, Math.min(newPos, maxScroll));
    track.scrollLeft = posRef.current;
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  /* Sync scroll position from manual scroll (scrollbar, keyboard) */
  const onScroll = useCallback(() => {
    if (!dragging.current) {
      const track = trackRef.current;
      if (track) posRef.current = track.scrollLeft;
    }
  }, []);

  if (reducedMotion) {
    /* Static scrollable carousel for reduced-motion */
    return (
      <div className="preview-track" ref={trackRef} onScroll={onScroll}>
        {previews.map((p, i) => (
          <div className="preview-card" key={i}>
            <img src={`${A}${p.src}`} alt={p.alt} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="preview-track"
      ref={trackRef}
      onScroll={onScroll}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {previews.map((p, i) => (
        <div className="preview-card" key={i}>
          <img src={`${A}${p.src}`} alt={p.alt} draggable={false} />
        </div>
      ))}
    </div>
  );
}
