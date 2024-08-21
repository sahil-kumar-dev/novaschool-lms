import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { verifyAuth } from './app/lib/auth'

const prisma = new PrismaClient()

interface DecodedToken {
    userId: string
    iat: number
    exp: number
}

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value


    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const user = await verifyAuth(token)

    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    console.log('middleware', user)

    // Check for admin routes
    if (request.nextUrl.pathname.startsWith('/admin') && user.accountType !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify(user))
    requestHeaders.set('x-user-id', user.id)
    requestHeaders.set('x-user-email', user.email)
    requestHeaders.set('x-user-account-type', user.accountType)

    console.log(requestHeaders)

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/api/admin/:path*', '/profile/:path*'],
}