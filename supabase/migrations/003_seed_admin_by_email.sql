-- 003_seed_admin_by_email.sql
do $$
declare
  admin_email text := 'eliandrosucesso@gmail.com';
  admin_id uuid;
begin
  select id into admin_id
  from auth.users
  where email = admin_email;

  if admin_id is not null then
    insert into public.user_roles (user_id, role)
    values (admin_id, 'admin')
    on conflict (user_id) do update set role = 'admin';
  end if;
end $$;
