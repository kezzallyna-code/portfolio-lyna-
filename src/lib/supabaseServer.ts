import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();

if (rawKey && /\s/.test(rawKey)) {
  throw new Error('Invalid SUPABASE_SERVICE_ROLE_KEY configuration: multiple credentials or spaces detected. Please ensure exactly one key is configured.');
}
const supabaseServiceRoleKey = rawKey;

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
