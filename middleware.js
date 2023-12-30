import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";
import axios from 'axios';
 
export async function middleware(request) {
    const path = request.nextUrl.pathname
    const isPublicPath = ['/login', '/signup', '/verifyemail'].includes(path);
    const isLoggedIn = Boolean(request.cookies.get('token')?.value);
    const token = request.cookies.get('token')?.value;
   const decodedToken = jwt.decode(token); 

    if (isPublicPath && isLoggedIn) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    if (!isPublicPath && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (path === '/admin' && isLoggedIn) {
      if (decodedToken.email !== 'itzshippu@gmail.com') {
        return NextResponse.redirect(new URL('/admin', request.nextUrl));
      }
  }

}
 
export const config = {
  matcher: [
    '/admin',
    '/profile',
    '/login',
    '/signup',
    '/checkout'
  ],
}