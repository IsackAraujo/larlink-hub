---
name: criar-modulo
description: Passo a passo para abrir um módulo novo ou uma área nova no Larlink Hub (Marketing, Produto, Sucesso do Cliente, Gestão) — rota, navegação, permissão, tabelas, docs. Use quando for começar um módulo ou sub-área.
---

# Criar módulo

1. **Produto** — confirme os itens do épico em `docs/backlog/backlog.md` e o escopo em `docs/produto/modulos.md`. Comece pelo menor item P1/P2 que já gera valor.
2. **Dados** — se precisar de tabela, siga a skill `supabase-migracao-rls`. Módulos de gestão (Marketing, Produto, CS, Gestão) são **só `gestao`** por padrão.
3. **Rota** — `src/app/(gestao)/<modulo>/page.tsx` + `layout.tsx` se tiver subnavegação. Nome da rota em pt-BR curto: `marketing`, `produto`, `clientes`, `gestao`.
4. **Navegação** — adicione em `src/lib/nav.ts` (fonte única para sidebar desktop e "Mais" no mobile), com ícone Lucide e `papeis: ['gestao']`.
5. **Middleware** — confirme que a rota cai na lista de rotas exclusivas de gestão.
6. **UI** — carregue `larlink-design-system`. Comece com: cabeçalho, 2–4 `Stat`, lista principal em `GlassCard`, estado vazio desenhado.
7. **Painel** — se o módulo tem um número importante, exponha um `Stat` no `/painel` com link para o módulo.
8. **Docs** — atualize `modulos.md` (o que existe de fato), backlog (status) e, se houver tabela, `modelo-de-dados.md` e `seguranca-rls.md`.
9. **Testes** — e2e: gestão acessa, sdr é redirecionado.
