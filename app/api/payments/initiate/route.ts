import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { PrismaClient } from '@prisma/client'
import { verifyAuth } from '@/app/lib/auth'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    const user = await verifyAuth(token!)

    const userId = user?.id

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId } = await req.json()

    try {
        const course = await prisma.course.findUnique({ where: { id: courseId } })

        console.log(course)

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 })
        }

        const options = {
            amount: course.price * 100, // Razorpay expects amount in paise
            currency: "INR",
            receipt: randomUUID(),
        }

        const order = await razorpay.orders.create(options)

        // Store the order details in your database
        await prisma.order.create({
            data: {
                userId,
                courseId,
                amount: course.price,
                razorpayOrderId: order.id,
                status: 'PENDING',
            },
        })

        return NextResponse.json({ orderId: order.id, amount: order.amount })
    } catch (error) {
        console.error('Payment initiation error:', error)
        return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 })
    }
}