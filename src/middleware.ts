import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isApiRoute = path.startsWith('/api/');
  const isAdminRoute = path.startsWith('/admin');
  const isLoginRoute = path === '/admin/login';
  const isAuthApiRoute = path.startsWith('/api/auth/');

  // We only want to protect /admin/* and /api/portfolio (if doing POST)
  // Let's just protect the entire /admin panel except /admin/login
  if (isAdminRoute && !isLoginRoute) {
    const session = request.cookies.get('aether_session');
    
    if (!session?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If a logged in user tries to access the login page, redirect to admin dashboard
  if (isLoginRoute) {
    const session = request.cookies.get('aether_session');
    if (session?.value) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Protect POST requests to /api/portfolio
  if (path === '/api/portfolio' && request.method === 'POST') {
    const session = request.cookies.get('aether_session');
    if (!session?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/portfolio'],
};
