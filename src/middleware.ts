import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isLoginRoute = path === '/admin/login';
  
  // Skip middleware for API routes and static files
  if (path.startsWith('/api') || path.includes('.')) {
    return NextResponse.next();
  }

  const session = request.cookies.get('aether_session')?.value;

  if (path.startsWith('/admin') && !isLoginRoute && !session) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginRoute && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/portfolio'],
};
