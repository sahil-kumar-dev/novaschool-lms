'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, User, Lock } from 'lucide-react'
import { useSignupMutation, useVerifyOtpMutation } from '@/app/lib/api'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignupForm() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
    const [error, setError] = useState('')

    const [signup, { isLoading: isSigningUp }] = useSignupMutation()
    const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            await signup({ email }).unwrap()
            setIsOtpModalOpen(true)
        } catch (err) {
            setError('Failed to sign up. Please try again.')
        }
    }

    const handleVerifyOtp = async () => {
        try {
            await verifyOtp({ email, otp, fullName,password }).unwrap()
            router.push('/dashboard')
        } catch (err) {
            setError('Invalid OTP. Please try again.')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="pl-10"
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pl-10"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                    type="submit"
                    disabled={isSigningUp}
                    className="w-full"
                >
                    {isSigningUp ? 'Signing up...' : 'Sign up'}
                </Button>
            </form>

            <Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter OTP</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>Please enter the OTP sent to your email.</p>
                        <Input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                        />
                        <Button onClick={handleVerifyOtp} disabled={isVerifying} className="w-full">
                            {isVerifying ? 'Verifying...' : 'Verify OTP'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}