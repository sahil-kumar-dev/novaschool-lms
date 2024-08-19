import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export function getUser() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (!token) {
        return null
    }

    try {
        const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'secret') as { userId: string }
        return decoded.userId
    } catch (error) {
        return null
    }
}