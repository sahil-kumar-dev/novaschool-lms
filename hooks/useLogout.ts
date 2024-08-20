import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLogoutMutation } from '@/app/lib/api'
import { resetApiState } from '@/app/lib/api'
import { useDispatch } from 'react-redux'

export function useLogout() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [logoutMutation] = useLogoutMutation()

    const logout = useCallback(async () => {
        try {
            await logoutMutation().unwrap()
            // Clear any client-side auth state
            localStorage.removeItem('token') // If you're storing the token in localStorage
            // Reset the RTK Query cache
            dispatch(resetApiState())
            // Redirect to login page
            router.push('/')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }, [logoutMutation, dispatch, router])

    return logout
}