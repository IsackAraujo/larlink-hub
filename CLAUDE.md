# CLAUDE.md — Larlink Hub

Contexto para o Claude Code. Leia este arquivo inteiro antes de qualquer tarefa.

## O que é

Plataforma interna da Larlink (PropTech de IA no WhatsApp para imobiliárias). Centraliza **marketing, vendas, produto, sucesso do cliente e gestão**, com um **CRM mobile-first para o SDR (Luiz)**. Usuários: 3 sócios (perfil `gestao`) e 1 SDR (perfil `sdr`). Volume pequeno, foco em clareza, velocidade e beleza.

O cliente final da Larlink é a **imobiliária**. Todo lead neste sistema é uma imobiliária (ou o dono/gestor dela).

## Stack

- **Next.js** (App Router, Server Components, Server Actions) + **TypeScript strict**
- **Tailwind CSS** com tokens do design system (`docs/design/design-system.md`)
- **Supabase**: Auth (e-mail + magic link), Postgres, **RLS em todas as tabelas**, Edge Functions, pg_cron
- **Vercel** para deploy (preview por PR, produção na `main`)
- **PWA**: manifest + service worker + Web Push (VAPID)
- **Claude API** (server-side apenas) para o botão "Pedir sugestão"
- Testes: Vitest (unidade), Playwright (e2e, viewport mobile obrigatório)

## Comandos

```bash
pnpm dev                 # desenvolvimento
pnpm build && pnpm start # build de produção
pnpm lint && pnpm typecheck
pnpm test                # vitest
pnpm test:e2e            # playwright (mobile + desktop)
pnpm supabase start      # banco local
pnpm supabase migration new <nome>
pnpm supabase gen types typescript --local > src/lib/supabase/types.ts
```

## Estrutura de pastas (alvo)

```
src/
  app/
    (auth)/login/
    (sdr)/hoje/  leads/  leads/[id]/  objecoes/  eu/       ← interface do Luiz (mobile-first)
    (gestao)/painel/  vendas/  marketing/  produto/  clientes/  gestao/
    api/sugestao/route.ts   api/push/route.ts
  components/
    ui/          ← primitivos do design system (GlassCard, Button, Sheet, Badge…)
    crm/         ← LeadCard, StageBadge, FunnelBar, ObjectionSheet…
    charts/
  lib/
    supabase/    ← clients (server, browser), types gerados
    funil/       ← regras de etapa (fonte única: docs/produto/funil-e-regras.md)
    ia/          ← prompt e chamada da sugestão
  styles/tokens.css
supabase/migrations/   supabase/functions/
docs/   .claude/
```

## Regras inegociáveis

1. **Funil é lei.** Etapas, transições e permissões vêm de `docs/produto/funil-e-regras.md`. Mudança de etapa só pela RPC `mover_etapa()` — nunca `update` direto em `leads.etapa`.
2. **RLS sempre.** Toda tabela nova nasce com RLS ligada e políticas para `gestao` e `sdr`. O SDR nunca lê `clientes`, `financeiro`, relatórios globais nem leads de outro responsável.
3. **Mobile primeiro para rotas `(sdr)`.** Projetar em 390×844, alvos de toque ≥ 44px, ações principais no alcance do polegar (barra inferior / bottom sheet). Testar no Playwright com viewport de iPhone.
4. **Identidade visual Larlink.** Usar apenas tokens de `docs/design/design-system.md`. Nada de cores soltas, nada de sombras pesadas, nada de visual "SaaS genérico". Vibe: vidro fosco, luz de sol num dia nublado, cerâmica clara.
5. **Chaves só no servidor.** `ANTHROPIC_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `VAPID_PRIVATE_KEY` nunca vão para o client.
6. **Interface em português do Brasil; código em inglês** (nomes de variáveis, funções, componentes). Exceção: nomes de tabelas/colunas e enums do banco ficam em português, como no schema (`leads.etapa`, `tarefas.vence_em`), para bater com a linguagem do negócio.
7. **Respeitar `prefers-reduced-motion`.** Toda animação tem fallback estático.

## Convenções

- Componentes: `PascalCase.tsx`, um por arquivo. Server Component por padrão; `"use client"` só quando precisa.
- Dados: ler em Server Components; mutações via Server Actions que chamam RPCs do Supabase.
- Datas: armazenar em UTC, exibir em `America/Sao_Paulo`.
- Commits: Conventional Commits em português (`feat(crm): tela Hoje do SDR`).
- Toda feature fecha um item do `docs/backlog/backlog.md` — atualize o status lá no mesmo PR.
- Decisão de arquitetura nova → novo ADR em `docs/decisoes/`.

## Definition of Done

- [ ] Critérios de aceite do item do backlog atendidos
- [ ] RLS testada para os dois perfis
- [ ] Funciona em 390px e em desktop (≥ 1280px)
- [ ] Lighthouse PWA/A11y ≥ 90 nas telas tocadas
- [ ] `lint`, `typecheck`, `test` verdes
- [ ] Docs atualizadas (backlog, e o doc da área se a regra mudou)

## Agentes e skills

- Subagentes em `.claude/agents/`: `analista-produto`, `arquiteto-supabase`, `dev-frontend`, `designer-larlink`, `revisor-qa`.
- Skills em `.claude/skills/`: `larlink-design-system`, `funil-crm`, `supabase-migracao-rls`, `pwa-mobile`, `criar-modulo`, `sugestao-ia`.
- Antes de mexer em UI, carregue `larlink-design-system`. Antes de mexer em lead/etapa/tarefa, carregue `funil-crm`. Antes de criar tabela, carregue `supabase-migracao-rls`.

## Docs de referência

- Produto: `docs/produto/visao.md`, `modulos.md`, `perfis-e-permissoes.md`, `funil-e-regras.md`
- Arquitetura: `docs/arquitetura/arquitetura.md`, `modelo-de-dados.md`, `seguranca-rls.md`, `pwa-e-notificacoes.md`, `ia-sugestoes.md`
- Design: `docs/design/identidade-visual.md`, `design-system.md`, `ux-sdr-mobile.md`
- Backlog: `docs/backlog/backlog.md`, `roadmap.md`
