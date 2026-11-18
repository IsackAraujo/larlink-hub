-- Endurecimento apontado pelo Security Advisor do Supabase

-- search_path fixo em todas as funções
alter function public.dias_uteis_9h(timestamptz, int) set search_path = public;
alter function public.pontos_transicao(etapa_lead)   set search_path = public;
alter function public.guarda_etapa()                 set search_path = public;

-- Ninguém sem login executa funções privilegiadas
revoke execute on function public.papel_atual()                          from public, anon;
revoke execute on function public.eh_gestao()                            from public, anon;
revoke execute on function public.mover_etapa(uuid, etapa_lead, jsonb)   from public, anon;

-- Função de trigger: não é para ser chamada via API por ninguém
revoke execute on function public.aplicar_cadencia() from public, anon, authenticated;

-- Necessárias para usuários logados (RLS e RPC do funil)
grant execute on function public.papel_atual()                        to authenticated;
grant execute on function public.eh_gestao()                          to authenticated;
grant execute on function public.mover_etapa(uuid, etapa_lead, jsonb) to authenticated;
