-- Larlink Hub — schema inicial (RASCUNHO para revisão do arquiteto-supabase)
-- Regras: docs/produto/funil-e-regras.md · Segurança: docs/arquitetura/seguranca-rls.md

-- ───────────────────────── enums ─────────────────────────
create type papel_usuario   as enum ('gestao', 'sdr');
create type etapa_lead      as enum ('prospect','contato_feito','respondeu','com_isack','reuniao_marcada','contrato_fechado','perdido');
create type origem_lead     as enum ('lista_premium','instagram','visita','indicacao','meta_ads','google_ads','site','linkedin','agente_n8n','rd_import','outro');
create type canal_contato   as enum ('instagram','whatsapp','ligacao','visita','email','linkedin');
create type sentimento      as enum ('boa','neutra','dificil');
create type motivo_perda    as enum ('objecao','sem_resposta','fora_do_perfil','ja_tem_solucao','fechou_concorrente','timing','outro');
create type categoria_objecao as enum ('preco','timing','confianca','produto','concorrente','outro');
create type tipo_tarefa     as enum ('follow_up','retomar','contatar_quente','reuniao','registrar_resultado','decidir','manual');
create type tipo_evento     as enum ('etapa','nota','interacao','objecao','tarefa_concluida','sugestao');

-- ───────────────────────── perfis ─────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  nome        text not null,
  papel       papel_usuario not null default 'sdr',
  avatar_url  text,
  ativo       boolean not null default true,
  criado_em   timestamptz not null default now()
);

create function public.papel_atual() returns papel_usuario
language sql stable security definer set search_path = public as $$
  select papel from public.profiles where id = auth.uid() and ativo
$$;

create function public.eh_gestao() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.papel_atual() = 'gestao', false)
$$;

-- ───────────────────────── leads ─────────────────────────
create table public.leads (
  id               uuid primary key default gen_random_uuid(),
  imobiliaria      text not null,
  cidade           text,
  uf               char(2),
  site             text,
  instagram        text,
  seguidores       int,
  whatsapp         text,
  telefone         text,
  email            text,
  contato_nome     text,
  contato_cargo    text,
  tamanho_estimado int,
  premium          boolean not null default false,
  origem           origem_lead not null default 'outro',
  tags             text[] not null default '{}',
  observacoes      text,
  etapa            etapa_lead not null default 'prospect',
  etapa_desde      timestamptz not null default now(),
  responsavel_id   uuid references public.profiles(id),
  closer_id        uuid references public.profiles(id),
  perdido_motivo   motivo_perda,
  perdido_em_etapa etapa_lead,
  perdido_detalhe  text,
  plano            text,
  valor_mensal     numeric(10,2),
  criado_em        timestamptz not null default now(),
  atualizado_em    timestamptz not null default now()
);
create index on public.leads (responsavel_id, etapa);
create index on public.leads (etapa);

create table public.lead_eventos (
  id         bigint generated always as identity primary key,
  lead_id    uuid not null references public.leads(id) on delete cascade,
  tipo       tipo_evento not null,
  de_etapa   etapa_lead,
  para_etapa etapa_lead,
  pontos     int not null default 0,
  autor_id   uuid references public.profiles(id),
  payload    jsonb not null default '{}',
  criado_em  timestamptz not null default now()
);
create index on public.lead_eventos (lead_id, criado_em desc);
create index on public.lead_eventos (autor_id, criado_em);

create table public.interacoes (
  id             uuid primary key default gen_random_uuid(),
  lead_id        uuid not null references public.leads(id) on delete cascade,
  canal          canal_contato not null,
  sentimento     sentimento,
  resumo         text,
  lead_respondeu boolean not null default false,
  autor_id       uuid not null references public.profiles(id),
  criado_em      timestamptz not null default now()
);
create index on public.interacoes (lead_id, criado_em desc);

create table public.objecoes (
  id             uuid primary key default gen_random_uuid(),
  titulo         text not null,
  categoria      categoria_objecao not null default 'outro',
  como_responder text,
  ativa          boolean not null default true,
  criado_em      timestamptz not null default now()
);

create table public.lead_objecoes (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads(id) on delete cascade,
  objecao_id uuid references public.objecoes(id),
  detalhe    text,
  etapa      etapa_lead not null,
  autor_id   uuid not null references public.profiles(id),
  criado_em  timestamptz not null default now()
);
create index on public.lead_objecoes (objecao_id);

create table public.cadencias (
  id            uuid primary key default gen_random_uuid(),
  etapa_gatilho etapa_lead not null,
  passo         int not null,
  dias_uteis    int not null,
  tipo_tarefa   tipo_tarefa not null,
  titulo        text not null,
  sugestao      text,
  para          text not null default 'responsavel' check (para in ('responsavel','closer')),
  ativa         boolean not null default true,
  unique (etapa_gatilho, passo)
);

create table public.tarefas (
  id             uuid primary key default gen_random_uuid(),
  lead_id        uuid references public.leads(id) on delete cascade,
  atribuida_a    uuid not null references public.profiles(id),
  tipo           tipo_tarefa not null default 'manual',
  titulo         text not null,
  sugestao       text,
  vence_em       timestamptz not null,
  concluida_em   timestamptz,
  cancelada_em   timestamptz,
  origem         text not null default 'manual' check (origem in ('auto','manual')),
  cadencia_passo int,
  criado_em      timestamptz not null default now()
);
create index on public.tarefas (atribuida_a, vence_em) where concluida_em is null and cancelada_em is null;

create table public.scripts (
  id     uuid primary key default gen_random_uuid(),
  canal  canal_contato not null,
  etapa  etapa_lead not null,
  titulo text not null,
  texto  text not null,
  ativo  boolean not null default true
);

create table public.sugestoes_ia (
  id        uuid primary key default gen_random_uuid(),
  lead_id   uuid references public.leads(id) on delete set null,
  intencao  text not null,
  pedido    text,
  resposta  text,
  modelo    text,
  util      boolean,
  autor_id  uuid not null references public.profiles(id),
  criado_em timestamptz not null default now()
);

create table public.clientes (
  id             uuid primary key default gen_random_uuid(),
  lead_id        uuid unique references public.leads(id),
  nome           text not null,
  plano          text,
  valor_mensal   numeric(10,2),
  inicio         date not null default current_date,
  status         text not null default 'implantando' check (status in ('implantando','ativo','pausado','cancelado')),
  saude          text not null default 'verde' check (saude in ('verde','amarelo','vermelho')),
  saude_motivo   text,
  checklist      jsonb not null default '{}',
  responsavel_cs uuid references public.profiles(id),
  criado_em      timestamptz not null default now()
);

create table public.metas (
  id         uuid primary key default gen_random_uuid(),
  usuario_id uuid references public.profiles(id),   -- null = meta do time
  tipo       text not null,                          -- abordagens_dia, clientes_mes, mrr, visitas_semana
  valor      numeric not null,
  inicio     date not null,
  fim        date
);

create table public.push_subscriptions (
  id         uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.profiles(id) on delete cascade,
  endpoint   text not null unique,
  p256dh     text not null,
  auth       text not null,
  criado_em  timestamptz not null default now()
);

create table public.notificacoes_fila (
  id         bigint generated always as identity primary key,
  usuario_id uuid not null references public.profiles(id) on delete cascade,
  titulo     text not null,
  corpo      text,
  url        text,
  enviar_em  timestamptz not null default now(),
  enviada_em timestamptz
);
create index on public.notificacoes_fila (enviar_em) where enviada_em is null;

create table public.relatorios (
  id        uuid primary key default gen_random_uuid(),
  periodo   daterange not null,
  numeros   jsonb not null,
  resumo    text,
  criado_em timestamptz not null default now()
);

-- ───────────────────────── utilidades ─────────────────────────
-- Soma N dias úteis (seg–sex) e fixa às 09:00 America/Sao_Paulo
create function public.dias_uteis_9h(p_base timestamptz, p_dias int) returns timestamptz
language plpgsql immutable as $$
declare d date := (p_base at time zone 'America/Sao_Paulo')::date; n int := 0;
begin
  while n < p_dias loop
    d := d + 1;
    if extract(isodow from d) < 6 then n := n + 1; end if;
  end loop;
  return (d + time '09:00') at time zone 'America/Sao_Paulo';
end $$;

create function public.pontos_transicao(p_para etapa_lead) returns int
language sql immutable as $$
  select case p_para
    when 'contato_feito'    then 10
    when 'respondeu'        then 20
    when 'com_isack'        then 50
    when 'reuniao_marcada'  then 80
    when 'contrato_fechado' then 200
    else 0 end
$$;

-- ───────────────────────── mover_etapa ─────────────────────────
create function public.mover_etapa(p_lead uuid, p_para etapa_lead, p_dados jsonb default '{}')
returns void language plpgsql security definer set search_path = public as $$
declare
  v_papel papel_usuario := public.papel_atual();
  v_lead  leads%rowtype;
  v_ok    boolean := false;
  v_obj   uuid;
begin
  if v_papel is null then raise exception 'Sem acesso'; end if;

  select * into v_lead from leads where id = p_lead for update;
  if not found then raise exception 'Lead não encontrado'; end if;

  if v_papel = 'sdr' and v_lead.responsavel_id is distinct from auth.uid() then
    raise exception 'Este lead não é seu';
  end if;

  -- matriz de transições (espelha funil-e-regras.md)
  v_ok := case
    when v_lead.etapa = 'prospect'        and p_para = 'contato_feito'    then true
    when v_lead.etapa = 'contato_feito'   and p_para = 'respondeu'        then true
    when v_lead.etapa = 'respondeu'       and p_para = 'com_isack'        then true
    when v_lead.etapa = 'com_isack'       and p_para in ('reuniao_marcada','contrato_fechado') then v_papel = 'gestao'
    when v_lead.etapa = 'reuniao_marcada' and p_para = 'contrato_fechado' then v_papel = 'gestao'
    when p_para = 'perdido' and v_lead.etapa not in ('contrato_fechado','perdido') then
         v_papel = 'gestao' or v_lead.etapa in ('prospect','contato_feito','respondeu')
    when v_lead.etapa = 'perdido' and p_para = 'prospect' then v_papel = 'gestao'
    else false end;

  if not v_ok then
    raise exception 'Transição não permitida: % → %', v_lead.etapa, p_para;
  end if;

  -- dados obrigatórios por transição
  if p_para = 'contato_feito' and (p_dados->>'canal') is null then
    raise exception 'Informe o canal da abordagem';
  end if;
  if p_para = 'com_isack' and coalesce(trim(p_dados->>'nota_passagem'),'') = '' then
    raise exception 'Escreva a nota de passagem para o Isack';
  end if;
  if p_para = 'reuniao_marcada' and (p_dados->>'quando') is null then
    raise exception 'Informe data e hora da reunião';
  end if;
  if p_para = 'contrato_fechado' and (p_dados->>'valor_mensal') is null then
    raise exception 'Informe plano e valor';
  end if;
  if p_para = 'perdido' then
    if (p_dados->>'motivo') is null then
      raise exception 'Escolha a objeção ou o motivo antes de marcar como perdido';
    end if;
    if p_dados->>'motivo' = 'objecao' and (p_dados->>'objecao_id') is null and coalesce(p_dados->>'detalhe','') = '' then
      raise exception 'Escolha a objeção (ou descreva em "Outra")';
    end if;
  end if;

  perform set_config('larlink.via_rpc', 'on', true);

  update leads set
    etapa            = p_para,
    etapa_desde      = now(),
    atualizado_em    = now(),
    closer_id        = case when p_para = 'com_isack' then coalesce(closer_id, (p_dados->>'closer_id')::uuid) else closer_id end,
    plano            = case when p_para = 'contrato_fechado' then p_dados->>'plano' else plano end,
    valor_mensal     = case when p_para = 'contrato_fechado' then (p_dados->>'valor_mensal')::numeric else valor_mensal end,
    perdido_motivo   = case when p_para = 'perdido' then (p_dados->>'motivo')::motivo_perda when p_para = 'prospect' then null else perdido_motivo end,
    perdido_em_etapa = case when p_para = 'perdido' then v_lead.etapa when p_para = 'prospect' then null else perdido_em_etapa end,
    perdido_detalhe  = case when p_para = 'perdido' then p_dados->>'detalhe' when p_para = 'prospect' then null else perdido_detalhe end
  where id = p_lead;

  perform set_config('larlink.via_rpc', 'off', true);

  insert into lead_eventos (lead_id, tipo, de_etapa, para_etapa, pontos, autor_id, payload)
  values (p_lead, 'etapa', v_lead.etapa, p_para, public.pontos_transicao(p_para), auth.uid(), p_dados);

  if p_dados ? 'canal' then
    insert into interacoes (lead_id, canal, sentimento, resumo, lead_respondeu, autor_id)
    values (p_lead, (p_dados->>'canal')::canal_contato, (p_dados->>'sentimento')::sentimento,
            p_dados->>'resumo', p_para = 'respondeu', auth.uid());
  end if;

  if p_para = 'perdido' and p_dados->>'motivo' = 'objecao' then
    v_obj := (p_dados->>'objecao_id')::uuid;
    insert into lead_objecoes (lead_id, objecao_id, detalhe, etapa, autor_id)
    values (p_lead, v_obj, p_dados->>'detalhe', v_lead.etapa, auth.uid());
  end if;
end $$;

revoke all on function public.mover_etapa(uuid, etapa_lead, jsonb) from public;
grant execute on function public.mover_etapa(uuid, etapa_lead, jsonb) to authenticated;

-- guarda: etapa só muda via mover_etapa
create function public.guarda_etapa() returns trigger
language plpgsql as $$
begin
  if new.etapa is distinct from old.etapa and coalesce(current_setting('larlink.via_rpc', true), 'off') <> 'on' then
    raise exception 'Use mover_etapa() para mudar a etapa';
  end if;
  return new;
end $$;
create trigger leads_guarda_etapa before update on public.leads
  for each row execute function public.guarda_etapa();

-- ───────────────────────── cadências ─────────────────────────
create function public.aplicar_cadencia() returns trigger
language plpgsql security definer set search_path = public as $$
declare c cadencias%rowtype; v_dest uuid;
begin
  if new.etapa is not distinct from old.etapa then return new; end if;

  -- cancela automáticas pendentes da etapa anterior
  update tarefas set cancelada_em = now()
   where lead_id = new.id and origem = 'auto' and concluida_em is null and cancelada_em is null;

  for c in select * from cadencias where etapa_gatilho = new.etapa and ativa order by passo loop
    v_dest := case c.para when 'closer' then coalesce(new.closer_id, new.responsavel_id) else new.responsavel_id end;
    continue when v_dest is null;
    insert into tarefas (lead_id, atribuida_a, tipo, titulo, sugestao, vence_em, origem, cadencia_passo)
    values (new.id, v_dest, c.tipo_tarefa, c.titulo, c.sugestao, public.dias_uteis_9h(now(), c.dias_uteis), 'auto', c.passo);
  end loop;

  if new.etapa = 'com_isack' and new.closer_id is not null then
    insert into notificacoes_fila (usuario_id, titulo, corpo, url)
    values (new.closer_id, '🔥 Lead quente', new.imobiliaria || ' foi passada pra você', '/vendas/leads/' || new.id);
  end if;

  if new.etapa = 'contrato_fechado' then
    insert into clientes (lead_id, nome, plano, valor_mensal)
    values (new.id, new.imobiliaria, new.plano, new.valor_mensal)
    on conflict (lead_id) do nothing;
  end if;

  return new;
end $$;
create trigger leads_cadencia after update of etapa on public.leads
  for each row execute function public.aplicar_cadencia();

-- ───────────────────────── RLS ─────────────────────────
alter table public.profiles           enable row level security;
alter table public.leads              enable row level security;
alter table public.lead_eventos       enable row level security;
alter table public.interacoes         enable row level security;
alter table public.objecoes           enable row level security;
alter table public.lead_objecoes      enable row level security;
alter table public.cadencias          enable row level security;
alter table public.tarefas            enable row level security;
alter table public.scripts            enable row level security;
alter table public.sugestoes_ia       enable row level security;
alter table public.clientes           enable row level security;
alter table public.metas              enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.notificacoes_fila  enable row level security;
alter table public.relatorios         enable row level security;

-- gestão: acesso total
do $$
declare t text;
begin
  foreach t in array array['leads','interacoes','objecoes','lead_objecoes','cadencias','tarefas',
                           'scripts','sugestoes_ia','clientes','metas','relatorios','notificacoes_fila'] loop
    execute format('create policy gestao_all on public.%I for all to authenticated using (public.eh_gestao()) with check (public.eh_gestao())', t);
  end loop;
end $$;

-- lead_eventos: insert-only via RPC (security definer); leitura
create policy gestao_select on public.lead_eventos for select to authenticated using (public.eh_gestao());
create policy sdr_select on public.lead_eventos for select to authenticated
  using (exists (select 1 from public.leads l where l.id = lead_id and l.responsavel_id = auth.uid()));

-- profiles
create policy todos_select on public.profiles for select to authenticated using (true);
create policy proprio_update on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid() and papel = public.papel_atual());
create policy gestao_update on public.profiles for update to authenticated using (public.eh_gestao());

-- leads (sdr: só os dele; sem insert/delete)
create policy sdr_select on public.leads for select to authenticated using (responsavel_id = auth.uid());
create policy sdr_update on public.leads for update to authenticated
  using (responsavel_id = auth.uid()) with check (responsavel_id = auth.uid());

-- interacoes / lead_objecoes
create policy sdr_select on public.interacoes for select to authenticated
  using (exists (select 1 from public.leads l where l.id = lead_id and l.responsavel_id = auth.uid()));
create policy sdr_insert on public.interacoes for insert to authenticated
  with check (autor_id = auth.uid() and exists (select 1 from public.leads l where l.id = lead_id and l.responsavel_id = auth.uid()));
create policy sdr_select on public.lead_objecoes for select to authenticated
  using (exists (select 1 from public.leads l where l.id = lead_id and l.responsavel_id = auth.uid()));
create policy sdr_insert on public.lead_objecoes for insert to authenticated
  with check (autor_id = auth.uid() and exists (select 1 from public.leads l where l.id = lead_id and l.responsavel_id = auth.uid()));

-- biblioteca e scripts: leitura
create policy sdr_select on public.objecoes for select to authenticated using (ativa);
create policy sdr_select on public.scripts  for select to authenticated using (ativo);

-- tarefas
create policy sdr_select on public.tarefas for select to authenticated using (atribuida_a = auth.uid());
create policy sdr_update on public.tarefas for update to authenticated
  using (atribuida_a = auth.uid()) with check (atribuida_a = auth.uid());

-- sugestões
create policy sdr_select on public.sugestoes_ia for select to authenticated using (autor_id = auth.uid());
create policy sdr_insert on public.sugestoes_ia for insert to authenticated with check (autor_id = auth.uid());
create policy sdr_update on public.sugestoes_ia for update to authenticated
  using (autor_id = auth.uid()) with check (autor_id = auth.uid());

-- metas individuais
create policy proprio_select on public.metas for select to authenticated using (usuario_id = auth.uid());

-- push
create policy proprio_all on public.push_subscriptions for all to authenticated
  using (usuario_id = auth.uid()) with check (usuario_id = auth.uid());

-- clientes, relatorios, cadencias, notificacoes_fila: só gestão (já coberto acima)

-- ───────────────────────── seed de cadências ─────────────────────────
insert into public.cadencias (etapa_gatilho, passo, dias_uteis, tipo_tarefa, titulo, sugestao, para) values
  ('contato_feito', 1, 2,  'follow_up',      'Follow-up 1', 'Lembrete leve + um dado do mercado imobiliário', 'responsavel'),
  ('contato_feito', 2, 5,  'follow_up',      'Follow-up 2', 'Mande um conteúdo de valor (post ou case)',      'responsavel'),
  ('contato_feito', 3, 9,  'follow_up',      'Follow-up 3', 'Pergunta direta: faz sentido conversarmos?',     'responsavel'),
  ('contato_feito', 4, 14, 'follow_up',      'Follow-up 4', 'Mensagem de despedida educada',                  'responsavel'),
  ('contato_feito', 5, 16, 'decidir',        'Decidir lead','Marcar como sem resposta ou reciclar',           'responsavel'),
  ('respondeu',     1, 3,  'retomar',        'Retomar conversa', 'Sem interação há 3 dias úteis',            'responsavel'),
  ('com_isack',     1, 1,  'contatar_quente','Contatar lead quente', 'Ler a nota de passagem do Luiz',       'closer'),
  ('reuniao_marcada',1, 1, 'registrar_resultado','Registrar resultado da reunião', null,                     'closer');
-- Obs.: "Retomar" deve ser reagendada a cada nova interação (trigger em interacoes — fazer na C-03).
