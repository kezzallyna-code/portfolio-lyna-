import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginRoute = path === '/admin/login';
  
  // Skip middleware for public static files
  if (path.includes('.')) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('aether_session')?.value;
  const session = sessionCookie ? await verifyToken(sessionCookie) : null;

  // Protect Admin UI
  if (path.startsWith('/admin')) {
    if (!isLoginRoute && !session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (isLoginRoute && session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Protect Admin API Routes (defense in depth)
  if ((path.startsWith('/api/portfolio') && request.method !== 'GET') || path.startsWith('/api/upload')) {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/portfolio', '/api/upload'],
};
