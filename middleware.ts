import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value


    // If the user is logged in and trying to access login or signup pages
    if (token && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // If the user is not logged in and trying to access dashboard or courses pages
    if (!token && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/signup')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/courses/:path*','/profile:path*'],
}