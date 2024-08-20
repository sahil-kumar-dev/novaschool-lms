// 'use client'

// import { useState } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useVerifyOtpMutation, useResendOtpMutation } from '@/app/lib/api'
// import OtpVerificationForm from '@/app/components/auth/OtpVerificationForm'

// export default function VerifyOtpPage() {
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const email = searchParams.get('email')
//     const [error, setError] = useState('')

//     const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation()
//     const [resendOtp, { isLoading: isResending }] = useResendOtpMutation()

//     const handleVerifyOtp = async (otp: string) => {
//         if (!email) {
//             setError('Email not found. Please try signing up again.')
//             return
//         }

//         try {

//             const data = await verifyOtp({ email, passowrd fullName, otp }).unwrap()

//             if (data.token) {

//                 localStorage.setItem('token', data.token)
//                 // console.log('executed')
//                 router.push('/dashboard')
//                 // console.log('executed')

//             }
//             else {
//                 setError('Invalid OTP. Please try again.')
//             }
//         } catch (error) {
//             setError('Invalid OTP. Please try again.')
//         }
//     }

//     const handleResendOtp = async () => {
//         if (!email) {
//             setError('Email not found. Please try signing up again.')
//             return
//         }

//         try {
//             await resendOtp({ email }).unwrap()
//             setError('') // Clear any existing errors
//             // Optionally, show a success message
//         } catch (error) {
//             setError('Failed to resend OTP. Please try again.')
//         }
//     }

//     if (!email) {
//         return <div>Invalid request. Please try signing up again.</div>
//     }

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-md">
//                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify your email</h2>
//                 <p className="mt-2 text-center text-sm text-gray-600">
//                     We've sent a code to {email}. Please enter it below.
//                 </p>
//             </div>

//             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//                     <OtpVerificationForm
//                         onSubmit={handleVerifyOtp}
//                         onResend={handleResendOtp}
//                         isVerifying={isVerifying}
//                         isResending={isResending}
//                         error={error}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }