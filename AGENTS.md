# AGENTS.md

Índice para qualquer agente de código (Claude Code, Codex, Cursor etc.). A fonte principal de contexto é o **`CLAUDE.md`** — leia ele primeiro; as regras valem para todos os agentes.

## Subagentes (`.claude/agents/`)

| Agente | Quando usar |
|---|---|
| `analista-produto` | Transformar pedido em história com critérios de aceite; manter backlog e docs de produto em dia |
| `arquiteto-supabase` | Tabelas, migrations, RLS, RPCs, triggers, cron, Edge Functions |
| `dev-frontend` | Telas Next.js, Server Actions, componentes, PWA |
| `designer-larlink` | Fidelidade visual, design system, microinterações, revisão de UI |
| `revisor-qa` | Revisão de PR, testes e2e mobile, acessibilidade, RLS por perfil |

## Skills (`.claude/skills/`)

| Skill | Conteúdo |
|---|---|
| `larlink-design-system` | Tokens, vidro fosco, "luz de sol", componentes base, regras de movimento |
| `funil-crm` | Etapas, transições, quem pode mover, follow-ups automáticos, objeções |
| `supabase-migracao-rls` | Checklist de migration + modelos de política RLS por perfil |
| `pwa-mobile` | Manifest, service worker, push, instalação no iOS/Android, padrões de toque |
| `criar-modulo` | Passo a passo para abrir um módulo novo (rota, nav, permissão, doc) |
| `sugestao-ia` | Como montar o contexto e o prompt do botão "Pedir sugestão" |

## Fluxo padrão de uma feature

1. `analista-produto` confirma o item no backlog e os critérios de aceite.
2. `arquiteto-supabase` faz a migration (se houver) com RLS.
3. `dev-frontend` implementa, carregando `larlink-design-system`.
4. `designer-larlink` revisa visual em 390px e desktop.
5. `revisor-qa` roda testes e checa a Definition of Done.
