# Tema Editorial — área de gestão

Vale só para as rotas `(gestao)`. O SDR continua no tema Vidro (`design-system.md`). Decisão: ADR 0003.

**Vibe:** jornal impresso + terminal antigo. Papel branco, tinta preta, filetes finos, títulos serifados, rótulos em máquina de escrever. Tudo visível de uma vez, sem enfeite, sem vidro, sem blur e sem gradiente.

## Tokens (escopo `[data-theme="editorial"]`)

```css
[data-theme="editorial"] {
  --paper: #FFFFFF;
  --paper-2: #F4F4F2;          /* fundo de card/botão */
  --ink-print: #111111;        /* texto e filetes */
  --ink-muted: #555555;
  --rule: 1px solid var(--ink-print);
  --rule-thick: 2px solid var(--ink-print);
  --shadow-hard: 2px 2px 0 var(--ink-print);   /* sombra dura, nunca difusa */
  --terminal-bg: #000000;
  --terminal-fg: #F2F2F2;
  --r-ed: 2px;                 /* quase reto */
  --font-display: "Newsreader", "Libre Caslon Text", Georgia, serif;   /* títulos, condensado/serifado */
  --font-body: "Newsreader", Georgia, serif;
  --font-label: "JetBrains Mono", ui-monospace, monospace;
  /* compartilhados com o tema Vidro: --sun, --ok, --warn, --err, --info, cores de etapa */
}
```

O ouro (`--sun`) continua sendo o único acento de cor. Use-o em no máximo um elemento por tela (meta batida, alerta de lead quente). O resto é preto no branco.

## Layout

- **Faixa de terminal** no topo (opcional, 4–6 linhas): fundo preto, mono 12px, prefixo `> `. Mostra o log do que aconteceu ("> Luiz moveu Imob. X para Reunião marcada"). Linhas novas entram digitando.
- **Cabeçalho**: logo/nome em serifa à esquerda e, à direita, botões `[🔔] [EDITAR] [MENU ▾]`.
- **Grade de colunas** (desktop ≥ 1280px: 4 colunas + painel de chat de 360px à direita). Cada coluna tem um bloco por módulo:
  - Título em serifa 20px semibold, com filete `--rule` embaixo, ocupando a largura da coluna.
  - Conteúdo direto, sem card em volta, a não ser que seja item clicável.
- Colunas sugeridas: **Painel/Negócio** (KPIs, MRR, clientes) · **Tarefas/Backlog** · **Vendas/Funil + Marketing** (Instagram, ads) · **Clientes/CS + Documentos**.
- Abaixo de 1280px a grade vira 2 colunas e o chat vira gaveta. Em 390px, 1 coluna (a gestão raramente usa o celular, mas não pode quebrar).

## Componentes

| Componente | Visual |
|---|---|
| `PaperPanel` | substitui `GlassCard`: fundo `--paper-2`, borda `--rule-thick`, `--shadow-hard`, raio `--r-ed`, padding 12/16 |
| `TaskCard` | `PaperPanel` com título serifa bold, descrição em 1 linha com reticências, rodapé com `Tag` à esquerda e valor mono à direita |
| `Tag` | mono 11px caixa-alta, letter-spacing .08em, fundo branco, borda fina |
| `RetroButton` | mono 12px caixa-alta, fundo `--paper-2`, borda `--rule`, `--shadow-hard`; ao pressionar, `translate(2px,2px)` e sem sombra. Ícone pequeno à esquerda. Grupos de botões colados (`[IMAGEM][VÍDEO][…]`) |
| `PrimaryBlock` | botão grande preto com texto branco espaçado (ex.: "VER PLANOS"), só 1 por tela |
| `StatLine` | `RÓTULO: valor` em mono caixa-alta; o valor em negrito |
| `SectionNote` | linha mono pequena tipo "ATUALIZADO HÁ 2 MIN" |
| `DocList` | lista com ícone, título serifa e tempo à direita em mono, separada por filetes finos |
| `EmptyNote` | frase serifa simples: "Nenhuma mídia ainda." |
| `ChatPanel` | coluna à direita com filete vertical; data "HOJE" entre filetes; balões com borda fina; input com botão `ENVIAR` retrô |
| `AsciiMascot` (opcional) | ilustração em traço preto simples com balão de status ("TUDO NO AR") |
| `NewBlock` | caixa tracejada com `+ NOVO BLOCO`, para adicionar um widget |

`Stat`, `FunnelBar` e `StageBadge` leem o tema: no Editorial, as barras são pretas com hachura, e o badge de etapa é uma `Tag` com um quadradinho da cor da etapa.

## Movimento

Pouco e "mecânico": texto do terminal digitando, botão afundando 2px e troca instantânea de abas. Sem fade longo, sem sheen e sem sol de fundo. Com `prefers-reduced-motion`, o terminal mostra as linhas prontas.

## Acessibilidade

Preto no branco já passa AA com folga. O foco é um contorno de 2px tracejado preto com offset 2px. O rótulo mono nunca pode ficar abaixo de 11px.
