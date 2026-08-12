import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('aether_session')?.value;
  const isLoginPage = request.nextUrl.pathname === '/admin/login';

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      if (!isLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else {
      // Token exists, verify it
      const payload = await verifyToken(token);
      
      if (!payload) {
        // Invalid token
        if (!isLoginPage) {
          return NextResponse.redirect(new URL('/admin/login', request.url));
        }
      } else {
        // Valid token
        if (isLoginPage) {
          // If on login page with valid token, redirect to dashboard
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
