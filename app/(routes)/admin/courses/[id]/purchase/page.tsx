'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetCourseQuery, useInitiatePaymentMutation } from '@/app/lib/api'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PurchaseCourse({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { data: course, isLoading } = useGetCourseQuery(params.id)
    const [initiatePayment] = useInitiatePaymentMutation()
    const [isProcessing, setIsProcessing] = useState(false)

    const handlePurchase = async () => {
        setIsProcessing(true)
        try {
            const { orderId, amount } = await initiatePayment({ courseId: params.id }).unwrap()

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amount,
                currency: "INR",
                name: "Your LMS",
                description: `Purchase ${course?.title}`,
                order_id: orderId,
                handler: async function (response: any) {
                    // Handle successful payment
                    // await verifyPayment({
                    //     razorpay_payment_id: response.razorpay_payment_id,
                    //     razorpay_order_id: response.razorpay_order_id,
                    //     razorpay_signature: response.razorpay_signature
                    // })
                    router.push(`/courses/${params.id}`)
                },
                prefill: {
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        } catch (error) {
            console.error('Payment initiation failed:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    if (isLoading) {
        return <Loader2 className="h-8 w-8 animate-spin" />
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Purchase Course</h1>
            <Card>
                <CardHeader>
                    <CardTitle>{course?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">{course?.description}</p>
                    <p className="text-2xl font-bold mb-4">Price: ₹{course?.price}</p>
                    <Button onClick={handlePurchase} disabled={isProcessing}>
                        {isProcessing ? 'Processing...' : 'Purchase Now'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}