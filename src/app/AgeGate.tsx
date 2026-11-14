'use client';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'cdt-age-verified';

/**
 * Age verification gate (18+).
 * - Covers the page on first visit; page behind is fully blurred and inert
 * - "Sim" unlocks the page and persists the answer in localStorage
 * - "Não" keeps the block and shows a denial message
 */
export function AgeGate({ onVerify }: { onVerify: () => void }) {
  const [status, setStatus] = useState<'checking' | 'asking' | 'denied' | 'verified'>('checking');

  /* Check stored answer once on mount (client only, avoids hydration mismatch) */
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of localStorage after mount (SSR-safe)
        setStatus('verified');
        onVerify();
      } else {
        setStatus('asking');
      }
    } catch {
      setStatus('asking');
    }
  }, [onVerify]);

  /* Lock body scroll while the gate is visible */
  useEffect(() => {
    if (status === 'verified') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [status]);

  const confirm = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* private mode */ }
    setStatus('verified');
    onVerify();
  }, [onVerify]);

  const deny = useCallback(() => setStatus('denied'), []);
  const backToAsk = useCallback(() => setStatus('asking'), []);

  if (status === 'verified' || status === 'checking') return null;

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
      <div className="age-gate-card">
        <span className="age-gate-diamond" aria-hidden="true">◆</span>
        <span className="age-gate-kicker">VERIFICAÇÃO DE IDADE</span>
        {status === 'asking' ? (
          <>
            <h2 id="age-gate-title">Este conteúdo é para <em>maiores de 18 anos.</em></h2>
            <p>O Código do Toque é um guia digital sobre intimidade e toque, destinado exclusivamente a adultos. Você tem mais de 18 anos?</p>
            <div className="age-gate-actions">
              <button type="button" className="age-gate-yes" onClick={confirm}>Sim, tenho mais de 18 anos <b>↗</b></button>
              <button type="button" className="age-gate-no" onClick={deny}>Não, tenho menos de 18</button>
            </div>
            <small className="age-gate-footnote">Suas respostas não são armazenadas ou compartilhadas. Este aviso existe para sua segurança.</small>
          </>
        ) : (
          <>
            <h2 id="age-gate-title">Conteúdo <em>restrito.</em></h2>
            <p>Este material não é adequado para menores de 18 anos. Se você chegou aqui por engano, feche esta página.</p>
            <div className="age-gate-actions">
              <button type="button" className="age-gate-no" onClick={backToAsk}>Voltar à verificação</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
