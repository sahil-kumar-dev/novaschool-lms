'use client'

import { useRouter } from 'next/navigation'
import { useGetProfileQuery } from '@/app/lib/api'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from 'react'

export default function ProfilePage() {
    const router = useRouter()
    interface ProfileData {
      fullName: string;
      email: string;
      thumbnail: string;
      mobileNumber: string;
      accountType: string;
    }

    // const [profile, setProfile] = useState<ProfileData | undefined>(undefined);
    // const [isLoading, setIsLoading] = useState(false)

    const { data:profile, isLoading, error } = useGetProfileQuery();
    // useEffect(() => {
    //   setProfile(profile);
    //   setIsLoading(isLoading)
    // }, [isLoading]);
    


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading profile</div>

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
            <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.thumbnail} alt={profile?.fullName} />
                    <AvatarFallback>{profile?.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xl font-semibold">{profile?.fullName}</h2>
                    <p className="text-gray-600">{profile?.email}</p>
                </div>
            </div>
            <div className="space-y-2">
                <p><strong>Mobile:</strong> {profile?.mobileNumber || 'Not provided'}</p>
                <p><strong>Account Type:</strong> {profile?.accountType}</p>
            </div>
            <Button
                onClick={() => router.push('/profile/edit')}
                className="mt-6"
            >
                Edit Profile
            </Button>
        </div>
    )
}