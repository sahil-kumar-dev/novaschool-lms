import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = await generateToken({ id: user.id, email: user.email, accountType: user.accountType })

    const response = NextResponse.json({
        success: true,
        redirectUrl: user.accountType === 'ADMIN' ? '/admin/dashboard' : '/dashboard'
    })

    response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400 // 1 day
    })

    return response
}