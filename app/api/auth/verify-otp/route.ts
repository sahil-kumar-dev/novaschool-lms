import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { email, otp, fullName,password } = await req.json()

        const savedOtp = await prisma.otp.findUnique({ where: { email } })



        if (!savedOtp || savedOtp.otp !== otp || savedOtp.otpExpires < new Date()) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
        }

        // Activate user
        const user = await prisma.user.create({
            data: {
                email,
                fullName,
                password,
            }
        })

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' })

        const response = NextResponse.json({ message: 'OTP verified successfully' })
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400 // 1 day
        })

        return response
    } catch (error) {
        console.error('OTP verification error:', error)
        return NextResponse.json({ error: 'An error occurred during OTP verification' }, { status: 500 })
    }
}