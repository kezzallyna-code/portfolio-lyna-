import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function GET() {
  const { data, error } = await supabaseAdmin.from('portfolio_projects').select('*');
  return NextResponse.json({ data, error });
}
