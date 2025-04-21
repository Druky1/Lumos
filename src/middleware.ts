import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Try to get the user's session token
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Define protected routes (paths that require authentication)
  const isProtectedRoute = path.startsWith('/dashboard');
  
  // Define authentication routes (paths for non-authenticated users)
  const isAuthRoute = path === '/sign-in' || path === '/sign-up';
  
  // Redirect authenticated users trying to access auth routes
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect unauthenticated users trying to access protected routes
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/sign-in', request.url);
    redirectUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
}


export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/sign-in', 
    '/sign-up'
  ]
};