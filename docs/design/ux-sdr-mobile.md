# UX do SDR (mobile)

Tela de referência: 390×844 (iPhone 14/15). Tudo aqui também funciona no desktop, mas o desenho nasce no celular.

## Tela "Hoje" (`/hoje`) — a tela que mais importa

```
┌──────────────────────────────┐
│ Bom dia, Luiz ☀️     🔥 5 dias │  saudação + sequência
│                              │
│ ┌──────── vidro + sheen ────┐ │
│ │  ◯ 4/6   Novas abordagens │ │  ProgressRing ouro
│ │  Faltam 2 · 320 pts hoje  │ │
│ └───────────────────────────┘ │
│                              │
│ Follow-ups  (3)        ver ›  │  vencidos em vermelho suave
│ ┌ Imob. Alfa · FU 2 · hoje ─┐ │
│ │ "Mande o post do FipeZAP" │ │  sugestão da cadência
│ │ [Feito] [Adiar] [💡]       │ │
│ └───────────────────────────┘ │
│                              │
│ Próximos para abordar        │
│ ┌ Imob. Beta · Itajaí ──────┐ │
│ │ 2.4k seguidores · premium │ │
│ │ [Abordar]  [💡 Sugestão]   │ │
│ └───────────────────────────┘ │
│                              │
│ Dica do dia (objeção comum)  │
├──────────────────────────────┤
│  Hoje   Leads   Objeções  Eu │  BottomNav vidro
└──────────────────────────────┘
```

Ordem da tela = ordem de prioridade: follow-ups vencidos → follow-ups de hoje → novas abordagens até bater a meta.

## Ficha do lead (`/leads/[id]`)

- Topo: nome da imobiliária, cidade, `StageBadge`, botões de atalho **Instagram** · **WhatsApp** · **Site**.
- Card "Como abordar": script do canal com variáveis já preenchidas + botão **Copiar**.
- Linha do tempo: interações, mudanças de etapa, objeções, sugestões usadas.
- Barra de ação fixa no rodapé (muda conforme a etapa):
  - Prospect → **Registrei o contato**
  - Contato feito → **Ele respondeu** · **Follow-up feito**
  - Respondeu → **Passar para o Isack** · **Não converteu**
- Botão flutuante 💡 **Pedir sugestão** sempre visível.
- Menu ⋯: **Registrar objeção**, adicionar nota, editar dados.

## Folhas (bottom sheets)

**Como foi?** — canal (chips) · carinha 😃😐😕 · "O que ele disse?" (1 linha) · toggle "Teve objeção?" → Salvar. Meta: < 10 segundos.

**Registrar objeção** — busca na biblioteca (chips das 6 mais comuns) · detalhe em 1 frase · mostra "Como responder" da objeção escolhida (aprendizado na hora).

**Passar para o Isack** — "Por que está quente?" · melhor horário · nome/WhatsApp do decisor → envia e mostra confirmação com confete leve dourado.

**Não converteu** — objeção obrigatória (ou "Não respondeu" quando aplicável) → confirma.

## Leads (`/leads`)

- Segmentado no topo: **Prospect · Contato · Respondeu** (as 3 etapas do Luiz) com contadores.
- Lista de cards; swipe → ação rápida.
- Busca por nome/cidade; filtro premium.
- Desktop: kanban de 3 colunas com arrastar (arrastar dispara a mesma folha da RPC).

## Eu (`/eu`)

- Pontos da semana, sequência, recorde.
- Gráfico simples de abordagens/dia (últimos 14 dias).
- Taxa de resposta dele e quantos passou para o Isack.
- Conquistas (ex.: "Primeira reunião gerada", "10 dias seguidos", "50 objeções registradas").
- Instalar app / ativar notificações / sair.

## Estados

- **Meta batida**: anel completa, mensagem "Meta do dia ✓ — o que vier agora é bônus".
- **Vazio**: "Sem follow-ups hoje. Bora abrir porta nova?" + botão Abordar.
- **Offline**: faixa discreta no topo "Offline — salvando no celular".
