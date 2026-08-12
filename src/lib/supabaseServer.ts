import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Clean the key in case it was accidentally pasted with spaces or duplicates
const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseServiceRoleKey = rawKey.trim().split(/\s+/)[0] || '';

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
