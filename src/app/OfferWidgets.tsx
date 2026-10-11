'use client';

import { useEffect, useRef, useState } from 'react';

const configuredMinutes = Number(process.env.NEXT_PUBLIC_UPGRADE_WINDOW_MINUTES);
const WINDOW_MS = (Number.isFinite(configuredMinutes) && configuredMinutes >= 1 && configuredMinutes <= 1440 ? configuredMinutes : 120) * 60 * 1000;
const STORAGE_KEY = 'codigo-do-toque-bf-window-v1';

export function useOfferWindow() {
  const [remaining, setRemaining] = useState(WINDOW_MS);
  useEffect(() => {
    let expiry = Number(window.localStorage.getItem(STORAGE_KEY));
    if (!Number.isFinite(expiry) || expiry <= 0) {
      expiry = Date.now() + WINDOW_MS;
      window.localStorage.setItem(STORAGE_KEY, String(expiry));
    }
    const update = () => setRemaining(Math.max(0, expiry - Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);
  return remaining;
}

export function FlipClock({ remaining, compact = false }: { remaining: number; compact?: boolean }) {
  const totalMinutes = Math.ceil(remaining / 60000);
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  return (
    <div className={`flip-clock ${compact ? 'flip-compact' : ''}`} role="timer" aria-label={`${hours} horas e ${minutes} minutos restantes`}>
      {[...hours].map((digit, index) => <span className="flip-digit" key={`h${index}`}>{digit}</span>)}
      <span className="flip-colon" aria-hidden="true">:</span>
      {[...minutes].map((digit, index) => <span className="flip-digit" key={`m${index}`}>{digit}</span>)}
    </div>
  );
}

export function BlackFridayBar({ remaining }: { remaining: number }) {
  return (
    <div className="bf-bar">
      <div className="wrap bf-inner">
        <div className="bf-copy">
          <strong>BLACK <span>FRIDAY</span></strong>
          <small>{remaining > 0 ? 'Upgrade especial desta visita' : 'O upgrade especial desta visita terminou'}</small>
        </div>
        <div className="bf-time">
          <span>{remaining > 0 ? 'CONDIÇÃO ATIVA POR' : 'TEMPO ENCERRADO'}</span>
          <FlipClock remaining={remaining} compact />
        </div>
        <a href="#oferta" className="bf-link">Ver ofertas <span>↗</span></a>
      </div>
    </div>
  );
}

export function CheckoutLink({ url, children, className = '' }: { url?: string; children: React.ReactNode; className?: string }) {
  if (!url) return <button type="button" className={`pill-button pill-disabled ${className}`} disabled title="Adicione o link de checkout desta oferta antes de publicar">{children}<b>↗</b></button>;
  return <a className={`pill-button ${className}`} href={url} target="_blank" rel="noopener noreferrer">{children}<b>↗</b></a>;
}

export function UpgradeModal({ open, onClose, remaining, basicUrl, upgradeUrl, fullUrl }: { open: boolean; onClose: () => void; remaining: number; basicUrl?: string; upgradeUrl?: string; fullUrl?: string }) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  if (!open) return null;
  const discounted = remaining > 0;
  return (
    <div className="upgrade-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="upgrade-dialog" role="dialog" aria-modal="true" aria-labelledby="upgrade-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar oferta">×</button>
        <div className="upgrade-visual">
          <div className="upgrade-satin" />
          <div className="upgrade-covers">
            <img src="/assets/v3-main-cover.webp" alt="Capa Código do Toque" />
            <img src="/assets/v3-bonus-palavras.webp" alt="" />
            <img src="/assets/v3-bonus-conexao.webp" alt="" />
            <img src="/assets/v3-bonus-tantra.webp" alt="" />
          </div>
        </div>
        <div className="upgrade-copy">
          <span className="offer-tag">ANTES DE ESCOLHER SÓ O GUIA</span>
          <h2 id="upgrade-title">Leve a <em>experiência completa.</em></h2>
          <p>Além dos 23 movimentos, você recebe os três materiais de apoio: comunicação, reciprocidade e primeiros passos.</p>
          {discounted ? (
            <>
              <div className="upgrade-price">
                <span>Adicione apenas</span>
                <strong>+ R$ 7,00</strong>
                <small>Total de R$ 31,90 em vez de R$ 39,90</small>
              </div>
              <div className="upgrade-timer">
                <span>Essa condição desta visita termina em</span>
                <FlipClock remaining={remaining} compact />
              </div>
              <CheckoutLink url={upgradeUrl} className="upgrade-main-cta">Quero o pacote por R$ 31,90</CheckoutLink>
            </>
          ) : (
            <>
              <div className="upgrade-price">
                <span>Condição especial encerrada</span>
                <strong>R$ 39,90</strong>
                <small>O pacote completo continua disponível pelo preço normal.</small>
              </div>
              <CheckoutLink url={fullUrl} className="upgrade-main-cta">Quero o pacote completo</CheckoutLink>
            </>
          )}
          <CheckoutLink url={basicUrl} className="upgrade-basic-link">Continuar somente com o guia por R$ 24,90</CheckoutLink>
        </div>
      </div>
    </div>
  );
}

type Purchase = { id: string; name: string; city: string; createdAt: string; product?: string };
const DEMO_PURCHASES: Purchase[] = [
  { id: 'demo-1', name: 'Carlos', city: 'Curitiba', createdAt: '', product: 'Código do Toque' },
  { id: 'demo-2', name: 'Ana', city: 'Belo Horizonte', createdAt: '', product: 'Pacote Completo' },
  { id: 'demo-3', name: 'Rafael', city: 'Recife', createdAt: '', product: 'Pacote Completo' },
  { id: 'demo-4', name: 'Mariana', city: 'São Paulo', createdAt: '', product: 'Código do Toque' },
];

function isPurchase(value: unknown): value is Purchase {
  if (!value || typeof value !== 'object') return false;
  const p = value as Partial<Purchase>;
  return typeof p.id === 'string' && typeof p.name === 'string' && typeof p.city === 'string' && typeof p.createdAt === 'string' && p.name.length <= 40 && p.city.length <= 60;
}

export function PurchaseNotifications() {
  const [active, setActive] = useState<Purchase | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const soundRef = useRef(false);
  const audioRef = useRef<AudioContext | null>(null);
  const seenRef = useRef(new Set<string>());
  const demo = process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_PURCHASE_FEED_URL;
  const feedUrl = process.env.NEXT_PUBLIC_PURCHASE_FEED_URL;

  const playCoin = () => {
    if (!soundRef.current) return;
    try {
      const context = audioRef.current || new AudioContext();
      audioRef.current = context;
      void context.resume();
      [0, 0.09].forEach((offset, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(index === 0 ? 880 : 1320, context.currentTime + offset);
        gain.gain.setValueAtTime(0.0001, context.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.075, context.currentTime + offset + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + offset + 0.26);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(context.currentTime + offset);
        oscillator.stop(context.currentTime + offset + 0.28);
      });
    } catch { /* Browser audio can be unavailable until a user gesture. */ }
  };

  useEffect(() => {
    const unlock = () => { if (soundRef.current) void audioRef.current?.resume(); };
    window.addEventListener('pointerdown', unlock);
    return () => { window.removeEventListener('pointerdown', unlock); void audioRef.current?.close(); };
  }, []);

  useEffect(() => {
    if (!demo && !feedUrl) return;
    let index = 0;
    let hide: number | undefined;
    const show = (purchase: Purchase) => {
      setActive(purchase);
      playCoin();
      if (hide) window.clearTimeout(hide);
      hide = window.setTimeout(() => setActive(null), 6500);
    };
    if (demo) {
      const first = window.setTimeout(() => show(DEMO_PURCHASES[index++ % DEMO_PURCHASES.length]), 8500);
      const interval = window.setInterval(() => show(DEMO_PURCHASES[index++ % DEMO_PURCHASES.length]), 24000);
      return () => { window.clearTimeout(first); window.clearInterval(interval); if (hide) window.clearTimeout(hide); };
    }
    const poll = async () => {
      try {
        const response = await fetch(feedUrl!, { cache: 'no-store' });
        if (!response.ok) return;
        const data: unknown = await response.json();
        if (!Array.isArray(data)) return;
        const recent = data.filter(isPurchase).filter(p => { const age = Date.now() - Date.parse(p.createdAt); return age >= 0 && age < 5 * 60 * 1000; });
        const unseen = recent.filter(p => !seenRef.current.has(p.id));
        recent.forEach(p => seenRef.current.add(p.id));
        if (unseen.length) show(unseen[unseen.length - 1]);
      } catch { /* No notice when the optional feed is unavailable. */ }
    };
    void poll();
    const interval = window.setInterval(() => void poll(), 30000);
    return () => { window.clearInterval(interval); if (hide) window.clearTimeout(hide); };
  }, [demo, feedUrl]);

  const toggleSound = () => {
    soundRef.current = !soundRef.current;
    setSoundOn(soundRef.current);
    if (soundRef.current) { audioRef.current ||= new AudioContext(); void audioRef.current.resume(); }
  };

  if (!demo && !feedUrl) return null;
  return (
    <div className="purchase-widget">
      <button type="button" className="sound-toggle" onClick={toggleSound} aria-label={soundOn ? 'Desativar som das notificações' : 'Ativar som das notificações'}>
        {soundOn ? '♪ Som ligado' : '♪ Ativar som'}
      </button>
      {active && (
        <div className="purchase-toast" role="status">
          <div className="purchase-icon">✦</div>
          <div>
            {demo && <span className="demo-label">EXEMPLO VISUAL</span>}
            <strong>{active.name}, de {active.city}</strong>
            <span>{demo ? 'acabou de comprar' : 'comprou recentemente'} {active.product || 'Código do Toque'}</span>
          </div>
          <button type="button" onClick={() => setActive(null)} aria-label="Fechar notificação">×</button>
        </div>
      )}
    </div>
  );
}
