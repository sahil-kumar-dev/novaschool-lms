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

    const { data: profile, isLoading, error } = useGetProfileQuery();
    // useEffect(() => {
    //   setProfile(profile);
    //   setIsLoading(isLoading)
    // }, [isLoading]);



    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading profile</div>

    return (
        <div className="content mx-auto mt-10 p-6 bg-white rounded-lg shadow-md max-w-4xl">
            <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={profile?.thumbnail} alt={profile?.fullName} />
                    <AvatarFallback>{profile?.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold text-black">Your Profile</h1>
                </div>
            </div>
            <div className="mb-6">
                {/* <div> */}
                    <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                    <div className="space-y-2 grid md:grid-cols-2 w-full gap-4 mt-10">
                        <p className='capitalize'><strong>Name:</strong> {profile?.fullName}</p>
                        <p><strong>Email:</strong> {profile?.email}</p>
                        <p><strong>Mobile:</strong> {profile?.mobileNumber || 'Not provided'}</p>
                        <p><strong>Account Type:</strong> {profile?.accountType}</p>
                    </div>
                {/* </div> */}
            </div>
            <Button
                onClick={() => router.push('/profile/edit')}
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Edit Profile
            </Button>
        </div>
    )
}