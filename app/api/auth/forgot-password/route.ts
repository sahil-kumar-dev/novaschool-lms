import { PrismaClient } from '@prisma/client'
import { randomBytes } from 'crypto'
import { NextResponse } from 'next/server'


const prisma = new PrismaClient()

// Function to handle POST request for forgot password
export async function POST(req: Request) {
    // Extract email from the request body
    const { email } = await req.json()

    // Fetch the user from the database based on the provided email
    const user = await prisma.user.findUnique({
        where: { email }
    })

    // If the user is not found, return a 404 error
    if (!user) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        )
    }

    // Generate a random password reset token
    const token = randomBytes(20).toString('hex')

    // Update the user in the database with the generated token and set expiration time
    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetPasswordToken: token,
            resetPasswordExpires: new Date(Date.now() + 3600000) // Token expires in 1 hour
        }
    })
    
    // Construct the reset password link to be sent to the user
    const resetLink = `http://localhost:3000/reset-password?token=${token}`

    // Prepare a success response
    const response = NextResponse.json({ success: true })

    // Return the response
    return response
}