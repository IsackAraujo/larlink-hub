# ADR 0001 — Stack: Next.js + Supabase + Vercel, entregue como PWA

**Status:** aceita · **Data:** 2026-11-17

## Contexto
Precisamos de uma plataforma interna para 4 usuários, com uso pesado no celular pelo SDR, notificações e relatórios. O time já opera Supabase e Vercel. Orçamento de ferramentas é baixo.

## Decisão
- Next.js (App Router) na Vercel.
- Supabase para Auth, Postgres com RLS, RPCs, triggers, pg_cron e Edge Functions.
- PWA instalável em vez de app nativo.
- Regras de negócio do funil no banco (RPC + triggers), não só no front.

## Consequências
- (+) Custo próximo de zero; time já conhece; deploy por PR.
- (+) Regras valem para qualquer cliente do banco (app, n8n, scripts).
- (−) Push no iOS exige o app instalado na tela de início (16.4+) — precisamos de onboarding de instalação.
- (−) Lógica em SQL exige testes pgTAP e disciplina de migrations.

## Alternativas consideradas
- **Continuar no RD Station**: difícil para o SDR, sem personalização nem identidade visual.
- **Coda/Superhuman Docs como CRM**: rápido de montar, mas limite de requisições, mobile fraco e sem push/gamificação.
- **App nativo (React Native)**: loja de apps e manutenção dobrada sem ganho real para 4 usuários.
