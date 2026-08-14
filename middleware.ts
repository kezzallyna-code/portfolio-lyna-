import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  // Only apply to /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Exclude the login page and API auth routes from protection
    if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname.startsWith('/api/auth')) {
      return NextResponse.next();
    }
    
    const sessionCookie = request.cookies.get('aether_session')?.value;
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      // Verify JWT at the edge
      // Note: Edge middleware requires using standard Web Crypto API which 'jose' supports
      const secretKey = process.env.JWT_SECRET;
      
      if (!secretKey) {
        // If no secret is configured, deny access as a failsafe
        console.error('JWT_SECRET is missing in environment variables');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      
      const secret = new TextEncoder().encode(secretKey);
      await jwtVerify(sessionCookie, secret);
      
      return NextResponse.next();
    } catch (err) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all admin and api routes, except static assets
  matcher: [
    '/admin/:path*',
  ],
};
