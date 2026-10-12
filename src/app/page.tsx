'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BlackFridayBar, CheckoutLink, PurchaseNotifications, UpgradeModal, useOfferWindow } from './OfferWidgets';

const A = '/assets/';
const basicUrl = process.env.NEXT_PUBLIC_CHECKOUT_BASIC_URL;
const fullUrl = process.env.NEXT_PUBLIC_CHECKOUT_FULL_URL;
const upgradeUrl = process.env.NEXT_PUBLIC_CHECKOUT_UPGRADE_URL;

const chapters = [
  ['01', 'PREPARO', 'Crie o clima antes de encostar', 'Ela já chega receptiva, e você começa com vantagem.'],
  ['02', 'MOVIMENTO', '23 movimentos, do suave ao intenso', 'Repertório de quem sabe o que faz, sem improvisar no escuro.'],
  ['03', 'RITMO', 'Leia a reação e ajuste na hora', 'Você para de acertar por sorte e passa a acertar por leitura.'],
  ['04', 'CONEXÃO', 'Transforme o toque em entrega', 'Ela quer repetir, e pede de novo.'],
];
const faqs = [
  ['O que recebo no plano Essencial?', 'O guia Código do Toque em PDF, com 23 movimentos em sequência visual, preparo, ritmo e atenção.'],
  ['O que recebo no Pacote Completo?', 'O guia mais 3 materiais: Palavras que Aproximam, Conexão em Duas Vias e Tantra sem Complicação.'],
  ['É discreto?', 'Sim. A entrega é por e-mail e você lê onde e quando quiser.'],
  ['É vulgar ou explícito?', 'Não. A linguagem é direta e respeitosa. Foco em técnica, ritmo e conexão.'],
  ['Serve se eu já tenho experiência?', 'Sim. Quem tem experiência usa para ganhar repertório e leitura de ritmo. Quem está começando ganha um caminho claro.'],
  ['Preciso ter parceira fixa?', 'Não. Os princípios valem para relacionamento sério ou encontros casuais.'],
  ['É promessa milagrosa?', 'Não. É método, e método exige prática. Quanto mais você aplica, mais natural fica.'],
  ['Quando recebo os arquivos?', 'Por e-mail, logo após a confirmação do pagamento.'],
  ['Como funciona o upgrade?', 'No plano Essencial, você pode adicionar os 3 materiais por R$ 15 a mais, no mesmo pedido.'],
];
const beforeItems = [
  'Repete a mesma sequência e torce para dar certo',
  'Fica na cabeça, preocupado em performar',
  'Acelera sem perceber a reação dela',
  'Termina sem saber se foi bom ou só "ok"',
];
const afterItems = [
  'Sabe o próximo passo em cada momento',
  'Fica presente, com a atenção em quem está com você',
  'Lê o ritmo e conduz com calma, o que passa segurança',
  'Percebe a diferença na entrega e na vontade dela de repetir',
];

function Brand() { return <a href="#inicio" className="brand" aria-label="Código do Toque, voltar ao início"><span>◆</span><strong>Código<br />do Toque</strong></a>; }
function Button({ children, href = '#oferta' }: { children: React.ReactNode; href?: string }) { return <a className="pill-button" href={href}>{children}<b>↗</b></a>; }
function Cover({ src = 'v3-main-cover.webp', alt = 'Capa Código do Toque', className = '' }: { src?: string; alt?: string; className?: string }) { return <div className={`magazine ${className}`}><img src={`${A}${src}`} alt={alt} /></div>; }
function Kicker({ children }: { children: React.ReactNode }) { return <span className="kicker"><i>◆</i>{children}</span>; }

export default function Home() {
  const rail = useRef<HTMLDivElement>(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const closeUpgrade = useCallback(() => setUpgradeOpen(false), []);
  const remaining = useOfferWindow();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main id="inicio">
    <BlackFridayBar remaining={remaining} />

    {/* HERO */}
    <section className="hero dark"><div className="hero-image" /><div className="hero-overlay" /><div className="wrap hero-wrap">
      <header><Brand /><small>GUIA DIGITAL PARA HOMENS</small></header>
      <div className="hero-copy" data-reveal>
        <Kicker>APRESENTADO POR MARINA</Kicker>
        <h1>Ela não lembra do homem que fez mais.<br /><em>Lembra do que soube conduzir.</em></h1>
        <p>O Código do Toque reúne 23 movimentos com preparo, ritmo e leitura de reação. Em poucos dias você deixa de repetir a mesma sequência e passa a saber o próximo passo, com a segurança de quem sabe o que está fazendo.</p>
        <Button href="#guia">Quero conduzir com segurança</Button>
        <small>Acesso imediato por e-mail <span>•</span> Pagamento único <span>•</span> A partir de R$ 14,90</small>
      </div>
      <div className="hero-label"><span>COM MARINA</span><strong>Código do Toque</strong></div>
    </div><div className="notch" /></section>

    {/* INTRO: COMO ESTE GUIA VAI TE AJUDAR */}
    <section id="guia" className="intro light pad"><div className="wrap" data-reveal>
      <div className="heading centered"><Kicker>O QUE NINGUÉM TE CONTA</Kicker><h2>Existe o homem que "funciona".<br /><em>E existe o que fica na memória.</em></h2></div>
      <div className="intro-panel">
        <div className="intro-visual"><div className="halo" /><Cover className="intro-cover" /><div className="phone"><img src={`${A}v3-main-cover.webp`} alt="Guia Código do Toque visto no celular" /></div><i>◆</i></div>
        <div className="intro-text">
          <span className="overline">O HOMEM QUE ELA NÃO ESQUECE</span>
          <h3>Mais repertório.<br /><em>Mais controle. Mais presença.</em></h3>
          <p>A maioria repete o que já sabe. Faz o suficiente para ninguém reclamar. Mas "suficiente" não é o que ela comenta depois. Ela lembra de quem a fez sentir que estava nas mãos de alguém seguro. O Código do Toque mostra, passo a passo, como ser esse homem.</p>
          <ul className="ticks">
            <li>23 movimentos organizados do começo ao fim</li>
            <li>Preparo, ritmo e atenção, para você nunca ficar sem saber o que fazer</li>
            <li>Leitura no celular, tablet ou computador, com discrição total</li>
          </ul>
          <Button href="#conteudo">Quero esse repertório</Button>
        </div>
      </div>
    </div></section>

    {/* 3 RAZÕES */}
    <section className="reasons dark pad"><div className="wrap" data-reveal>
      <div className="heading centered"><Kicker>O QUE VOCÊ GANHA</Kicker><h2>3 razões para sair do automático<br />e <em>virar o homem que conduz.</em></h2></div>
      <div className="reason-grid">
        <article><span>01 / REPERTÓRIO</span><h3>Nunca mais travar no "e agora?"</h3><p>Você chega com 23 caminhos prontos. Para de repetir a mesma sequência e passa a ter variedade, que é o que mantém o desejo vivo.</p><i>◆</i></article>
        <article><span>02 / RITMO</span><h3>Quem apressa perde. Quem lê o ritmo conduz.</h3><p>Você aprende a perceber quando acelerar, quando desacelerar e quando parar. É isso que faz ela relaxar e se entregar.</p><i>◆</i></article>
        <article className="reason-wide"><div><span>03 / SEGURANÇA</span><h3>Ela relaxa quando sente<br /><em>que você sabe o que está fazendo.</em></h3><p>A segurança de quem tem método dá mais presença e menos ansiedade de "será que estou acertando?". E isso ela percebe no primeiro toque.</p></div><Cover /></article>
      </div>
      <div className="centered reason-cta"><Button>Quero me sentir seguro assim</Button></div>
    </div>

    {/* CAPÍTULOS */}
      <div id="conteudo" className="wrap content-block" data-reveal><div className="content-head"><div><Kicker>POR DENTRO DO MATERIAL</Kicker><h2>O que você vai <em>dominar</em><br />no Código do Toque?</h2></div><div className="rail-buttons"><button type="button" aria-label="Ver capítulos anteriores" onClick={() => rail.current?.scrollBy({ left: -310, behavior: 'smooth' })}>←</button><button type="button" aria-label="Ver próximos capítulos" onClick={() => rail.current?.scrollBy({ left: 310, behavior: 'smooth' })}>→</button></div></div><div className="chapter-rail" ref={rail}>{chapters.map(([num,word,title,body],index) => <article className={`chapter chapter-${index}`} key={num}><div className="chapter-art"><span>{num}</span><strong>{word}</strong><i>◆</i></div><div className="chapter-body"><small>CAPÍTULO {num}</small><h3>{title}</h3><p>{body}</p></div></article>)}</div></div><div className="notch" /></section>

    {/* BEFORE/AFTER - NOVA SEÇÃO */}
    <section className="before-after"><div className="wrap" data-reveal>
      <div className="heading centered"><Kicker>O RESULTADO</Kicker><h2>O que muda quando você<br /><em>aprende a conduzir.</em></h2></div>
      <div className="before-after-grid">
        <div className="before-col"><h3>Antes</h3><ul className="before-after-list">{beforeItems.map(item => <li key={item}>{item}</li>)}</ul></div>
        <div className="after-col"><h3>Depois</h3><ul className="before-after-list">{afterItems.map(item => <li key={item}>{item}</li>)}</ul></div>
      </div>
      <p className="before-after-close">Não é sobre ser perfeito. É sobre ser o homem que ela sente que <em>sabe conduzir.</em></p>
    </div></section>

    {/* BÔNUS */}
    <section className="bonuses light pad"><div className="wrap bonus-layout" data-reveal>
      <div className="bonus-copy">
        <Kicker>NO PACOTE COMPLETO</Kicker>
        <h2>Além do guia, três materiais<br />para você <em>ir de bom a referência.</em></h2>
        <p>Comunicação, reciprocidade e presença ganham espaço em três PDFs complementares. Você pode escolher só o guia ou levar a coleção completa.</p>
        <div className="bonus-list">
          <span>01 <strong>Palavras que Aproximam</strong></span>
          <span>02 <strong>Conexão em Duas Vias</strong></span>
          <span>03 <strong>Tantra sem Complicação</strong></span>
        </div>
        <Button>Quero o pacote completo</Button>
      </div>
      <div className="bonus-stack" aria-label="Capas dos três materiais complementares"><div className="stack-glow" /><Cover src="v3-bonus-palavras.webp" alt="Capa Palavras que Aproximam" className="stack-one" /><Cover src="v3-bonus-conexao.webp" alt="Conexão em Duas Vias" className="stack-two" /><Cover src="v3-bonus-tantra.webp" alt="Capa Tantra sem Complicação" className="stack-three" /></div>
    </div></section>

    {/* MATERIAL FEITO PARA ABRIR */}
    <section className="inside light pad-small"><div className="wrap" data-reveal>
      <div className="heading"><Kicker>FEITO PARA APLICAR</Kicker><h2>Feito para você ler hoje<br /><em>e aplicar hoje.</em></h2></div>
      <div className="inside-grid">
        <article><b>01</b><h3>Visual e direto</h3><p>Sequência clara, sem enrolação nem linguagem vulgar. Você abre e entende.</p></article>
        <article><b>02</b><h3>Feito para consultar</h3><p>PDFs que você abre no celular antes de um encontro, quando quiser.</p></article>
        <article><b>03</b><h3>Discreto</h3><p>Chega por e-mail, fica só com você. Sem cadastro extra.</p></article>
      </div>
    </div></section>

    {/* BUNDLE: COMECE PELO GUIA */}
    <section className="bundle dark pad"><div className="wrap" data-reveal>
      <div className="heading centered"><Kicker>ESCOLHA POR ONDE COMEÇAR</Kicker><h2>Comece pelo guia.<br /><em>Ou leve a coleção inteira.</em></h2><p>O conteúdo principal é o mesmo nos dois planos. O Pacote Completo soma 3 materiais para você chegar mais longe.</p></div>
      <div className="bundle-grid">
        <article><div className="bundle-picture"><Cover /></div><div className="bundle-caption"><small>PLANO ESSENCIAL</small><h3>Só o guia</h3><p>23 movimentos em sequência visual, com preparo, ritmo e atenção.</p></div></article>
        <article><div className="bundle-picture bonus-picture"><img src={`${A}v3-bonus-palavras.webp`} alt="" /><img src={`${A}v3-bonus-conexao.webp`} alt="" /><img src={`${A}v3-bonus-tantra.webp`} alt="" /></div><div className="bundle-caption"><small>PACOTE COMPLETO</small><h3>Guia + três bônus</h3><p>Palavras, conexão e presença para levar o encontro ao próximo nível.</p></div></article>
      </div>
    </div></section>

    {/* MARQUEE */}
    <div className="marquee-area dark" aria-hidden="true"><div className="marquee first"><span>MAIS PRESENÇA ◆ MAIS CONTROLE ◆ CÓDIGO DO TOQUE ◆ SEJA LEMBRADO ◆ 23 MOVIMENTOS ◆ ELA QUER DE NOVO ◆ MAIS PRESENÇA ◆ MAIS CONTROLE ◆ CÓDIGO DO TOQUE ◆ SEJA LEMBRADO</span></div><div className="marquee second"><span>EXPLORE NOVAS POSSIBILIDADES ◆ UM GUIA VISUAL PARA CONSULTAR ◆ O HOMEM QUE CONDUZ ◆ EXPLORE NOVAS POSSIBILIDADES ◆</span></div></div>

    {/* OFERTA: DOIS PLANOS */}
    <section id="oferta" className="offer dark pad"><div className="wrap" data-reveal>
      <div className="heading centered"><Kicker>ESCOLHA SUA OFERTA</Kicker><h2>Dois caminhos. <em>O mesmo começo.</em></h2><p>Pagamento único. Entrega por e-mail logo após a confirmação.</p></div>
      <div className="offers-grid">
        <article className="plan-card plan-basic">
          <span className="plan-kicker">01 / O ESSENCIAL</span>
          <div className="plan-art"><Cover /></div>
          <h3>Só o guia</h3>
          <p>Para começar agora com a técnica que muda o seu jeito de conduzir.</p>
          <ul className="ticks"><li>Guia Código do Toque em PDF</li><li>23 movimentos em sequência visual</li><li>Leitura no celular, tablet ou computador</li></ul>
          <div className="plan-price"><small>Pagamento único</small><strong><span>R$</span> 14,90</strong></div>
          <button type="button" className="pill-button plan-button" onClick={() => setUpgradeOpen(true)}>Quero o guia <b>↗</b></button>
          <small className="plan-note">Menos que um combo de delivery. Para a vida inteira.</small>
        </article>
        <article className="plan-card plan-full">
          <span className="plan-ribbon">MAIS CONTEÚDO</span>
          <span className="plan-kicker">02 / EXPERIÊNCIA COMPLETA</span>
          <div className="plan-art plan-art-full"><img src={`${A}v3-main-cover.webp`} alt="Capa Código do Toque" /><img src={`${A}v3-bonus-palavras.webp`} alt="" /><img src={`${A}v3-bonus-conexao.webp`} alt="" /><img src={`${A}v3-bonus-tantra.webp`} alt="" /></div>
          <h3>Pacote Completo</h3>
          <p>O guia + 3 materiais para você dominar a condução inteira.</p>
          <ul className="ticks"><li>Guia com 23 movimentos</li><li>Palavras que Aproximam</li><li>Conexão em Duas Vias</li><li>Tantra sem Complicação</li></ul>
          <div className="plan-price"><small>Pagamento único</small><strong><span>R$</span> 24,90</strong></div>
          <CheckoutLink url={fullUrl} className="plan-button">Quero o pacote completo</CheckoutLink>
          <small className="plan-note">Só R$ 10 a mais para levar 3 materiais.</small>
        </article>
      </div>
    </div></section>

    {/* GARANTIA - NOVA SEÇÃO */}
    <section className="guarantee pad-small"><div className="wrap" data-reveal>
      <div className="heading centered"><Kicker>RISCO ZERO</Kicker><h2>Garantia de <em>7 dias.</em></h2></div>
      <div className="guarantee-card">
        <div className="guarantee-icon">✓</div>
        <h3>Abra, leia, aplique.</h3>
        <p>Se não fizer sentido para você, peça o reembolso em até 7 dias e devolvemos o valor. Sem perguntas, sem burocracia.</p>
      </div>
    </div></section>

    {/* ENTREGA */}
    <section className="delivery dark"><div className="wrap delivery-layout" data-reveal><div className="mail-icon">✉</div><div><Kicker>ENTREGA DIGITAL</Kicker><h2>Compre. Receba por e-mail.<br /><em>Abra onde preferir.</em></h2><p>Depois da confirmação do pagamento, os arquivos do seu plano chegam no e-mail informado. Acesso imediato, sem cadastro extra.</p></div></div><div className="notch" /></section>

    {/* EXPERT: QUEM CRIOU ESSE MÉTODO */}
    <section className="about light pad"><div className="wrap about-layout" data-reveal>
      <div className="about-copy">
        <Kicker>QUEM CRIOU ESSE MÉTODO</Kicker>
        <span className="about-overline">Sua guia</span>
        <h2>Luna Amaral</h2>
        <span className="about-title">Terapeuta Tântrica · 6 anos de prática clínica</span>
        <div className="about-stats">
          <div><strong>6+</strong><span>anos</span></div>
          <div><strong>500+</strong><span>casais</span></div>
          <div><strong>23</strong><span>movimentos</span></div>
        </div>
        <p>Nos meus anos de atendimento, o que mais ouvi de mulheres foi: <em>"Ele é bom, mas falta algo que não sei explicar."</em></p>
        <p>E de homens: <em>"Eu quero ser melhor pra ela. Só não sei o que fazer diferente."</em></p>
        <p>Esse método nasceu exatamente daí. São 23 movimentos testados com casais reais — não teoria. Prática clínica que qualquer homem pode aplicar hoje à noite.</p>
      </div>
      <div className="about-photo"><img src={`${A}v5-expert.webp`} alt="Retrato profissional de Luna Amaral, terapeuta tântrica e criadora do método Código do Toque" /><div><span>CÓDIGO DO TOQUE</span><strong>Luna Amaral</strong></div></div>
    </div></section>

    {/* RESULTADOS REAIS - TESTEMUNHOS */}
    <section className="testimonials dark pad-small"><div className="wrap" data-reveal>
      <div className="heading centered"><Kicker>RESULTADOS REAIS</Kicker><h2>Homens que transformaram<br /><em>sua intimidade:</em></h2></div>
      <div className="testimonials-grid">
        <article className="testimonial-card">
          <div className="stars">★★★★★</div>
          <p>"Nunca pensei que poderia fazer tanta diferença. Ela me olha de um jeito completamente novo agora."</p>
          <span className="testimonial-author">— Carlos M., 34 anos</span>
        </article>
        <article className="testimonial-card">
          <div className="stars">★★★★★</div>
          <p>"As técnicas são simples, mas o resultado é impressionante. Nossa conexão está muito mais intensa."</p>
          <span className="testimonial-author">— Roberto S., 41 anos</span>
        </article>
        <article className="testimonial-card">
          <div className="stars">★★★★★</div>
          <p>"Finalmente me sinto confiante. Ela me disse que nunca se sentiu tão especial."</p>
          <span className="testimonial-author">— Eduardo T., 29 anos</span>
        </article>
        <article className="testimonial-card">
          <div className="stars">★★★★★</div>
          <p>"Isso mudou completamente meu jogo. Ela não consegue parar de pensar nos nossos momentos."</p>
          <span className="testimonial-author">— Felipe R., 27 anos</span>
        </article>
        <article className="testimonial-card">
          <div className="stars">★★★★★</div>
          <p>"Eu estava perdendo ela... depois desses movimentos, nossa paixão voltou mais forte que nunca."</p>
          <span className="testimonial-author">— Gabriel M., 36 anos</span>
        </article>
      </div>
    </div></section>

    {/* FAQ */}
    <section className="faq light pad-small"><div className="wrap faq-wrap" data-reveal>
      <div className="heading centered"><Kicker>PERGUNTAS FREQUENTES</Kicker><h2>Tire suas <em>dúvidas.</em></h2></div>
      <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<b>+</b></summary><p>{answer}</p></details>)}</div>
      <div className="centered faq-cta"><Button>Ver as duas ofertas</Button></div>
    </div></section>

    {/* FINAL CTA */}
    <section className="final-cta dark pad"><div className="wrap" data-reveal>
      <div className="heading centered"><Kicker>A ESCOLHA É SUA</Kicker><h2>Continuar no automático<br /><em>ou ser o homem que ela não esquece?</em></h2></div>
      <p style={{color:'#bbb4b0',maxWidth:'500px',margin:'0 auto',fontSize:'14px'}}>Por menos que um jantar, você leva o método para a vida toda.</p>
      <div className="final-cta-buttons">
        <CheckoutLink url={fullUrl} className="">Quero o pacote completo</CheckoutLink>
        <CheckoutLink url={basicUrl} className="">Só o guia por R$ 14,90</CheckoutLink>
      </div>
      <div className="final-cta-micro">Acesso imediato <span>•</span> Garantia de 7 dias <span>•</span> Compra discreta</div>
    </div></section>

    {/* FOOTER */}
    <footer className="footer dark"><div className="wrap footer-main"><Brand /><p>Um guia digital sobre toque, comunicação e presença.<br />Conteúdo exclusivo para maiores de 18 anos.</p><a href="#inicio">Voltar ao início ↑</a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Código do Toque</span><span>Entrega imediata por e-mail.</span></div></footer>

    <UpgradeModal open={upgradeOpen} onClose={closeUpgrade} remaining={remaining} basicUrl={basicUrl} upgradeUrl={upgradeUrl} fullUrl={fullUrl} />
    <PurchaseNotifications />
  </main>;
}
