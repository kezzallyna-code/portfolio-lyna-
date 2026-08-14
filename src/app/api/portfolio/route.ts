import { NextResponse } from 'next/server';
import { getPortfolioData, updatePortfolioData } from '@/data/repository';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET Error in portfolio route:', error);
    return NextResponse.json({ error: 'Failed to load portfolio data' }, { status: 500 });
  }
}

// Minimal schema since portfolio data is complex.
// If needed, we can expand it, but we enforce object type.
const updateSchema = z.record(z.string(), z.any());

export async function POST(request: Request) {
  try {
    // 1. Authenticate Request
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('aether_session')?.value;
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifyToken(sessionCookie);
    if (!session) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    // 2. Parse and Validate Request Body
    const body = await request.json();
    const result = updateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid payload format', details: result.error }, { status: 400 });
    }

    // 3. Perform update
    await updatePortfolioData(result.data as any);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('POST Error in portfolio route:', error);
    return NextResponse.json({ error: 'Failed to update portfolio data', message: error.message }, { status: 500 });
  }
}
