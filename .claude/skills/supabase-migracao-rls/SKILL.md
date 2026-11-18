---
name: supabase-migracao-rls
description: Checklist e modelos para criar migrations no Supabase do Larlink Hub com RLS correta para os perfis gestao e sdr, RPCs security definer e testes pgTAP. Use ao criar ou alterar qualquer tabela, função, trigger ou view.
---

# Migration + RLS

## Passo a passo
1. `pnpm supabase migration new <verbo_objeto>` (ex.: `cria_tabela_clientes`)
2. Escreva DDL + `alter table ... enable row level security;`
3. Políticas explícitas por perfil (modelos abaixo). Sem política = ninguém acessa (bom padrão).
4. Índices para FKs e filtros comuns (`responsavel_id`, `etapa`, `vence_em`).
5. Teste pgTAP em `supabase/tests/<tabela>.test.sql`.
6. `pnpm supabase db reset` local → `pnpm test:db` → gerar types.
7. Atualize `docs/arquitetura/modelo-de-dados.md` e a tabela de `seguranca-rls.md`.

## Modelos de política

**Só gestão (ex.: clientes, relatorios):**
```sql
create policy "gestao_all" on public.clientes
  for all to authenticated
  using (public.eh_gestao()) with check (public.eh_gestao());
```

**Gestão tudo + SDR só o que é dele via lead:**
```sql
create policy "gestao_all" on public.interacoes
  for all to authenticated using (public.eh_gestao()) with check (public.eh_gestao());

create policy "sdr_select_proprios" on public.interacoes
  for select to authenticated
  using (exists (select 1 from public.leads l
                 where l.id = lead_id and l.responsavel_id = auth.uid()));

create policy "sdr_insert_proprios" on public.interacoes
  for insert to authenticated
  with check (autor_id = auth.uid() and exists (
    select 1 from public.leads l where l.id = lead_id and l.responsavel_id = auth.uid()));
```

**RPC security definer:**
```sql
create or replace function public.minha_rpc(p_lead uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_papel papel_usuario := public.papel_atual();
begin
  if v_papel is null then raise exception 'Sem acesso'; end if;
  if v_papel = 'sdr' and not exists (
    select 1 from leads where id = p_lead and responsavel_id = auth.uid()
  ) then raise exception 'Lead não é seu'; end if;
  -- ...
end $$;
revoke all on function public.minha_rpc(uuid) from public;
grant execute on function public.minha_rpc(uuid) to authenticated;
```

## Teste pgTAP mínimo
```sql
begin; select plan(2);
select tests.authenticate_as('luiz');         -- helper do supabase-test-helpers
select is_empty($$ select * from clientes $$, 'sdr não lê clientes');
select tests.authenticate_as('isack');
select isnt_empty($$ select * from clientes $$, 'gestao lê clientes');
select * from finish(); rollback;
```

## Nunca
- `security definer` sem `set search_path`
- Política `using (true)` para `authenticated`
- Service role no código do Next.js que roda no client
- Editar migration já aplicada em produção
