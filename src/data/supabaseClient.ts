import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

if (rawAnonKey && /\s/.test(rawAnonKey)) {
  console.error('Invalid NEXT_PUBLIC_SUPABASE_ANON_KEY configuration: multiple credentials or spaces detected.');
  // In a client component, throwing at module level might crash the app, but since this is severe:
  throw new Error('Invalid NEXT_PUBLIC_SUPABASE_ANON_KEY configuration: multiple credentials detected.');
}
const supabaseKey = rawAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (url, options) => {
      return fetch(url, { ...options, cache: 'no-store' });
    }
  }
});
