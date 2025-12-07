-- 004_enable_rls_and_policies.sql

-- Ativa RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

-- POLICIES PARA PROFILES

-- Admin: acesso total
create policy if not exists "admin_full_access_profiles"
on public.profiles
for all
using (
  exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role = 'admin'
  )
);

-- Usuário lê seu próprio perfil
create policy if not exists "user_read_own_profile"
on public.profiles
for select
using (auth.uid() = id);

-- Usuário atualiza seu próprio perfil
create policy if not exists "user_update_own_profile"
on public.profiles
for update
using (auth.uid() = id);

-- POLICIES PARA USER_ROLES

create policy if not exists "admin_full_access_roles"
on public.user_roles
for all
using (
  exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role = 'admin'
  )
);

-- Opcional: impedir que usuário comum veja roles
-- (não criando policy de select para não-admins)
