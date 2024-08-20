import { useState } from 'react'
import { motion } from 'framer-motion'

type OtpVerificationFormProps = {
    onSubmit: (otp: string) => void
    onResend: () => void
    isVerifying: boolean
    isResending: boolean
    error: string
}

export default function OtpVerificationForm({
    onSubmit,
    onResend,
    isVerifying,
    isResending,
    error,
}: OtpVerificationFormProps) {
    const [otp, setOtp] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(otp)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    Enter OTP
                </label>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter 6-digit code"
                />
            </div>

            <motion.button
                type="submit"
                disabled={isVerifying}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </motion.button>

            <div className="text-center">
                <motion.button
                    type="button"
                    onClick={onResend}
                    disabled={isResending}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                    {isResending ? 'Resending...' : 'Resend OTP'}
                </motion.button>
            </div>
        </form>
    )
}