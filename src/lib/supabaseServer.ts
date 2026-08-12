import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

// Automatically extract the first valid JWT to handle malformed Vercel environment variables
const matchKey = rawKey.match(/(eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+)/);
const supabaseServiceRoleKey = matchKey ? matchKey[0] : rawKey;

export const supabaseAdmin = createClient(supabaseUrl || 'https://dummy.supabase.co', supabaseServiceRoleKey || 'dummy', {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  global: {
    fetch: (...args) => {
      if (!supabaseServiceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set. This is required for secure administrative operations.');
      }
      return fetch(...args);
    }
  }
});
