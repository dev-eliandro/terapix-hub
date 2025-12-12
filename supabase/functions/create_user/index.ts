// Supabase Edge Function (Deno) - Create User with service_role
// Deploy with: supabase functions deploy create_user
import { serve } from 'std/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') as string;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE') as string;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false }
});

serve(async (req: Request) => {
  try {
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // Validate Authorization header (expect Bearer <access_token>)
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized: missing token' }), { status: 401 });
    }

    // Verify token and fetch user
    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized: invalid token' }), { status: 401 });
    }

    const callerId = userData.user.id;

    // Check user role in DB
    const { data: roleRow, error: roleFetchError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', callerId)
      .single();

    if (roleFetchError || !roleRow) {
      return new Response(JSON.stringify({ error: 'Forbidden: role not found' }), { status: 403 });
    }

    if (roleRow.role !== 'admin') {
      return new Response(JSON.stringify({ error: 'Forbidden: admin only' }), { status: 403 });
    }

    const body = await req.json();
    const { email, password, full_name, role } = body;

    if (!email || !password || !full_name || !role) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Create auth user using admin API (requires service_role key)
    const { data: createdUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name }
    });

    if (createError) {
      return new Response(JSON.stringify({ error: createError.message }), { status: 400 });
    }

    const userId = createdUser?.id;
    if (!userId) {
      return new Response(JSON.stringify({ error: 'Failed to obtain user id' }), { status: 500 });
    }

    // Insert profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      user_id: userId,
      full_name,
      email,
    });

    if (profileError) {
      return new Response(JSON.stringify({ error: profileError.message }), { status: 500 });
    }

    // Insert role
    const { error: roleError } = await supabase.from('user_roles').insert({ user_id: userId, role });
    if (roleError) {
      return new Response(JSON.stringify({ error: roleError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true, userId }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
});
