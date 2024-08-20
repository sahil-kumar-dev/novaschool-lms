import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient() 

// Function to handle POST request for login
export async function POST(req: Request) {
    try {
        // Extract email and password from the request body
        const { email, password } = await req.json()
        // Fetch the user from the database based on the provided email
        const user = await prisma.user.findUnique({ where: { email } })

        console.log(user)
    
        // If the user is not found, return a 404 error
        if (!user) {
            return NextResponse.json(
                {success:false, error: 'User not found' },
                { status: 404 }
            )
        }
    
        // Compare the provided password with the user's password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password)
    
        // If the password is invalid, return a 401 error
        if (!isPasswordValid) {
            return NextResponse.json({success:false,error: 'Email or password incorrect' }, { status: 401 })
        }
    
        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })
    
        // Create a response with a success message
        const response = NextResponse.json({ success: true,message:'Login successful' })
        // Set the JWT token as a cookie in the response
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
        // Return a 500 error for any internal server error
        return  NextResponse.json({success:false,error: 'Internal server error' }, { status: 500 })
    }
}