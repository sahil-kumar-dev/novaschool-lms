import { useState, useEffect } from 'react'
import { useInitiatePaymentMutation, useVerifyPaymentMutation } from '@/app/lib/api'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
// import { useToast } from "@/components/ui/use-toast"

declare global {
    interface Window {
        Razorpay: any;
    }
}

type PurchaseModalProps = {
    course: {
        id: string
        title: string
        price: number
    }
    onClose: () => void
}

export default function PurchaseModal({ course, onClose }: PurchaseModalProps) {
    const [initiatePayment, { isLoading: isInitiating }] = useInitiatePaymentMutation()
    const [verifyPayment, { isLoading: isVerifying }] = useVerifyPaymentMutation()
    // const { toast } = useToast()

    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        document.body.appendChild(script)
        return () => {
            if (script) {
                document.body.removeChild(script)
            }
        }
    }, [])

    const handlePurchase = async () => {
        try {
            const { orderId, amount } = await initiatePayment({ courseId: course.id }).unwrap()

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amount,
                currency: "INR",
                name: "Your LMS",
                description: `Purchase ${course.title}`,
                order_id: orderId,
                handler: async function (response: any) {
                    try {
                        await verifyPayment({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            courseId: course.id
                        }).unwrap()

                        // toast({
                        //     title: "Course purchased successfully!",
                        //     description: `You now have access to ${course.title}`,
                        // })
                        toast.success(`You now have access to ${course.title}`)
                        onClose()
                    } catch (error) {
                        // toast({
                        //     title: "Payment verification failed",
                        //     description: "There was an error verifying your payment. Please contact support.",
                        //     variant: "destructive",
                        // })
                        toast.error("There was an error verifying your payment. Please contact support.")
                    }
                },
                prefill: {
                    name: "User Name",
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
            // toast({
            //     title: "Payment initiation failed",
            //     description: "There was an error initiating your payment. Please try again.",
            //     variant: "destructive",
            // })

            console.log(error)
            toast.error("There was an error initiating your payment. Please try again.")
        }
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Purchase</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to purchase {course.title} for ₹{course.price}?</p>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handlePurchase} disabled={isInitiating || isVerifying}>
                        {isInitiating ? 'Initiating Payment...' : isVerifying ? 'Verifying Payment...' : 'Confirm Purchase'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}