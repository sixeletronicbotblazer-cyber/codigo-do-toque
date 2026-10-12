'use client';
import { useEffect, useRef, useState } from 'react';

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
 * Continuous infinite marquee carousel for guide preview pages.
 * - Duplicates items for seamless infinite loop
 * - CSS animation at 1.2x speed
 * - Pauses on hover/focus
 * - No scrollbar, no arrows
 * - Respects prefers-reduced-motion
 */
export function PreviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
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

  if (reducedMotion) {
    return (
      <div className="preview-track-static">
        {previews.map((p, i) => (
          <div className="preview-card" key={i}>
            <img src={`${A}${p.src}`} alt={p.alt} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="preview-marquee-outer">
      <div className="preview-marquee-track" ref={trackRef}>
        {/* Original set */}
        {previews.map((p, i) => (
          <div className="preview-card" key={`a-${i}`}>
            <img src={`${A}${p.src}`} alt={p.alt} draggable={false} />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {previews.map((p, i) => (
          <div className="preview-card" key={`b-${i}`} aria-hidden="true">
            <img src={`${A}${p.src}`} alt="" draggable={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
