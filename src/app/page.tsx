'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BlackFridayBar, CheckoutLink, PurchaseNotifications, UpgradeModal, useOfferWindow } from './OfferWidgets';

const A = '/assets/';
const basicUrl = process.env.NEXT_PUBLIC_CHECKOUT_BASIC_URL;
const fullUrl = process.env.NEXT_PUBLIC_CHECKOUT_FULL_URL;
const upgradeUrl = process.env.NEXT_PUBLIC_CHECKOUT_UPGRADE_URL;

const chapters = [
  ['01', 'PREPARO', 'Prepare o momento', 'Ambiente, atenção e conversa para começar sem pressa.'],
  ['02', 'MOVIMENTO', 'Explore os movimentos', 'Um repertório visual com 23 possibilidades para consultar.'],
  ['03', 'RITMO', 'Leia a resposta', 'Pausas e sinais para ajustar o toque com cuidado.'],
  ['04', 'CONEXÃO', 'Crie conexão', 'Ideias para sair do automático e construir a dois.'],
];
const faqs = [
  ['O que recebo no plano Essencial?', 'O guia Código do Toque, com 23 movimentos, em formato PDF. Os três materiais complementares fazem parte do Pacote Completo.'],
  ['O que recebo no Pacote Completo?', 'O guia principal e os três PDFs complementares: Palavras que Aproximam, Conexão em Duas Vias e Tantra sem Complicação.'],
  ['É um livro físico?', 'Não. Os materiais são digitais e podem ser consultados no celular, tablet ou computador.'],
  ['Quando recebo os arquivos?', 'Após a confirmação do pagamento, os PDFs são enviados para o e-mail usado na compra. Confira também a pasta de spam.'],
  ['Preciso ter experiência?', 'Não. O guia começa pela preparação e apresenta os movimentos de forma sequencial para consultar no seu ritmo.'],
  ['Como funciona o upgrade?', 'Ao selecionar o guia Essencial durante a condição especial desta visita, você pode adicionar os três bônus por R$ 7,00, totalizando R$ 31,90. Depois do prazo, o Pacote Completo fica no preço normal de R$ 39,90.'],
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

    <section className="hero dark"><div className="hero-image" /><div className="hero-overlay" /><div className="wrap hero-wrap">
      <header><Brand /><small>GUIA DIGITAL PARA ADULTOS</small></header>
      <div className="hero-copy" data-reveal><Kicker>APRESENTADO POR MARINA</Kicker><h1>O toque muda quando você sabe <em>como conduzir.</em></h1><p>Conheça 23 movimentos para ampliar seu repertório, perceber o ritmo da parceira e criar uma experiência mais atenta a dois.</p><Button href="#guia">Quero descobrir o guia</Button><small>Um guia visual <span>•</span> para consultar no seu tempo</small></div>
      <div className="hero-label"><span>COM MARINA</span><strong>Código do Toque</strong></div>
    </div><div className="notch" /></section>

    <section id="guia" className="intro light pad"><div className="wrap" data-reveal><div className="heading centered"><Kicker>UMA FORMA DIFERENTE DE COMEÇAR</Kicker><h2>Como este guia vai <em>te ajudar?</em></h2></div><div className="intro-panel"><div className="intro-visual"><div className="halo" /><Cover className="intro-cover" /><div className="phone"><img src={`${A}v3-main-cover.webp`} alt="Guia Código do Toque visto no celular" /></div><i>◆</i></div><div className="intro-text"><span className="overline">UM GUIA PARA SAIR DO IMPROVISO</span><h3>Mais repertório.<br /><em>Mais intenção.</em></h3><p>O Código do Toque organiza 23 movimentos em uma sequência visual. Você conhece possibilidades, observa a resposta da parceira e adapta o caminho à conversa de vocês.</p><ul className="ticks"><li>23 movimentos em um só guia</li><li>Orientações de preparo, ritmo e atenção</li><li>Leitura no celular, tablet ou computador</li></ul><Button href="#conteudo">Ver o que há no guia</Button></div></div></div></section>

    <section className="reasons dark pad"><div className="wrap" data-reveal><div className="heading centered"><Kicker>POR QUE APRENDER UMA NOVA ABORDAGEM</Kicker><h2>3 razões para deixar o automático<br />e <em>conduzir com mais presença.</em></h2></div><div className="reason-grid"><article><span>01 / REPERTÓRIO</span><h3>Novos caminhos para o toque</h3><p>Uma sequência clara para consultar quando você quiser explorar algo diferente.</p><i>◆</i></article><article><span>02 / RITMO</span><h3>Uma técnica começa pela atenção</h3><p>Observe, pause, converse e ajuste a experiência junto com a parceira.</p><i>◆</i></article><article className="reason-wide"><div><span>03 / CONEXÃO</span><h3>Você aprende a conduzir,<br /><em>sem seguir um roteiro rígido.</em></h3><p>O melhor caminho respeita preferências, limites e o que funciona para os dois.</p></div><Cover /></article></div><div className="centered reason-cta"><Button>Quero conhecer as opções</Button></div></div>
      <div id="conteudo" className="wrap content-block" data-reveal><div className="content-head"><div><Kicker>POR DENTRO DO MATERIAL</Kicker><h2>O que você vai <em>encontrar</em><br />no Código do Toque?</h2></div><div className="rail-buttons"><button type="button" aria-label="Ver capítulos anteriores" onClick={() => rail.current?.scrollBy({ left: -310, behavior: 'smooth' })}>←</button><button type="button" aria-label="Ver próximos capítulos" onClick={() => rail.current?.scrollBy({ left: 310, behavior: 'smooth' })}>→</button></div></div><div className="chapter-rail" ref={rail}>{chapters.map(([num,word,title,body],index) => <article className={`chapter chapter-${index}`} key={num}><div className="chapter-art"><span>{num}</span><strong>{word}</strong><i>◆</i></div><div className="chapter-body"><small>CAPÍTULO {num}</small><h3>{title}</h3><p>{body}</p></div></article>)}</div></div><div className="notch" /></section>

    <section className="bonuses light pad"><div className="wrap bonus-layout" data-reveal><div className="bonus-copy"><Kicker>NO PACOTE COMPLETO</Kicker><h2>Além do guia, mais <em>três materiais para explorar a dois.</em></h2><p>Comunicação, reciprocidade e primeiros passos ganham espaço em três PDFs complementares. Você pode escolher só o guia ou levar a coleção completa.</p><div className="bonus-list"><span>01 <strong>Palavras que Aproximam</strong></span><span>02 <strong>Conexão em Duas Vias</strong></span><span>03 <strong>Tantra sem Complicação</strong></span></div><Button>Comparar as ofertas</Button></div><div className="bonus-stack" aria-label="Capas dos três materiais complementares"><div className="stack-glow" /><Cover src="v3-bonus-palavras.webp" alt="Capa Palavras que Aproximam" className="stack-one" /><Cover src="v3-bonus-conexao.webp" alt="Conexão em Duas Vias" className="stack-two" /><Cover src="v3-bonus-tantra.webp" alt="Capa Tantra sem Complicação" className="stack-three" /></div></div></section>

    <section className="inside light pad-small"><div className="wrap" data-reveal><div className="heading"><Kicker>CLAREZA ANTES DA COMPRA</Kicker><h2>Um material feito para<br /><em>abrir, entender e usar.</em></h2></div><div className="inside-grid"><article><b>01</b><h3>Visual e direto</h3><p>Uma sequência organizada para localizar o assunto e voltar às páginas.</p></article><article><b>02</b><h3>Feito para consultar</h3><p>PDFs digitais para abrir no aparelho que você já usa.</p></article><article><b>03</b><h3>Com espaço para conversa</h3><p>O foco é perceber o outro, respeitar limites e construir o ritmo juntos.</p></article></div></div></section>

    <section className="bundle dark pad"><div className="wrap" data-reveal><div className="heading centered"><Kicker>ESCOLHA O SEU PONTO DE PARTIDA</Kicker><h2>Comece pelo guia.<br /><em>Ou leve a coleção inteira.</em></h2><p>O conteúdo principal é o mesmo nos dois planos. O Pacote Completo adiciona os três materiais de apoio.</p></div><div className="bundle-grid"><article><div className="bundle-picture"><Cover /></div><div className="bundle-caption"><small>PLANO ESSENCIAL</small><h3>Código do Toque</h3><p>23 movimentos em uma sequência visual, com preparação, ritmo e atenção.</p></div></article><article><div className="bundle-picture bonus-picture"><img src={`${A}v3-bonus-palavras.webp`} alt="" /><img src={`${A}v3-bonus-conexao.webp`} alt="" /><img src={`${A}v3-bonus-tantra.webp`} alt="" /></div><div className="bundle-caption"><small>PACOTE COMPLETO</small><h3>Guia + três bônus</h3><p>Comunicação, reciprocidade e primeiros passos para ampliar a experiência.</p></div></article></div></div></section>

    <div className="marquee-area dark" aria-hidden="true"><div className="marquee first"><span>CÓDIGO DO TOQUE ◆ 23 MOVIMENTOS ◆ MAIS PRESENÇA ◆ CÓDIGO DO TOQUE ◆ 23 MOVIMENTOS ◆ MAIS PRESENÇA ◆</span></div><div className="marquee second"><span>EXPLORE NOVAS POSSIBILIDADES ◆ UM GUIA VISUAL PARA CONSULTAR ◆ EXPLORE NOVAS POSSIBILIDADES ◆</span></div></div>

    <section id="oferta" className="offer dark pad"><div className="wrap" data-reveal><div className="heading centered"><Kicker>ESCOLHA SUA OFERTA</Kicker><h2>Dois caminhos. <em>O mesmo começo.</em></h2><p>Pagamento único e entrega digital por e-mail após a confirmação.</p></div><div className="offers-grid">
      <article className="plan-card plan-basic"><span className="plan-kicker">01 / O ESSENCIAL</span><div className="plan-art"><Cover /></div><h3>Só o guia</h3><p>Para começar pelos 23 movimentos e conhecer uma abordagem mais atenta.</p><ul className="ticks"><li>Guia Código do Toque em PDF</li><li>23 movimentos em sequência visual</li><li>Leitura no celular, tablet ou computador</li></ul><div className="plan-price"><small>Pagamento único</small><strong><span>R$</span> 24,90</strong></div><button type="button" className="pill-button plan-button" onClick={() => setUpgradeOpen(true)}>Escolher o guia <b>↗</b></button><small className="plan-note">Antes de ir ao checkout, você verá uma opção de upgrade.</small></article>
      <article className="plan-card plan-full"><span className="plan-ribbon">MAIS CONTEÚDO</span><span className="plan-kicker">02 / EXPERIÊNCIA COMPLETA</span><div className="plan-art plan-art-full"><img src={`${A}v3-main-cover.webp`} alt="Capa Código do Toque" /><img src={`${A}v3-bonus-palavras.webp`} alt="" /><img src={`${A}v3-bonus-conexao.webp`} alt="" /><img src={`${A}v3-bonus-tantra.webp`} alt="" /></div><h3>Pacote Completo</h3><p>O guia principal e os três materiais complementares em uma só compra.</p><ul className="ticks"><li>Guia com 23 movimentos</li><li>Palavras que Aproximam</li><li>Conexão em Duas Vias</li><li>Tantra sem Complicação</li></ul><div className="plan-price"><small>Pagamento único</small><strong><span>R$</span> 39,90</strong></div><CheckoutLink url={fullUrl} className="plan-button">Escolher o pacote completo</CheckoutLink><small className="plan-note">Quatro PDFs enviados para o e-mail da compra.</small></article>
    </div></div></section>

    <section className="delivery dark"><div className="wrap delivery-layout" data-reveal><div className="mail-icon">✉</div><div><Kicker>ENTREGA DIGITAL</Kicker><h2>Compre. Receba por e-mail.<br /><em>Abra onde preferir.</em></h2><p>Depois da confirmação do pagamento, os arquivos correspondentes ao plano escolhido são enviados para o e-mail informado na compra.</p></div></div><div className="notch" /></section>

    <section className="about light pad"><div className="wrap about-layout" data-reveal><div className="about-copy"><Kicker>QUEM APRESENTA O GUIA</Kicker><h2>Prazer,<br /><em>Marina.</em></h2><p>Marina apresenta o Código do Toque com um olhar feminino para um assunto que muitos homens querem entender melhor: como sair do automático e explorar o toque com atenção.</p><p>O guia reúne uma sequência prática e incentiva a conversa, o respeito aos limites e a descoberta de um ritmo que funcione para os dois.</p><ul><li>Uma linguagem direta, sem roteiro engessado</li><li>Conteúdo organizado para consultar sem pressa</li><li>Presença e comunicação como parte da experiência</li></ul></div><div className="about-photo"><img src={`${A}v5-expert.webp`} alt="Retrato profissional de Marina em estúdio, com postura confiante e braços cruzados" /><div><span>CÓDIGO DO TOQUE</span><strong>Marina</strong></div></div></div></section>

    <section className="faq light pad-small"><div className="wrap faq-wrap" data-reveal><div className="heading centered"><Kicker>PERGUNTAS FREQUENTES</Kicker><h2>Tire suas <em>dúvidas.</em></h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<b>+</b></summary><p>{answer}</p></details>)}</div><div className="centered faq-cta"><Button>Ver as duas ofertas</Button></div></div></section>

    <footer className="footer dark"><div className="wrap footer-main"><Brand /><p>Um guia digital sobre toque, comunicação e presença.<br />Conteúdo destinado a adultos.</p><a href="#inicio">Voltar ao início ↑</a></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Código do Toque</span><span>Material digital enviado por e-mail.</span></div></footer>

    <UpgradeModal open={upgradeOpen} onClose={closeUpgrade} remaining={remaining} basicUrl={basicUrl} upgradeUrl={upgradeUrl} fullUrl={fullUrl} />
    <PurchaseNotifications />
  </main>;
}
