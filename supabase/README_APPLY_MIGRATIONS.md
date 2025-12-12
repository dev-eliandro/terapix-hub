Aplicando migrações no Supabase
================================

Este arquivo descreve opções para aplicar a migration SQL que foi adicionada em `supabase/migrations/20251211000000_create_institutions.sql`.

Opção A — (Recomendado) Usar o SQL Editor do painel do Supabase
- Acesse https://app.supabase.com e entre no seu projeto.
- Vá em `SQL Editor` → `New query`.
- Abra o arquivo `supabase/migrations/20251211000000_create_institutions.sql` no seu editor local, copie o conteúdo e cole na query.
- Clique em `RUN` para executar a migration.

Opção B — Usar o Supabase CLI (para deploys e automações)
- Instale o Supabase CLI (necessita Node/npm):

```powershell
npm install -g supabase
```

- Faça login:

```powershell
supabase login
```

- Crie/associe o link do projeto (opcional se já estiver em um repo vinculado):

```powershell
supabase link --project-ref <SEU_PROJECT_REF>
```

- Aplicar a migration localmente no banco remoto (usando psql via connection string):

```powershell
$env:DB_CONN = "postgresql://postgres:<PASSWORD>@db.xxxxxx.supabase.co:5432/postgres?sslmode=require"
psql $env:DB_CONN -f supabase\migrations\20251211000000_create_institutions.sql
```

Observação: o comando `supabase db push` também existe para sincronizar o schema, mas seu uso exige atenção ao estado do `supabase` directory. Se preferir, use o SQL Editor do painel (Opção A).

Opção C — Usar psql diretamente (se tiver a connection string do Postgres)
- Se você tem acesso ao connection string (ex.: `postgresql://postgres:<PASSWORD>@db.xxxxxx.supabase.co:5432/postgres`), e tem `psql` instalado, rode:

```powershell
$env:DB_CONN = "postgresql://postgres:<PASSWORD>@db.xxxxxx.supabase.co:5432/postgres?sslmode=require"
psql $env:DB_CONN -f supabase\migrations\20251211000000_create_institutions.sql
```

Permissões e chaves
- Para rodar migrations em produção você precisará de credenciais com permissão para criar tabelas (service_role key ou usuário com privilégios suficientes).
- Nunca exponha a `service_role` key no frontend; use-a apenas no servidor/CLI local e CI protegidamente.

Próximos passos sugeridos
- Após aplicar a migration, abra o `Settings` no app e confirme que os dados da instituição são carregados e que `Salvar Dados` cria/atualiza a row em `institutions`.
- Se quiser, eu posso adicionar uma migration de seed (inserir uma row padrão) ou gerar instruções para rodar a migration via CI (GitHub Actions).
