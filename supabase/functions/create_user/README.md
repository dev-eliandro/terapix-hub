Create User Edge Function
=========================

This Edge Function is an example to create a new auth user using the Supabase service_role key
and insert the corresponding `profiles` and `user_roles` rows. Use this only from a trusted server
environment (do not expose the service_role key to the browser).

Deployment
----------
1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Deploy the function from the repository root:

```powershell
supabase functions deploy create_user --project-ref <PROJECT_REF>
```

Environment variables
---------------------
When deployed as a Supabase Edge Function, make sure the project has the environment variables set:
- `SUPABASE_URL` (auto-provided)
- `SUPABASE_SERVICE_ROLE` (store your service_role key as a secret)

Example request (from frontend)
-------------------------------
Call the deployed function endpoint (replace domain with your project's function domain):

```javascript
const res = await fetch('https://<project>.functions.supabase.co/create_user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'new@example.com', password: 'TempPass123!', full_name: 'Nome Completo', role: 'coordinator' })
});

const json = await res.json();
console.log(json);
```

Security notes
--------------
- Only call this endpoint from a trusted server or an admin-only UI that proxies through a server.
- Do not embed `service_role` key in client-side code.
