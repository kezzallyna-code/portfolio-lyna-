import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    // In a real application, you would compare hashes. 
    // Since we want zero-config for the portfolio, we'll use a hardcoded fallback
    // To make it secure, the user should change this value in their Vercel environment variables or .env.local
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      response.cookies.set('aether_session', 'authenticated_user_session_token', {
        httpOnly: true,
        secure: false, // Set to false to ensure it works on local IPs and http
        sameSite: 'lax', // Relaxed to ensure redirects work reliably
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
