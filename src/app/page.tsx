'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckoutLink, UpgradeModal } from './OfferWidgets';
import { PreviewCarousel } from './PreviewCarousel';
import { pixelViewOffer, pixelInitCheckoutBasic, pixelInitCheckoutFull, pixelUpsellViewed } from '@/lib/pixel';

const A = '/assets/';
const chapterCards = [
  { src: '02-card-preparo.png', alt: 'Etapa 01 — Preparo: comece antes do toque' },
  { src: '03-card-movimentos.png', alt: 'Etapa 02 — Movimentos: conheça os 23 movimentos' },
  { src: '04-card-ritmo.png', alt: 'Etapa 03 — Ritmo: observe e ajuste' },
  { src: '05-card-conexao.png', alt: 'Etapa 04 — Conexão: conduza com presença' },
];
// Relatos preservados da versão fornecida pelo proprietário da oferta.
const testimonials = [
  ['Nunca pensei que poderia fazer tanta diferença. Ela me olha de um jeito completamente novo agora.', 'Carlos M., 34'],
  ['As técnicas são simples, mas o resultado é impressionante. Nossa conexão está muito mais intensa.', 'Roberto S., 41'],
  ['Finalmente me sinto confiante. Ela me disse que nunca se sentiu tão especial.', 'Eduardo T., 29'],
  ['Isso mudou completamente meu jogo. Ela não consegue parar de pensar nos nossos momentos.', 'Felipe R., 27'],
  ['Eu estava perdendo ela... depois desses movimentos, nossa paixão voltou mais forte que nunca.', 'Gabriel M., 36'],
  ['O que eu aprendi sobre ritmo mudou tudo. Ela mesma perguntou o que eu fiz diferente.', 'André L., 33'],
  ['Antes eu achava que toque era só instinto. Agora sei que método faz toda a diferença.', 'Marcos P., 38'],
  ['Ela disse que nunca se sentiu tão presente durante o momento. Isso não tem preço.', 'Diego R., 30'],
];
const faqs = [
  ['O que recebo no plano Essencial?', 'O guia Código do Toque, com 23 movimentos, em PDF. Os três materiais complementares estão no Pacote Completo.'],
  ['O que recebo no Pacote Completo?', 'O guia principal e os três PDFs complementares: Palavras que Aproximam, Conexão em Duas Vias e Tantra sem Complicação.'],
  ['É discreto? Quando recebo?', 'Depois da confirmação do pagamento, os arquivos do plano escolhido são enviados para o e-mail informado na compra.'],
  ['É um livro físico?', 'Não. São arquivos digitais para abrir no celular, tablet ou computador.'],
  ['Preciso ter experiência?', 'Não. O guia começa pelo preparo e organiza os movimentos em uma sequência para consultar no seu ritmo.'],
  ['Como funciona a garantia?', 'Você tem 7 dias após a compra para solicitar o reembolso, conforme as condições informadas no checkout.'],
];
function Brand() { return <a href="#inicio" className="brand" aria-label="Código do Toque, voltar ao início"><span>◆</span><strong>Código<br />do Toque</strong></a>; }
function Button({ children, href = '#oferta' }: { children: React.ReactNode; href?: string }) { return <a className="pill-button" href={href}>{children}<b>↗</b></a>; }
function Kicker({ children }: { children: React.ReactNode }) { return <span className="kicker"><i>◆</i>{children}</span>; }

export default function Home() {
  const rail = useRef<HTMLDivElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const closeUpgrade = useCallback(() => setUpgradeOpen(false), []);
  const basicUrl = process.env.NEXT_PUBLIC_CHECKOUT_BASIC_URL;
  const fullUrl = process.env.NEXT_PUBLIC_CHECKOUT_FULL_URL;
  const upgradeUrl = process.env.NEXT_PUBLIC_CHECKOUT_UPGRADE_URL;

  /* Pixel: ViewContent when offer section scrolls into view */
  useEffect(() => {
    const el = offerRef.current;
    if (!el) return;
    let fired = false;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired) { fired = true; pixelViewOffer(); }
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Pixel: AddToCart + UpsellViewed when upgrade modal opens */
  const openUpgrade = useCallback(() => {
    setUpgradeOpen(true);
    pixelUpsellViewed();
  }, []);

  /* Pixel: InitiateCheckout + AddToCart/UpsellViewed when clicking basic plan button */
  const handleBasicClick = useCallback(() => {
    pixelInitCheckoutBasic();
    setUpgradeOpen(true);
    pixelUpsellViewed();
  }, []);

  /* Pixel: InitiateCheckout when clicking full plan */
  const handleFullClick = useCallback(() => {
    pixelInitCheckoutFull();
  }, []);

  return <main id="inicio">
    <div className="launch-bar"><div className="wrap"><strong>CÓDIGO DO TOQUE</strong><span>Guia digital por R$ 14,90 · Pagamento único</span><a href="#oferta">Ver ofertas ↗</a></div></div>
    <section className="hero dark"><div className="hero-image" /><div className="hero-overlay" /><div className="wrap hero-wrap">
      <header><Brand /><small>GUIA DIGITAL PARA ADULTOS</small></header>
      <div className="hero-copy"><Kicker>APRESENTADO POR LUNA AMARAL</Kicker><h1>Ela não lembra do homem que fez mais.<br /><em>Lembra do que soube conduzir.</em></h1><p>O Código do Toque reúne 23 movimentos em uma sequência visual: preparo, ritmo e atenção à resposta da parceira para você sair do automático.</p><Button href="#guia">Conhecer o guia</Button><small>Acesso por e-mail <span>•</span> Pagamento único <span>•</span> A partir de R$ 14,90</small></div>
    </div><div className="notch" /></section>

    {/* Intro — imagem final do guia + celular */}
    <section id="guia" className="intro light pad"><div className="wrap"><div className="heading centered"><Kicker>O QUE NINGUÉM TE CONTA</Kicker><h2>Mais repertório.<br /><em>Mais atenção ao que acontece a dois.</em></h2></div><div className="intro-panel"><div className="intro-visual"><img className="intro-artwork" src={`${A}01-guia-e-celular.png`} alt="Guia Código do Toque aberto no celular" /></div><div className="intro-text"><span className="overline">UM GUIA PARA SAIR DO IMPROVISO</span><h3>O toque começa<br /><em>antes do movimento.</em></h3><p>Repetir a mesma sequência pode deixar a experiência no automático. O guia mostra possibilidades para preparar o momento, variar o toque e observar o ritmo da outra pessoa.</p><ul className="ticks"><li>23 movimentos em sequência visual</li><li>Orientações de preparo, ritmo e atenção</li><li>Leitura discreta no celular, tablet ou computador</li></ul><Button href="#conteudo">Ver o conteúdo</Button></div></div></div></section>

    {/* Conteúdo — cards finais em carrossel */}
    <section id="conteudo" className="content-section dark pad"><div className="wrap"><div className="content-head"><div><Kicker>POR DENTRO DO MATERIAL</Kicker><h2>O que você vai <em>encontrar</em><br />no Código do Toque?</h2></div><div className="rail-buttons"><button type="button" aria-label="Ver capítulos anteriores" onClick={() => rail.current?.scrollBy({ left: -310, behavior: 'smooth' })}>←</button><button type="button" aria-label="Ver próximos capítulos" onClick={() => rail.current?.scrollBy({ left: 310, behavior: 'smooth' })}>→</button></div></div><div className="chapter-rail" ref={rail}>{chapterCards.map((card, i) => <article className="chapter-card" key={i}><img src={`${A}${card.src}`} alt={card.alt} /></article>)}</div><p className="content-note">Do preparo à conexão: consulte a etapa que faz sentido para vocês e adapte cada ideia à conversa e aos limites de ambos.</p></div></section>

    <section className="about light pad"><div className="wrap about-layout"><div className="about-copy"><Kicker>QUEM CRIOU ESSE MÉTODO</Kicker><span className="about-eyebrow">Sua guia</span><h2><em>Luna Amaral.</em></h2><p className="about-credential">Terapeuta Tântrica · 6 anos de prática clínica</p><div className="about-stats" aria-label="Experiência de Luna Amaral"><div><strong>6+</strong><span>anos de prática</span></div><div><strong>500+</strong><span>casais atendidos</span></div><div><strong>23</strong><span>movimentos</span></div></div><p>Nos meus anos de atendimento, o que mais ouvi de mulheres foi: <em>"Ele é bom, mas falta algo que não sei explicar."</em></p><p>E de homens: <em>"Eu quero ser melhor pra ela. Só não sei o que fazer diferente."</em></p><p>Esse método nasceu dessa escuta. São 23 movimentos testados com casais reais — prática clínica organizada em um guia que você pode começar a aplicar hoje.</p><Button>Escolher meu guia</Button></div><div className="about-photo"><img src={`${A}v5-expert.webp`} alt="Retrato de Luna Amaral em estúdio de ton escuros" /><div><span>CÓDIGO DO TOQUE</span><strong>Luna Amaral</strong></div></div></div></section>

    {/* Bônus — imagem final dos três materiais */}
    <section className="bonuses dark pad"><div className="wrap bonus-layout"><div className="bonus-copy"><Kicker>NO PACOTE COMPLETO</Kicker><h2>Além do guia, três materiais para <em>aprofundar a experiência.</em></h2><p>O pacote reúne o Código do Toque e três PDFs complementares. Você também pode começar somente pelo guia.</p><div className="bonus-list"><span>01 <strong>Palavras que Aproximam</strong></span><span>02 <strong>Conexão em Duas Vias</strong></span><span>03 <strong>Tantra sem Complicação</strong></span></div><Button>Comparar os planos</Button></div><div className="bonus-visual" aria-label="Três materiais complementares"><img src={`${A}06-tres-bonus.png`} alt="Palavras que Aproximam, Conexão em Duas Vias e Tantra sem Complicação" /></div></div></section>

    {/* Prévias internas do guia */}
    <section className="preview-section dark pad-small"><div className="wrap"><div className="heading centered"><Kicker>VEJA POR DENTRO</Kicker><h2>Prévias de páginas <em>reais</em> do guia.</h2></div><p className="preview-subtitle">Trechos e ilustrações foram protegidos porque mostram cenas íntimas. Ao adquirir, você recebe o guia completo por e-mail.</p><PreviewCarousel /></div></section>

    <section className="testimonials dark pad-small"><div className="wrap"><div className="heading centered"><Kicker>O QUE ELES SENTEM</Kicker><h2>Na sessão, o que <em>muda</em> pra ela.</h2></div><div className="marquee-track"><div className="marquee-inner">{testimonials.map(([quote, person], i) => <blockquote key={`a-${i}`}><span aria-label="5 estrelas">★★★★★</span><p>"{quote}"</p><cite>— {person}</cite></blockquote>)}{testimonials.map(([quote, person], i) => <blockquote key={`b-${i}`}><span aria-label="5 estrelas">★★★★★</span><p>"{quote}"</p><cite>— {person}</cite></blockquote>)}</div></div></div></section>

    {/* Oferta — mockups finais + pixel ViewContent */}
    <section id="oferta" className="offer dark pad" ref={offerRef}><div className="wrap"><div className="heading centered"><Kicker>ESCOLHA SUA OFERTA</Kicker><h2>Comece pelo guia.<br /><em>Ou leve a coleção inteira.</em></h2><p>Pagamento único. Arquivos enviados por e-mail após a confirmação.</p></div><div className="offers-grid">
      <article className="plan-card plan-basic"><span className="plan-kicker">01 / O ESSENCIAL</span><div className="plan-art plan-art-mockup"><img src={`${A}07-oferta-so-guia.png`} alt="Mockup do guia Código do Toque" /></div><h3>Só o guia</h3><p>Os 23 movimentos em uma sequência para consultar no seu ritmo.</p><ul className="ticks"><li>Guia Código do Toque em PDF</li><li>Preparo, movimentos e leitura do ritmo</li><li>Leitura no celular, tablet ou computador</li></ul><div className="plan-price"><small>Pagamento único</small><strong><span>R$</span> 14,90</strong></div><button type="button" className="pill-button plan-button" onClick={handleBasicClick}>Quero o guia <b>↗</b></button></article>
      <article className="plan-card plan-full"><span className="plan-ribbon">MAIS CONTEÚDO</span><span className="plan-kicker">02 / EXPERIÊNCIA COMPLETA</span><div className="plan-art plan-art-mockup"><img src={`${A}08-oferta-pacote-completo.png`} alt="Mockup do Pacote Completo com quatro PDFs" /></div><h3>Pacote Completo</h3><p>O guia principal e três materiais complementares em uma só compra.</p><ul className="ticks"><li>Guia com 23 movimentos</li><li>Palavras que Aproximam</li><li>Conexão em Duas Vias</li><li>Tantra sem Complicação</li></ul><div className="plan-price"><small>Pagamento único</small><strong><span>R$</span> 24,90</strong></div><CheckoutLink url={fullUrl} className="plan-button" onClick={handleFullClick}>Quero o pacote completo</CheckoutLink><small className="plan-note">Quatro PDFs enviados para o e-mail da compra.</small></article>
    </div><div className="offer-assurance"><strong>✓ Garantia de 7 dias</strong><span>Se o material não fizer sentido para você, solicite reembolso dentro do prazo informado no checkout.</span><strong>✉ Entrega digital</strong><span>Abra os arquivos no celular, tablet ou computador.</span></div></div></section>

    <section className="faq light pad-small"><div className="wrap faq-wrap"><div className="heading centered"><Kicker>PERGUNTAS FREQUENTES</Kicker><h2>Tire suas <em>dúvidas.</em></h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<b>+</b></summary><p>{answer}</p></details>)}</div><div className="centered faq-cta"><Button>Ver as duas ofertas</Button></div></div></section>
    <footer className="footer dark"><div className="wrap footer-main"><Brand /><p>Um guia digital sobre toque, comunicação e presença.<br />Conteúdo destinado a maiores de 18 anos.</p><a href="#inicio">Voltar ao início ↑</a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Código do Toque</span><span>Material digital enviado por e-mail.</span></div></footer>
    <UpgradeModal open={upgradeOpen} onClose={closeUpgrade} basicUrl={basicUrl} upgradeUrl={upgradeUrl} />
  </main>;
}
