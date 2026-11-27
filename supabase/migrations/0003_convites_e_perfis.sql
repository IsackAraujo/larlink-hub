-- A-01/A-02/A-04: cadastro fechado por lista de convidados.
-- Quem não está em `convites` não consegue criar conta (o trigger aborta a criação em auth.users).
-- Quem está ganha o perfil e o papel definidos aqui.

create table public.convites (
  email     text primary key check (email = lower(email)),
  nome      text not null,
  papel     papel_usuario not null,
  criado_em timestamptz not null default now()
);
alter table public.convites enable row level security;

create policy gestao_all on public.convites
  for all to authenticated using (public.eh_gestao()) with check (public.eh_gestao());

create function public.criar_perfil_convidado() returns trigger
language plpgsql security definer set search_path = public as $$
declare c convites%rowtype;
begin
  select * into c from convites where email = lower(new.email);
  if not found then
    raise exception 'E-mail não autorizado no Larlink Hub';
  end if;
  insert into profiles (id, nome, papel) values (new.id, c.nome, c.papel)
  on conflict (id) do nothing;
  return new;
end $$;
revoke execute on function public.criar_perfil_convidado() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.criar_perfil_convidado();

insert into public.convites (email, nome, papel) values
  ('isackaraujoc@gmail.com',        'Isack',     'gestao'),
  ('plzorel@gmail.com',             'Pedro',     'gestao'),
  ('alexandredecarli123@gmail.com', 'Alexandre', 'gestao'),
  ('lzzoffh4x@gmail.com',           'Luiz',      'sdr');
