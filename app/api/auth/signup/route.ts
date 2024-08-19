import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    const { name, email, password } = await req.json()

    // Here you would typically check if the user already exists in your database
    // For this example, we'll just create a new user

    const hashedPassword = await bcrypt.hash(password, 10)

    // Here you would typically save the user to your database
    const user = { id: '1', name, email, password: hashedPassword }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })

    return NextResponse.json({ token })
}