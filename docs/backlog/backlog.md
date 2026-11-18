# Backlog

Status: `📋 a fazer` · `🔨 fazendo` · `👀 revisão` · `✅ feito`
Prioridade: **P0** (MVP, sem isso não lança) · **P1** (logo depois) · **P2** (próximo ciclo) · **P3** (ideia)

Cada item: ID, história, critérios de aceite. Atualize o status no mesmo PR que entrega.

---

## E0 — Fundação

| ID | Item | P | Status |
|---|---|---|---|
| F-01 | Criar projeto Next.js + TS strict + Tailwind + pnpm + ESLint/Prettier | P0 | 👀 |
| F-02 | Projetos Supabase (staging, prod) + CLI local + types gerados | P0 | 🔨 |
| F-03 | Deploy Vercel com preview por PR e envs | P0 | 📋 |
| F-04 | Tokens do design system + fundo "névoa com sol" + fontes Inter/JetBrains Mono | P0 | 👀 |
| F-05 | Componentes base: Button, GlassCard, Sheet, BottomNav, StageBadge, ProgressRing, Stat, Toast, Input, Skeleton | P0 | 👀 |
| F-06 | CI: lint, typecheck, vitest, playwright (mobile+desktop), migrations | P0 | 📋 |

**F-04 aceite:** tela de exemplo `/dev/ui` mostrando todos os tokens e componentes; animações param com reduced-motion.

## E1 — Acesso e perfis

| ID | Item | P | Status |
|---|---|---|---|
| A-01 | Login por magic link, cadastro público desligado, convite pela gestão | P0 | 📋 |
| A-02 | Tabela `profiles` + papel `gestao`/`sdr` + `papel_atual()` | P0 | 📋 |
| A-03 | Middleware: sdr → `/hoje`, gestao → `/painel`; rotas bloqueadas por papel | P0 | 📋 |
| A-04 | Seed dos 4 usuários (Isack, Pedro, Alexandre = gestao; Luiz = sdr) | P0 | 📋 |

**A-03 aceite:** Luiz acessando `/painel` ou `/clientes` é redirecionado; teste e2e cobre.

## E2 — CRM: núcleo (Vendas)

| ID | Item | P | Status |
|---|---|---|---|
| C-01 | Schema: leads, lead_eventos, interacoes, tarefas, objecoes, lead_objecoes, cadencias, scripts + RLS | P0 | 📋 |
| C-02 | RPC `mover_etapa()` com matriz de transições e guarda da coluna `etapa` | P0 | 📋 |
| C-03 | Triggers de cadência (cria/cancela tarefas automáticas) | P0 | 📋 |
| C-04 | Trigger `contrato_fechado` → cria `clientes` | P1 | 📋 |
| C-05 | Importar prospects por CSV (formato do export do RD) e atribuir ao SDR | P0 | 📋 |
| C-06 | Seed da biblioteca de objeções e scripts iniciais | P0 | 📋 |

**C-02 aceite:**
- sdr move 1→2→3→4 apenas nos próprios leads
- sdr não move de `com_isack` em diante (erro claro)
- `perdido` sem objeção/motivo é rejeitado
- todo movimento gera `lead_eventos` com `de_etapa`, `para_etapa`, autor e pontos
- testes pgTAP cobrindo cada linha da matriz em `funil-e-regras.md`

**C-03 aceite:** entrar em `contato_feito` cria 5 tarefas (D+2, 5, 9, 14, 16 em dias úteis, 9h SP); mover para `respondeu` cancela as pendentes e agenda "Retomar" em 3 dias úteis sem interação.

## E3 — Interface do SDR (mobile-first)

| ID | Item | P | Status |
|---|---|---|---|
| S-01 | Tela **Hoje**: saudação, sequência, anel da meta, follow-ups (vencidos/hoje), próximos a abordar | P0 | 📋 |
| S-02 | **Leads**: lista segmentada por etapa (3 do SDR), busca, filtro premium | P0 | 📋 |
| S-03 | **Ficha do lead**: dados, atalhos IG/WhatsApp/site, script com variáveis + copiar, linha do tempo, barra de ação por etapa | P0 | 📋 |
| S-04 | Folha **Como foi?** (canal, sentimento, resumo, teve objeção) | P0 | 📋 |
| S-05 | Folha **Registrar objeção** com "como responder" | P0 | 📋 |
| S-06 | Folha **Passar para o Isack** (nota obrigatória) + notificação ao Isack | P0 | 📋 |
| S-07 | Folha **Não converteu** (objeção ou "não respondeu" obrigatório) | P0 | 📋 |
| S-08 | Concluir / adiar follow-up a partir da Hoje | P0 | 📋 |
| S-09 | **Objeções**: biblioteca navegável com busca | P1 | 📋 |
| S-10 | **Eu**: pontos, sequência, gráfico 14 dias, taxa de resposta, conquistas | P1 | 📋 |
| S-11 | Swipe nos cards e pull-to-refresh | P2 | 📋 |
| S-12 | Kanban desktop com arrastar (dispara as mesmas folhas) | P2 | 📋 |

**S-01 aceite:** em 390px, cabe acima da dobra: saudação, anel e o primeiro follow-up; registrar uma abordagem atualiza o anel sem recarregar; com 0 follow-ups mostra estado vazio.

**S-04 aceite:** salvar em ≤ 3 toques após abrir; funciona offline (fila) e sincroniza ao voltar.

## E4 — Sugestões de IA

| ID | Item | P | Status |
|---|---|---|---|
| I-01 | `/api/sugestao` com contexto (lead + playbook + objeções), streaming, rate limit | P0 | 📋 |
| I-02 | UI: botão 💡, escolher intenção, resposta com copiar/abrir app, 👍/👎 | P0 | 📋 |
| I-03 | Prompt de sistema versionado com tom de voz Larlink | P0 | 📋 |
| I-04 | Métrica de utilidade das sugestões no painel | P2 | 📋 |

## E5 — PWA e notificações

| ID | Item | P | Status |
|---|---|---|---|
| P-01 | Manifest, ícones, splash, safe areas, standalone | P0 | 📋 |
| P-02 | Tela guiada de instalação (iOS) + banner (Android) | P0 | 📋 |
| P-03 | Web Push: inscrição, `notificacoes_fila`, Edge Function `notificar`, cron 5 min | P0 | 📋 |
| P-04 | Resumo 08:30 e lembrete de meta 16:30 para o SDR | P1 | 📋 |
| P-05 | Offline: shell em cache + fila de registros | P1 | 📋 |
| P-06 | Preferências de notificação (horário, tipos) | P2 | 📋 |

## E6 — Gestão: pipeline e painel

| ID | Item | P | Status |
|---|---|---|---|
| G-01 | **Pipeline completo**: kanban 6 etapas + perdidos, tabela com filtros | P0 | 📋 |
| G-02 | **Fila do closer**: leads `com_isack` ordenados por tempo de espera | P0 | 📋 |
| G-03 | Mover para reunião/contrato (data, tipo, plano, valor) | P0 | 📋 |
| G-04 | **Painel**: funil atual, conversão por etapa, abordagens/dia do SDR, taxa de resposta, top objeções | P0 | 📋 |
| G-05 | Visão "como o Luiz vê" (`/hoje?como=`) | P1 | 📋 |
| G-06 | Configurar meta diária e cadências | P1 | 📋 |
| G-07 | Tempo médio por etapa + leads parados (alerta) | P1 | 📋 |
| G-08 | Relatório semanal automático (números + resumo IA) | P2 | 📋 |
| G-09 | Metas do time (clientes, MRR, visitas) com progresso | P2 | 📋 |
| G-10 | Registro de decisões da weekly | P3 | 📋 |

**G-04 aceite:** filtro por período (semana, mês, personalizado); números batem com consultas diretas em `lead_eventos`; carrega em < 1,5s.

## E7 — Sucesso do Cliente

| ID | Item | P | Status |
|---|---|---|---|
| CS-01 | Lista de clientes (plano, valor, início, status, saúde) | P1 | 📋 |
| CS-02 | Checklist de implantação por cliente | P1 | 📋 |
| CS-03 | Saúde manual (verde/amarelo/vermelho + motivo) e última interação | P1 | 📋 |
| CS-04 | MRR total e evolução | P1 | 📋 |
| CS-05 | Lembrete de check-in a cada 15 dias | P2 | 📋 |
| CS-06 | Cadastrar clientes atuais (ex.: ADR) | P1 | 📋 |

## E8 — Marketing

| ID | Item | P | Status |
|---|---|---|---|
| M-01 | Calendário de conteúdo (stories/feed/reels) com status | P2 | 📋 |
| M-02 | Conversão por origem do lead | P1 | 📋 |
| M-03 | Campanhas (canal, período, investimento, leads, CPL) | P2 | 📋 |
| M-04 | Biblioteca de ativos (links) | P3 | 📋 |

## E9 — Produto

| ID | Item | P | Status |
|---|---|---|---|
| PR-01 | Objeções de categoria "produto" agregadas com contagem | P2 | 📋 |
| PR-02 | Mural de feedbacks (cliente/prospect) com votos | P2 | 📋 |

## E10 — Gamificação (evolução)

| ID | Item | P | Status |
|---|---|---|---|
| GM-01 | Pontos a partir de `lead_eventos` + sequência | P1 | 📋 |
| GM-02 | Conquistas | P2 | 📋 |
| GM-03 | Animação de meta batida + háptico | P1 | 📋 |

## E11 — Migração

| ID | Item | P | Status |
|---|---|---|---|
| MG-01 | Exportar RD Station (leads + etapa + notas) e importar | P0 | 📋 |
| MG-02 | Conferência com o Luiz e corte do RD | P0 | 📋 |

---

## Ideias soltas (P3)
- Integração n8n → prospects caem direto na lista do Luiz
- Ranking amigável se entrar mais SDR
- Registro de visitas presenciais com foto/fachada e geolocalização
- Tema escuro "Noite"
- Diagnóstico de Atendimento (cliente oculto) anexado ao lead
