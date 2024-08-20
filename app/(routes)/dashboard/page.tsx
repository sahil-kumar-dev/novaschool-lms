'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Component() {
    const router = useRouter()

    const handleLogout = async () => {
        const response = await fetch('/api/auth/logout', { method: 'POST' })
        if (response.ok) {
            router.push('/login')
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mx-auto flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/courses" className="text-indigo-600 hover:text-indigo-800">
                                    Browse All Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/my-courses" className="text-indigo-600 hover:text-indigo-800">
                                    My Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile" className="text-indigo-600 hover:text-indigo-800">
                                    Edit Profile
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                        <p>No recent activity</p>
                    </div>
                </div>
            </div>
        </div>
    )
}