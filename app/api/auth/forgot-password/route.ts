import { PrismaClient } from '@prisma/client'
import { genSalt, } from 'bcryptjs'
import { hash, randomBytes } from 'crypto'
import { NextResponse } from 'next/server'


const prisma = new PrismaClient()

export async function POST(req: Request) {
    const { email } = await req.json()

    // Here you would typically fetch the user from your database

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        )
    }

    // Generate a random password reset token
    const token = randomBytes(20).toString('hex')

    // save token to database

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetPasswordToken: token,
            resetPasswordExpires: new Date(Date.now() + 3600000) // 1 hour
        }
    })
    
    // send email with reset link
    const resetLink = `http://localhost:3000/reset-password?token=${token}`

    const response = NextResponse.json({ success: true })

    return response
}