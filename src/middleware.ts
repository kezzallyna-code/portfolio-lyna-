import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isLoginRoute = path === '/admin/login';

  // If anyone tries to access the login page, redirect to admin dashboard since password protection is removed
  if (isLoginRoute) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // All other routes are allowed
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/portfolio'],
};
