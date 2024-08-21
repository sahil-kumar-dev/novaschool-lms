import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import {compare, hash} from 'bcryptjs'
import { randomUUID } from 'crypto'
import { generateToken } from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        const { email, otp, fullName, password }:{email:string,otp:string,fullName:string,password:string} = await req.json()

        // Check if the OTP is valid and not expired
        const savedOtp = await prisma.otp.findUnique({ where: { email } })
        if (!savedOtp) {
            return NextResponse.json({ error: 'No OTP found for this email' }, { status: 404 })
        }

        const compareOtp = await compare(otp, savedOtp.otp)
        if (!compareOtp) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
        }

        if (savedOtp.otpExpires < new Date()) {
            return NextResponse.json({ error: 'OTP has expired' }, { status: 400 })
        }

        // Hash the password for user creation
        const hashedPassword = await hash(password, 10)

        // Generate a thumbnail based on the full name
        const firstName = fullName.split(' ')[0]
        const lastName = fullName.includes(' ') ? fullName.split(' ')[1] : ''
        const thumbnail = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`

        // Create a new user with the provided details
        const user = await prisma.user.create({
            data: {
                id:randomUUID(),
                email,
                fullName,
                password: hashedPassword,
                thumbnail: thumbnail
            }
        })

        // Generate a JWT token for the user
        // const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' })
        const token = generateToken(user.id)

        // Set the JWT token as a cookie in the response
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