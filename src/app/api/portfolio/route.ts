import { NextResponse } from 'next/server';
import { getPortfolioData, updatePortfolioData } from '@/data/repository';

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

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error('Invalid JSON payload in portfolio route:', error);
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  try {
    await updatePortfolioData(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST Error in portfolio route:', error);
    return NextResponse.json({ error: 'Failed to update portfolio data' }, { status: 500 });
  }
}
