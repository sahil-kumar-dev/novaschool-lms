import { getUser } from '@/app/lib/auth'
import { redirect } from 'next/navigation'

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
    const user = getUser()

    if (user) {
        redirect('/dashboard')
    }

    return <>{children}</>
}