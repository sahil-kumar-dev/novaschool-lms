'use client'

import { motion } from 'framer-motion'
import LoginForm from '@/app/components/auth/LoginForm'

export default function LoginContent() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full"
            >
                <div className="p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                        <p className="text-gray-600 mt-2">Enter your credentials to access your account</p>
                    </motion.div>

                    <LoginForm />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                Sign up
                            </a>
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-indigo-100 p-4"
                >
                    <p className="text-sm text-indigo-800 text-center">
                        Secure login powered by Next.js and JWT
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}