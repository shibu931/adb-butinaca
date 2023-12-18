import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicPath = ['/login', '/signup', '/verifyemail'].includes(path);
    const isLoggedIn = Boolean(request.cookies.get('token')?.value);

    if (isPublicPath && isLoggedIn) {
        // Redirect logged-in user trying to access login, signup, or verifyemail
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    if (!isPublicPath && !isLoggedIn) {
        // Redirect non-logged-in user trying to access profile or admin
        return NextResponse.redirect(new URL('/login', request.nextUrl));
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