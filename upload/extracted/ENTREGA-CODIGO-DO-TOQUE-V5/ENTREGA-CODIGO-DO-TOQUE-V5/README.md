# Código do Toque — página de vendas

**Versão visual atual: V5.** A hero e a seção da Marina usam a nova expert dos dois anexos de estúdio enviados pelo proprietário. As três imagens formam um ensaio fotográfico coerente no mesmo ambiente. As demais seções e a oferta permanecem na configuração V3. Veja `pagina-de-vendas/ALTERACOES-V5.md`.

Página de vendas Next.js, sem quiz, preparada para um público majoritariamente masculino. A direção visual usa preto, vermelho profundo, cetim e pequenos detalhes dourados. Todas as capas e retratos do rebrand estão em `public/assets/`.

## Executar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000/`. Para validar a versão final, execute `npm run build` e `npx tsc --noEmit`.

## Ofertas

| Opção | Conteúdo | Preço |
| --- | --- | ---: |
| Essencial | Guia Código do Toque, 23 movimentos | R$ 24,90 |
| Pacote Completo | Guia + Palavras que Aproximam + Conexão em Duas Vias + Tantra sem Complicação | R$ 39,90 |
| Upgrade após escolher Essencial | Mesmo Pacote Completo durante a condição especial | R$ 31,90 no total (R$ 24,90 + R$ 7,00) |

O botão do Essencial abre o pop-up de upgrade. Se o prazo da condição especial terminar, o pop-up oferece o Pacote Completo pelo preço normal de R$ 39,90.

## Configuração antes da publicação

Copie `.env.example` para `.env.local` e configure:

- `NEXT_PUBLIC_CHECKOUT_BASIC_URL`: checkout de R$ 24,90 com **somente o guia**.
- `NEXT_PUBLIC_CHECKOUT_FULL_URL`: checkout de R$ 39,90 com guia + três bônus.
- `NEXT_PUBLIC_CHECKOUT_UPGRADE_URL`: checkout de R$ 31,90 com guia + três bônus.
- `NEXT_PUBLIC_UPGRADE_WINDOW_MINUTES`: duração da condição de upgrade, 120 minutos por padrão. O prazo é persistido no navegador, inclusive após recarregar. Configure também a validade no checkout para que o desconto realmente termine quando o relógio zerar.
- `NEXT_PUBLIC_PURCHASE_FEED_URL`: endpoint JSON opcional de compras reais autorizadas. Sem ele, a versão publicada não mostra notificações de compra. A versão local de desenvolvimento mostra exemplos identificados como **EXEMPLO VISUAL**.
- `NEXT_PUBLIC_META_PIXEL_ID` e `NEXT_PUBLIC_UTMIFY_ENABLED`: rastreamento opcional. Confirme os dados da conta antes de ativar.

Formato do feed de compras: array JSON de objetos com `id`, `name` (primeiro nome autorizado), `city`, `createdAt` (ISO 8601) e `product` opcional. A página exibe apenas registros dos últimos cinco minutos e consulta o endpoint a cada 30 segundos. Use somente registros reais com autorização para exibir nome e cidade.

O som de notificação é gerado no navegador e depende de um clique em **Ativar som**, conforme as regras de reprodução dos navegadores. A página não inclui áudio de terceiros.

## Arquivos principais

- `src/app/page.tsx`: seções, copy e dois planos.
- `src/app/OfferWidgets.tsx`: relógio, pop-up e notificações.
- `src/app/theme-v3.css`: identidade preta, vermelha e dourada.
- `src/app/globals.css`: base de layout e responsividade.
- `public/assets/v3-*`: capas e imagens das outras seções.
- `public/assets/v5-*`: hero desktop, hero mobile e retrato da Marina em uso.
- `pagina-de-vendas/ALTERACOES-V5.md`: alteração visual mais recente. `ENTREGA-V3.md` descreve a oferta e integrações que continuam válidas.

## Conferências finais

Antes de usar em tráfego pago, atualize os PDFs internos para refletir as capas e os nomes da página; confirme a entrega por e-mail; valide os três checkouts; teste o prazo do desconto também na plataforma de pagamento; e conecte um feed de compras reais se quiser publicar as notificações. O segundo order bump antigo ainda precisa ser diferenciado do bônus introdutório se for retomado em uma etapa futura.
