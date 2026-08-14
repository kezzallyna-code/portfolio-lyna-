import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function GET() {
  try {
    // Fetch all experiences
    const { data: experiences, error: fetchError } = await supabaseAdmin
      .from('portfolio_experiences')
      .select('*')
      .like('id', '%-digital-agency');

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (experiences && experiences.length > 1) {
      // Keep the first one, delete the rest
      const idsToDelete = experiences.slice(1).map(exp => exp.id);
      
      const { error: deleteError } = await supabaseAdmin
        .from('portfolio_experiences')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: `Deleted ${idsToDelete.length} duplicate experiences.` });
    }

    return NextResponse.json({ success: true, message: "No duplicates found." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
