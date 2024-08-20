import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import {compare, hash} from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { email, otp, fullName, password }:{email:string,otp:string,fullName:string,password:string} = await req.json()

        const savedOtp = await prisma.otp.findUnique({ where: { email } })

        const compareOtp = await compare(otp, savedOtp!.otp)

        if (!savedOtp || !compareOtp || savedOtp.otpExpires < new Date()) {
            return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
        }

        const hashedPassword = await hash(password, 10)

        // add thumbnail according to the name

        const firstName = fullName.split(' ')[0]
        const lastName = fullName.includes(' ') ? fullName.split(' ')[1] : ''

        const thumbnail = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`

        // Activate user
        const user = await prisma.user.create({
            data: {
                email,
                fullName,
                password:hashedPassword,
                thumbnail:thumbnail
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