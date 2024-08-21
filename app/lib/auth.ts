import { jwtVerify, SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function verifyAuth(token: string): Promise<{ id: string; email: string; accountType: string } | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        return payload as { id: string; email: string; accountType: string }
    } catch (error) {
        console.error('Error verifying token:', error)
        return null
    }
}

export async function generateToken(payload: { id: string; email: string; accountType: string }): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(JWT_SECRET)
}