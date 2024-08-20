import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
    
    try {
        const { email, password } = await req.json()
        // Here you would typically fetch the user from your database
        const user = await prisma.user.findUnique({ where: { email } })
    
        if (!user) {
            return NextResponse.json(
                {success:false, error: 'User not found' },
                { status: 404 }
            )
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password)
    
        if (!isPasswordValid) {
            return NextResponse.json({success:false,error: 'Email or password incorrect' }, { status: 401 })
        }
    
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })
    
        const response = NextResponse.json({ success: true,message:'Login successful' })
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 // 1 hour
        })
    
        return response
        
    } catch (error) {
        return  NextResponse.json({success:false,error: 'Internal server error' }, { status: 500 })
    }
}