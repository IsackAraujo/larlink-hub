-- Rituais da gestão (weekly, 1:1, review de números…), editáveis pelos sócios.
-- Só a gestão lê e escreve; o SDR não enxerga.

create table public.rituais (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null check (length(trim(titulo)) > 0),
  frequencia  text not null default 'semanal' check (frequencia in ('diario','semanal','quinzenal','mensal')),
  quando      text,            -- ex.: "segunda 19h"
  duracao_min integer check (duracao_min is null or duracao_min between 5 and 480),
  pauta       text,            -- uma linha por item
  dono_id     uuid references public.profiles(id) on delete set null,
  ativo       boolean not null default true,
  criado_em   timestamptz not null default now()
);
alter table public.rituais enable row level security;

create policy gestao_all on public.rituais
  for all to authenticated using (public.eh_gestao()) with check (public.eh_gestao());

insert into public.rituais (titulo, frequencia, quando, duracao_min, pauta) values
  ('Weekly dos sócios', 'semanal', 'segunda à noite', 40,
   E'Números da semana (abordagens, respostas, calls, fechamentos)\nO que travou\nPrioridades da próxima semana\nQuem faz o quê');
