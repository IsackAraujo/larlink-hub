# Design system

Implementação dos tokens em `src/styles/tokens.css` + `tailwind.config.ts`. Componentes base em `src/components/ui/`.

## Tokens

```css
:root {
  /* cor */
  --ink: #2B3E5A;
  --ink-deep: #1D2C42;
  --sun: #F0A527;
  --sun-soft: rgba(240,165,39,.16);
  --mist-1: #EEF1F5;
  --mist-2: #F7F8FA;
  --ceramic: #FBFBFA;
  --glass: rgba(255,255,255,.62);
  --glass-strong: rgba(255,255,255,.78);
  --glass-solid: rgba(251,251,250,.9);  /* BottomNav e Sheet: legível sobre conteúdo */
  --glass-border: rgba(255,255,255,.7);
  --line: rgba(29,44,66,.08);
  --text: #1D2C42;
  --text-2: rgba(29,44,66,.60);
  --text-3: rgba(29,44,66,.40);
  --ok: #3F8F6B; --warn: #D98E1F; --err: #C2514A; --info: #4A6FA5;

  /* forma */
  --r-sm: 10px; --r-md: 16px; --r-lg: 22px; --r-xl: 28px; --r-pill: 999px;

  /* profundidade: sombras longas e claras, nunca escuras e curtas */
  --shadow-1: 0 1px 2px rgba(29,44,66,.04), 0 8px 24px rgba(29,44,66,.06);
  --shadow-2: 0 2px 4px rgba(29,44,66,.05), 0 18px 48px rgba(29,44,66,.10);
  --highlight: inset 0 1px 0 rgba(255,255,255,.9); /* quina de espelho */

  /* vidro */
  --blur: 24px;

  /* movimento */
  --ease-out: cubic-bezier(.22,1,.36,1);
  --ease-spring: cubic-bezier(.34,1.56,.64,1);
  --t-fast: 150ms; --t-base: 240ms; --t-slow: 420ms;
  --t-ambient: 7s;

  /* espaço (base 4) */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 24px; --s-6: 32px; --s-7: 48px;
}
```

## Fundo "dia nublado com sol"

O `body` tem três camadas:
1. Gradiente névoa vertical (`--mist-2` no topo → `--mist-1`).
2. Um "sol" difuso: radial-gradient ouro a 10–14% de opacidade, grande (60–80vw), no canto superior direito, que se desloca devagar (animação de 30–40s, alternate).
3. "Nuvens": 2–3 radiais brancos grandes e borrados que se movem ainda mais devagar.

Tudo em `position: fixed`, `pointer-events: none`, `will-change: transform`. Com `prefers-reduced-motion`, fica parado.

## Superfície de vidro (`GlassCard`)

```css
.glass {
  background: var(--glass);
  backdrop-filter: blur(var(--blur)) saturate(140%);
  -webkit-backdrop-filter: blur(var(--blur)) saturate(140%);
  border: 1px solid var(--glass-border);
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-1), var(--highlight);
  position: relative; overflow: hidden;
}
/* reflexo de sol que atravessa o espelho */
.glass--sheen::after {
  content: ""; position: absolute; inset: -50% auto -50% -60%;
  width: 40%; transform: rotate(18deg);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.55), rgba(240,165,39,.10), transparent);
  animation: sheen var(--t-ambient) var(--ease-out) infinite;
}
@keyframes sheen { 0%,70% { left: -60%; } 100% { left: 130%; } }
@media (prefers-reduced-motion: reduce) { .glass--sheen::after { animation: none; display: none; } }
```

Usar `--sheen` com parcimônia: card de meta do dia, card do lead em destaque, KPI principal do painel. Nunca em listas longas.

## Componentes base

| Componente | Notas |
|---|---|
| `Button` | variantes `primary` (tinta, texto branco), `sun` (ouro, só o CTA mais importante), `ghost`, `glass`. Altura 44 (mobile) / 40 (desktop). Pressionar: `scale(.97)` com spring. |
| `GlassCard` | prop `sheen`, `interactive` (eleva para `--shadow-2` no hover/press) |
| `Sheet` | bottom sheet no mobile, modal centralizado no desktop; arrastar para fechar |
| `StageBadge` | pílula com cor por etapa (ver abaixo) |
| `ProgressRing` | anel da meta do dia; preenchimento ouro; número em JetBrains Mono |
| `Stat` | KPI: rótulo pequeno + número mono grande + variação |
| `FunnelBar` | barras horizontais com conversão entre etapas |
| `EmptyState` | ilustração leve + frase + ação |
| `Toast` | vidro forte, aparece de baixo, some em 3s |
| `BottomNav` | vidro forte, 4 itens, indicador ouro sob o ativo, respeita safe-area |
| `Avatar`, `Chip`, `Input`, `Select`, `Textarea`, `Segmented`, `Skeleton` | — |

## Cores das etapas

| Etapa | Cor |
|---|---|
| Prospect | `--text-3` (cinza névoa) |
| Entrou em contato | `--info` |
| Obteve resposta | `--ink` |
| Com o Isack | `--sun` |
| Reunião marcada | `#7A6FB0` (lavanda) |
| Contrato fechado | `--ok` |
| Perdido | `--err` a 70% |

## Movimento

- Entrada de tela: fade + 8px de subida, `--t-base`, `--ease-out`; listas em cascata de 30ms.
- Mudança de etapa: card desliza para a coluna nova (layout animation — Framer Motion / Motion One).
- Meta batida: anel completa com spring + brilho ouro passando + vibração curta.
- Skeletons com shimmer na cor névoa (não cinza).

## Acessibilidade

- Contraste AA mínimo sobre vidro (testar texto `--text-2` em cima de fundo claro — se falhar, usar `--glass-strong`).
- Foco visível: anel 2px ouro com offset 2px.
- Nunca depender só de cor para etapa: badge tem texto.
