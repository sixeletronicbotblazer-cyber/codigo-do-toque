'use client';
import { useEffect } from 'react';
import { pixelInitCheckoutUpgrade, pixelInitCheckoutBasic } from '@/lib/pixel';

export function CheckoutLink({ url, children, className = '', onClick }: { url?: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  if (!url) return <button type="button" className={`pill-button pill-disabled ${className}`} disabled title="Adicione o link de checkout desta oferta antes de publicar">{children}<b>↗</b></button>;
  return <a className={`pill-button ${className}`} href={url} target="_blank" rel="noopener noreferrer" onClick={onClick}>{children}<b>↗</b></a>;
}

export function UpgradeModal({ open, onClose, basicUrl, upgradeUrl }: { open: boolean; onClose: () => void; basicUrl?: string; upgradeUrl?: string }) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="upgrade-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="upgrade-dialog" role="dialog" aria-modal="true" aria-labelledby="upgrade-title">
      <button type="button" className="modal-close" onClick={onClose} aria-label="Fechar oferta">×</button>
      <div className="upgrade-copy">
        <span className="offer-tag">OFERTA ESPECIAL PARA VOCÊ</span>
        <h2 id="upgrade-title">Espere! Por <em>mais R$ 5,00</em>, leve o pacote completo.</h2>
        <p>Você já escolheu o Código do Toque. Acrescente os três materiais de apoio e receba os quatro PDFs por um único pagamento:</p>
        <ul className="upgrade-list">
          <li>Palavras que Aproximam</li>
          <li>Conexão a Dois</li>
          <li>Tantra sem Complicação</li>
        </ul>
        <div className="upgrade-price">
          <span className="upgrade-price-label">GUIA + 3 MATERIAIS DE APOIO</span>
          <del>De R$ 24,90</del>
          <span className="upgrade-price-intro">VOCÊ PAGA APENAS</span>
          <strong>R$ 19,90</strong>
          <span className="upgrade-price-pill">SÓ R$ 5,00 A MAIS QUE O GUIA</span>
        </div>
        <CheckoutLink url={upgradeUrl} className="upgrade-main-cta" onClick={pixelInitCheckoutUpgrade}>Sim, quero o pacote completo</CheckoutLink>
        <p className="upgrade-footnote">Pagamento único · Garantia de 7 dias · Entrega por e-mail</p>
        <CheckoutLink url={basicUrl} className="upgrade-basic-link" onClick={pixelInitCheckoutBasic}>Não, quero só o guia por R$ 14,90</CheckoutLink>
      </div>
    </div>
  </div>;
}
