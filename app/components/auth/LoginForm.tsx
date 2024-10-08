'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLoginMutation } from '@/app/lib/api'
import { toast } from 'sonner'

export default function Component() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const [login, { isLoading, isError }] = useLoginMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await login({ email, password }).unwrap()
            if (result.success) {
                router.push(result.redirectUrl)
            }
        } catch (error) {
            console.error('Failed to log in:', error)
            // Handle login error (show error message to user)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {isLoading ? 'Logging In' : 'Login'}
            </button>
        </form>
    )
}
