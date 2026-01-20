// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if user is authenticated by checking for auth token
  const isAuthenticated = request.cookies.get('auth-token') ||
                         request.cookies.get('better-auth.session_token') ||
                         request.headers.get('authorization');

  // Define protected paths that require authentication
  const isProtectedPath =
    request.nextUrl.pathname.startsWith('/tasks');
    // Note: /dashboard is now accessible for testing

  // Redirect to login if trying to access protected path without authentication
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login and signup (public routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|_next|login|signup).*)',
  ],
};