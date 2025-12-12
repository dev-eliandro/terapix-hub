-- 20251211000000_create_institutions.sql
create extension if not exists pgcrypto;

create table if not exists public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cnpj text,
  address text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Optionally insert a default row (uncomment if desired)
-- insert into public.institutions (name, cnpj, address) values (
--   'Comunidade Terapêutica Renascer', '12.345.678/0001-90', 'Rua da Esperança, 100 - Centro - São Paulo/SP'
-- ) on conflict do nothing;
