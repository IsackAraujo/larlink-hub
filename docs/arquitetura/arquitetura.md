# Arquitetura

## Visão geral

```
           ┌──────────────── Vercel ────────────────┐
 Celular   │  Next.js (App Router)                  │
 (PWA) ───►│   • Server Components (leitura)        │──► Claude API
 Desktop   │   • Server Actions (mutações → RPC)    │    (sugestões)
           │   • /api/sugestao  /api/push           │
           └───────────────┬────────────────────────┘
                           │ supabase-js (JWT do usuário)
           ┌───────────────▼──────────── Supabase ──────────────┐
           │ Auth (magic link, convite)                          │
           │ Postgres + RLS                                      │
           │   tabelas · views de relatório · RPCs (mover_etapa) │
           │   triggers (cadências, pontos, cliente ao fechar)   │
           │ pg_cron ──► Edge Function `notificar` ──► Web Push  │
           │ Realtime (opcional: kanban ao vivo)                 │
           └─────────────────────────────────────────────────────┘
```

## Por que essa stack

- **Já é a infra do time** (Supabase + Vercel) — zero custo de aprendizado, plano gratuito cobre o volume (4 usuários).
- **Regra de negócio no banco** (RLS + RPC + triggers): a mesma regra vale para app, scripts e integrações futuras (ex.: n8n jogando prospects direto no banco).
- **PWA em vez de app nativo**: o Luiz instala pelo "Adicionar à tela de início", recebe push, sem loja de apps.

## Camadas

| Camada | Responsabilidade | Onde |
|---|---|---|
| UI | Telas, componentes, animação | `src/app`, `src/components` |
| Ações | Validar input (zod), chamar RPC, revalidar cache | `src/app/**/actions.ts` |
| Domínio | Constantes do funil espelhadas do banco (labels, cores, ordem) | `src/lib/funil` |
| Dados | Tabelas, RLS, RPCs, triggers, views | `supabase/migrations` |
| Jobs | Notificações, relatório semanal, reciclagem | `pg_cron` + `supabase/functions` |
| IA | Montar contexto + chamar Claude | `src/lib/ia`, `src/app/api/sugestao` |

## Fluxos principais

### Registrar abordagem (SDR)
1. Luiz toca "Registrar contato" no lead → folha "Como foi?".
2. Server Action → `rpc('mover_etapa', { lead, 'contato_feito', dados })`.
3. RPC valida papel e transição, grava `lead_eventos` e `interacoes`, cancela tarefas antigas, cria cadência D+2…D+16, soma pontos.
4. UI revalida "Hoje" com animação de progresso da meta.

### Passar para o Isack
1. Luiz toca "Passar para o Isack" → nota de passagem obrigatória.
2. RPC move para `com_isack`, cria tarefa para o Isack, insere em `notificacoes_fila`.
3. Cron (a cada 5 min) envia push para o Isack.

### Lembretes do dia
- `pg_cron` 08:30 seg–sex → Edge Function `notificar` envia ao Luiz: "Hoje: X abordagens + Y follow-ups".
- 16:30 → se a meta não foi batida: "Faltam N abordagens para manter sua sequência 🔥".

### Relatório semanal
- `pg_cron` segunda 07:00 → Edge Function `relatorio-semanal` lê as views, gera resumo (Claude) e salva em `relatorios`; aparece no painel da Gestão.

## Ambientes

| Ambiente | Banco | Deploy |
|---|---|---|
| local | `supabase start` (Docker) | `pnpm dev` |
| preview | mesmo projeto Supabase por enquanto (staging depois) | Vercel preview por PR |
| produção | projeto Supabase `larlink-hub` (ref `kciosbjjoznhrrcgtiam`, sa-east-1) | Vercel `larlink-hub` → https://larlink-hub.vercel.app (branch `master`) |

Migrations aplicadas via CLI (`supabase db push`) no CI ao fazer merge na `main`.

## Integrações futuras (não MVP)
- **n8n** (já roda no servidor): agente de prospecção insere prospects direto em `leads` via service role, com `origem = 'agente_n8n'`.
- Importação do RD Station (CSV) — feita uma vez na migração.
- Link do lead no Instagram/WhatsApp: botões abrem `instagram.com/<handle>` e `wa.me/<numero>` com mensagem pré-preenchida.
