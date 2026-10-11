# Entrega V3 — Código do Toque

Este é o documento de referência da versão preta, vermelha e dourada. Os arquivos `01-*.md` a `07-*.md` nesta pasta descrevem versões anteriores e **não** são a especificação atual.

## Oferta aplicada

- **Essencial — R$ 24,90:** somente o PDF Código do Toque, guia visual de 23 movimentos.
- **Pacote Completo — R$ 39,90:** guia + Palavras que Aproximam + Conexão em Duas Vias + Tantra sem Complicação.
- **Upgrade após selecionar o Essencial — R$ 31,90 no total:** acréscimo de R$ 7,00 durante a janela da visita; economia de R$ 8,00 em comparação com o Pacote Completo normal. O botão Essencial abre o pop-up antes de qualquer checkout.
- **Entrega:** PDFs enviados por e-mail após a confirmação do pagamento.
- **Público principal:** homens adultos interessados em ampliar repertório de toque; a página não impede compras por mulheres.

## Visual

A sequência das seções da página anterior foi mantida. O rebrand usa preto/charcoal, vermelho profundo e detalhes champagne gold. Manrope compõe o texto funcional; Bodoni Moda compõe as ênfases editoriais. Capas planas em estilo de revista com cetim vermelho, sem a Marina nos materiais. Há hero específico para desktop e para celular. As quatro prévias de capítulos foram convertidas em slides tipográficos escuros, para manter relação com o produto e evitar fotografias genéricas.

Ativos finais: `public/assets/v3-main-cover.webp`, `v3-bonus-palavras.webp`, `v3-bonus-conexao.webp`, `v3-bonus-tantra.webp`, `v3-hero-desktop.webp`, `v3-hero-mobile.webp` e `v3-expert.webp`. Os PNGs originais de alta resolução acompanham o ZIP de entrega em `design-originais/`.

## Interações

- **Relógio Black Friday:** mostra horas e minutos em dígitos flip. A janela de upgrade começa na primeira visita e é persistida em `localStorage`, inclusive após recarregar. Ao zerar, o pop-up deixa de oferecer R$ 31,90 e mostra o pacote por R$ 39,90. O checkout de upgrade também precisa expirar ou invalidar o desconto; a interface sozinha não controla links externos.
- **Notificações de compra:** em desenvolvimento, a página alterna exemplos masculinos e femininos com nome/cidade e o selo visível **EXEMPLO VISUAL**. Em produção, só aparecem dados retornados por `NEXT_PUBLIC_PURCHASE_FEED_URL`. A página aceita apenas registros dos últimos cinco minutos e consulta o endpoint a cada 30 segundos. Não publicar exemplos como compras reais.
- **Som de venda:** chime curto gerado por Web Audio, sem arquivo de terceiros. O visitante deve clicar em **Ativar som**; navegadores bloqueiam reprodução automática antes de uma interação.
- **Carrossel e FAQ:** funcionais e testados. Animações respeitam `prefers-reduced-motion` e mantêm o conteúdo visível em capturas de página inteira.

## Para conectar e publicar

1. Copiar `.env.example` para `.env.local` e configurar **três URLs diferentes**: Essencial R$ 24,90, Completo R$ 39,90 e upgrade R$ 31,90.
2. Confirmar que o checkout de cada URL entrega os PDFs corretos. Os PDFs internos ainda precisam receber as capas e nomes novos.
3. Configurar o prazo de validade do checkout de upgrade para corresponder ao contador. A janela padrão é de 120 minutos por navegador e pode ser alterada em `NEXT_PUBLIC_UPGRADE_WINDOW_MINUTES`.
4. Para prova social real, fornecer feed JSON com compras autorizadas; usar somente primeiro nome/cidade permitidos. Sem feed, não há notificações na versão publicada.
5. Conferir Pixel Meta e UTMify antes de ativar as variáveis opcionais. Os IDs antigos do repositório não são ativados nesta versão.
6. Revisar as condições comerciais e legais da campanha Black Friday na plataforma de pagamento antes de enviar tráfego.

## Verificação feita

`npm run build` e `tsc --noEmit` passaram. A página foi inspecionada em 1440 px, 390 px e 320 px; sem imagens quebradas nem rolagem horizontal. O pop-up foi aberto e fechado em 320 px e 390 px. Prévia desktop, mobile e do pop-up estão em `preview-v3-*.png`.
