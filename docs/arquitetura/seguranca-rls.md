# Segurança e RLS

## Princípios

1. **RLS ligada em toda tabela** do schema `public`. Sem exceção.
2. **Papel lido do banco**, nunca do client: função `public.papel_atual()` (security definer, `stable`) consulta `profiles`.
3. **Mutações sensíveis por RPC** (`mover_etapa`, `registrar_objecao`, `concluir_tarefa`) com `security definer` + checagem explícita de papel e dono. `leads.etapa` não é atualizável diretamente (policy de update exclui a coluna via trigger de guarda).
4. **Service role só em Edge Functions/cron** — nunca no Next.js de forma exposta.
5. **Cadastro fechado** — trigger `criar_perfil_convidado` em `auth.users` aborta a criação de qualquer e-mail fora de `convites` (migration 0003).

## Funções auxiliares

```sql
create function public.papel_atual() returns papel_usuario
language sql stable security definer set search_path = public as $$
  select papel from profiles where id = auth.uid() and ativo
$$;

create function public.eh_gestao() returns boolean
language sql stable as $$ select public.papel_atual() = 'gestao' $$;
```

## Políticas por tabela (resumo)

| Tabela | gestao | sdr |
|---|---|---|
| convites | all | **nada** |
| profiles | select all; update all | select all (nome/avatar); update próprio |
| leads | all | select/update onde `responsavel_id = auth.uid()`; insert não |
| lead_eventos | select all; insert via RPC | select dos seus leads; insert via RPC |
| interacoes | all | select/insert nos seus leads |
| tarefas | all | select/update onde `atribuida_a = auth.uid()` |
| objecoes | all | select |
| lead_objecoes | all | select/insert nos seus leads |
| scripts, cadencias | all | select (scripts) / nada (cadencias) |
| sugestoes_ia | all | select/insert/update(util) próprios |
| clientes, metas (time), relatorios, conteudos, feedbacks, decisoes | all | **nada** |
| metas (individual) | all | select onde `usuario_id = auth.uid()` |
| push_subscriptions | próprias | próprias |

## Guarda da coluna `etapa`

Trigger `before update on leads`: se `new.etapa is distinct from old.etapa` e a variável de sessão `larlink.via_rpc` não estiver setada pela RPC → `raise exception 'Use mover_etapa()'`.

## Testes obrigatórios de RLS

Em `supabase/tests/` (pgTAP) — para cada tabela nova:
- sdr não lê lead de outro responsável
- sdr não lê `clientes`
- sdr não move lead de `com_isack` para frente
- sdr não marca perdido sem objeção/motivo
- gestao lê tudo

## Outros cuidados

- Rate limit em `/api/sugestao` (ex.: 30/usuário/dia) para controlar custo.
- Nada de dados pessoais além do contato comercial da imobiliária.
- Backups: plano Supabase + export semanal de `leads` e `lead_eventos` (cron).
- Headers de segurança no `next.config` (CSP, `X-Frame-Options`).

## Avisos aceitos do Security Advisor

O Supabase sinaliza `authenticated_security_definer_function_executable` para `papel_atual()`, `eh_gestao()` e `mover_etapa()`. É intencional: as duas primeiras são usadas pelas políticas RLS, e `mover_etapa()` é a única porta para mudar etapa — ela valida papel e dono do lead internamente. Nenhuma delas é executável por `anon` (migration `0002_endurece_funcoes.sql`).
