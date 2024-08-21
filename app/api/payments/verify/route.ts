import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'
import { verifyAuth } from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    const user = await verifyAuth(token!)

    const userId = user?.id

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = await req.json()

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(body.toString())
        .digest('hex')

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
        try {
            // Update order status
            await prisma.order.update({
                where: { razorpayOrderId: razorpay_order_id },
                data: { status: 'COMPLETED', razorpayPaymentId: razorpay_payment_id },
            })

            // Create enrollment
            await prisma.enrollment.create({
                data: {
                    userId,
                    courseId,
                },
            })

            return NextResponse.json({ success: true })
        } catch (error) {
            console.error('Error updating order and creating enrollment:', error)
            return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
}