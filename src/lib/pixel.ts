/**
 * Meta Pixel event tracking for Código do Toque.
 * Pixel ID is loaded from NEXT_PUBLIC_META_PIXEL_ID via layout.tsx.
 *
 * Standard events mapped to the sales funnel:
 * - PageView       → automatic (layout.tsx)
 * - ViewContent    → when the offer section becomes visible
 * - InitiateCheckout → when any checkout button is clicked
 * - AddToCart      → when the upgrade modal opens (upsell intent)
 */

/** Fire a Meta Pixel standard event. Safe no-op if fbq is not loaded. */
function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const fbq = (window as unknown as Record<string, unknown>).fbq;
  if (typeof fbq === 'function') {
    if (params) {
      (fbq as (...args: unknown[]) => void)('track', event, params);
    } else {
      (fbq as (...args: unknown[]) => void)('track', event);
    }
  }
}

/** Fire a Meta Pixel custom event. */
function trackCustom(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const fbq = (window as unknown as Record<string, unknown>).fbq;
  if (typeof fbq === 'function') {
    if (params) {
      (fbq as (...args: unknown[]) => void)('trackCustom', event, params);
    } else {
      (fbq as (...args: unknown[]) => void)('trackCustom', event);
    }
  }
}

/* ── Funnel events ─────────────────────────────────────────── */

/** User viewed the offer/pricing section. */
export function pixelViewOffer() {
  track('ViewContent', {
    content_name: 'Código do Toque — Ofertas',
    content_category: 'offer',
    content_ids: ['guia-essencial', 'pacote-completo'],
    content_type: 'product',
    value: 14.90,
    currency: 'BRL',
  });
}

/** User clicked checkout for the Essential plan (R$ 14,90). */
export function pixelInitCheckoutBasic() {
  track('InitiateCheckout', {
    content_name: 'Código do Toque — Só o guia',
    content_category: 'checkout',
    content_ids: ['guia-essencial'],
    content_type: 'product',
    value: 14.90,
    currency: 'BRL',
    num_items: 1,
  });
}

/** User clicked checkout for the Full package (R$ 24,90). */
export function pixelInitCheckoutFull() {
  track('InitiateCheckout', {
    content_name: 'Código do Toque — Pacote Completo',
    content_category: 'checkout',
    content_ids: ['pacote-completo'],
    content_type: 'product',
    value: 24.90,
    currency: 'BRL',
    num_items: 4,
  });
}

/** User clicked checkout for the Upgrade offer (R$ 19,90). */
export function pixelInitCheckoutUpgrade() {
  track('InitiateCheckout', {
    content_name: 'Código do Toque — Upgrade Pacote Completo',
    content_category: 'checkout',
    content_ids: ['pacote-completo-upgrade'],
    content_type: 'product',
    value: 19.90,
    currency: 'BRL',
    num_items: 4,
  });
}

/** User opened the upgrade modal — tracks as AddToCart (upsell intent). */
export function pixelUpsellViewed() {
  track('AddToCart', {
    content_name: 'Código do Toque — Upsell Modal',
    content_category: 'upsell',
    content_ids: ['pacote-completo-upgrade'],
    content_type: 'product',
    value: 19.90,
    currency: 'BRL',
  });
  trackCustom('UpsellViewed', {
    content_name: 'Upgrade para Pacote Completo',
    value: 19.90,
    currency: 'BRL',
  });
}

/** User clicked the guide CTA in hero or intro. */
export function pixelViewGuide() {
  track('ViewContent', {
    content_name: 'Código do Toque — Guia',
    content_category: 'product',
    content_ids: ['guia-essencial'],
    content_type: 'product',
    value: 14.90,
    currency: 'BRL',
  });
}
