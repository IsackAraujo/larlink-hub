# Larlink Hub

Plataforma interna de desempenho da Larlink: marketing, vendas, produto, sucesso do cliente e gestão num só lugar, com um CRM mobile-first para o SDR.

> Uso interno. Não é produto vendido para imobiliárias — é a ferramenta que a Larlink usa para vender para imobiliárias.

## Os 5 módulos

| Módulo | Para quê | Quem usa |
|---|---|---|
| **Vendas** (inclui o CRM) | Funil de prospecção → contrato, tarefas, objeções, sugestões de IA | SDR (parte dele) + Gestão |
| **Marketing** | Calendário de conteúdo, origem dos leads, campanhas | Gestão |
| **Produto** | Feedback de clientes e objeções viram backlog de produto | Gestão |
| **Sucesso do Cliente** | Clientes ativos, implantação, saúde, MRR | Gestão |
| **Gestão** | Metas, relatórios, weekly, visão geral | Gestão |

## Dois perfis de acesso

- **Gestão** — Isack, Pedro, Alexandre. Vê e edita tudo.
- **SDR** — Luiz. Vê só os leads dele, a tela "Hoje", tarefas, objeções e os próprios números.

## Stack

Next.js (App Router) + TypeScript + Tailwind · Supabase (Auth, Postgres, RLS, Edge Functions, pg_cron) · Vercel · PWA instalável com notificações push · Claude API para sugestões.

## Onde está cada coisa

```
CLAUDE.md                  ← contexto para o Claude Code (ler primeiro)
AGENTS.md                  ← índice de agentes/skills para outras ferramentas
docs/
  produto/                 ← visão, módulos, perfis, funil e regras
  arquitetura/             ← arquitetura, dados, segurança, PWA, IA
  design/                  ← identidade visual, design system, UX mobile
  backlog/                 ← backlog priorizado + roadmap
  decisoes/                ← ADRs (decisões registradas)
.claude/
  agents/                  ← subagentes especializados
  skills/                  ← skills (como fazer X do jeito Larlink)
supabase/migrations/       ← schema inicial (rascunho)
```

## Começando (quando o código existir)

```bash
pnpm install
cp .env.example .env.local   # preencher chaves
pnpm supabase start          # banco local
pnpm dev
```

Ordem de leitura para quem chega: `docs/produto/visao.md` → `docs/produto/funil-e-regras.md` → `docs/arquitetura/arquitetura.md` → `docs/backlog/backlog.md`.
