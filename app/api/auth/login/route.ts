import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    const { email, password } = await req.json()

    // Here you would typically fetch the user from your database
    const user = { id: '1', email, password: await bcrypt.hash('password', 10) }

    if (!user) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })

    const response = NextResponse.json({ success: true })
    response.cookies.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 // 1 hour
    })

    return response
}