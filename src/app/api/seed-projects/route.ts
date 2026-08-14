import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function GET() {
  const newExperience = {
    id: Date.now().toString() + "-digital-agency",
    role: "Web Developer & AI Solutions",
    company: "Digital Agency (Algeria / Remote)",
    duration: "2025 – Present",
    is_current: true,
    description: "Working on the design and development of modern websites and digital solutions for clients. Building responsive web interfaces, integrating AI-powered features, creating portfolio/business websites, and collaborating on client projects from concept to deployment."
  };

  try {
    const { error } = await supabaseAdmin.from('portfolio_experiences').insert([newExperience]);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Successfully injected the experience!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
