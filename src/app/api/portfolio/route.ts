import { NextResponse } from 'next/server';
import { getPortfolioData, updatePortfolioData } from '@/data/repository';

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load portfolio data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await updatePortfolioData(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio data' }, { status: 500 });
  }
}
