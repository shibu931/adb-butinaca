import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicPath = ['/login', '/signup', '/verifyemail'].includes(path);
    const isLoggedIn = Boolean(request.cookies.get('token')?.value);

    if (isPublicPath && isLoggedIn) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    if (!isPublicPath && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (path === '/admin' && !isAdmin) {
      return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

}
 
export const config = {
  matcher: [
    '/admin',
    '/profile',
    '/login',
    '/signup',
  ],
}