import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { sendOtp } from '@/app/lib/mail'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { email }: { email: string } = await req.json()

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        // Hash password
        // const hashedPassword = await hash(password, 12)

        // Create user (but don't activate yet)

        const userOtp = await prisma.otp.findUnique({ where: { email } })

        if (userOtp) {
            await prisma.otp.delete({ where: { email } })
        }

        await prisma.otp.create({
            data: {
                email,
                otp,
                otpExpires: new Date(Date.now() + 10 * 60 * 1000), // OTP expires in 10 minutes
            },
        })

        console.log(otp)
        // Send OTP email
        await sendOtp(email, otp)

        return NextResponse.json({ message: 'Signup successful. Please check your email for OTP.' })
    } catch (error) {
        console.error('Signup error:', error)
        return NextResponse.json({ error: 'An error occurred during signup' }, { status: 500 })
    }
}