# ADR 0003 — Renderização dinâmica (Cache Components desligado)

**Status:** aceita · **Data:** 2026-11-17

## Contexto
O Next.js 16 vem com `cacheComponents` ligado no template. Com ele, toda leitura de `cookies()` (sessão do Supabase) precisa ficar dentro de `<Suspense>`, senão o build falha. No Larlink Hub praticamente toda tela depende do usuário logado e do papel dele.

## Decisão
Desligar `cacheComponents` e `partialPrefetching`. As telas autenticadas renderizam dinamicamente por requisição, no modelo clássico do App Router.

## Consequências
- (+) Código mais simples e familiar para o time; sessão lida direto em Server Components e layouts.
- (+) Volume é pequeno (4 usuários) — não há ganho real de cache estático.
- (−) Sem shell estático pré-renderizado. Se performance virar problema, reavaliar por rota.
