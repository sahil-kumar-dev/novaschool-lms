import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function GET(request: Request) {

    const token = request.cookies.get('token')?.value

    console.log('token verify route',token)

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken

        // Check if the token is expired
        if (Date.now() >= decoded.exp * 1000) {
            return null
        }

        // Fetch the user from the database
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, accountType: true },
        })

        if (!user) {
            return null
        }

        console.log('verify auth', user)

        return user
    } catch (error) {
        console.error('Error verifying token:', error)
        return null
    }
}


interface DecodedToken {
    userId: string
    iat: number
    exp: number
}