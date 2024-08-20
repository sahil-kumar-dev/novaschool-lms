'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/app/lib/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EditProfilePage() {
    const router = useRouter()
    const { data: profile, isLoading } = useGetProfileQuery()
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

    const [fullName, setFullName] = useState(profile?.fullName || '')
    const [mobileNumber, setMobileNumber] = useState(profile?.mobileNumber || '')
    const [photo, setPhoto] = useState<File | null>(null)

    if (isLoading) return <div>Loading...</div>

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('fullName', fullName)
        formData.append('mobileNumber', mobileNumber)
        if (photo) {
            formData.append('photo', photo)
        }

        try {
            await updateProfile(formData).unwrap()
            router.push('/profile')
        } catch (error) {
            console.error('Failed to update profile:', error)
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={profile?.thumbnail} alt={profile?.fullName} />
                        <AvatarFallback>{profile?.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                    />
                </div>
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                        Mobile Number
                    </label>
                    <Input
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                </div>
                <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                </Button>
            </form>
        </div>
    )
}