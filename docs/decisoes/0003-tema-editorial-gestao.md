# ADR 0003 — Dois temas visuais: editorial retrô (gestão) e vidro moderno (SDR)

**Status:** aceita · **Data:** 2026-11-25

## Contexto
O design system nasceu com uma vibe só: vidro fosco, sol num dia nublado, cerâmica clara. Para a interface do Luiz (SDR, mobile) isso continua certo. Para a área de gestão, o Isack quer outra coisa: ver tudo de uma vez, num painel denso e "estilo antigo", parecido com um jornal ou terminal. A referência é um print do painel do Polsia: colunas com títulos serifados, filetes pretos, rótulos em mono caixa-alta, botões com borda e sombra dura e uma faixa de terminal no topo.

## Decisão
O Hub passa a ter **dois temas**, escolhidos pelo grupo de rotas:
- `(sdr)` → **tema Vidro** (o atual, sem mudança).
- `(gestao)` → **tema Editorial**, especificado em `docs/design/tema-editorial-gestao.md`.

Os tokens de cor de marca (`--ink-deep`, `--sun`, cores de etapa e de estado) são compartilhados. Mudam superfície, tipografia, bordas, sombras e densidade.

## Consequências
- (+) A gestão vê marketing, vendas, produto, clientes e gestão numa tela só, com densidade alta.
- (+) O SDR continua com a experiência mobile moderna e gamificada.
- (−) Dois conjuntos de primitivos de superfície (`GlassCard` × `PaperPanel`). Os componentes de dados (`Stat`, `FunnelBar`, `StageBadge`) recebem o tema por contexto, não são duplicados.
- (−) A regra 4 do CLAUDE.md deixa de valer igual para todo o app.

## Alternativas consideradas
- Um tema só (vidro) em tudo: rejeitado, porque não atende o pedido para a gestão.
- Editorial em tudo: rejeitado, porque o SDR precisa de toque grande e visual moderno no celular.
