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
        <div className="px-4 md:px-0">
            <div className="content p-4 md:p-6 lg:p-9 bg-white rounded-xl shadow-xl space-y-10 my-10 md:my-20">
                <div className="flex gap-4 md:gap-10 items-center flex-col-reverse md:flex-row ">
                    <Avatar className="size-16">
                        <AvatarImage src={profile?.thumbnail} alt={profile?.fullName} />
                        <AvatarFallback>{profile?.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h1 className='text-gray-900 text-xl md:text-2xl md:leading-8 font-bold'>My Profile</h1>
                </div>
                <div className="">
                    <div className="grid md:grid-cols-2 gap-y-5 md:gap-y-9 md:gap-x-5">
                        <div className="border w-full h-10 border-gray-300 rounded-lg flex items-center pl-4 relative">
                            <p className='capitalize font-medium text-gray-400 text-lg'>{profile?.fullName.split(' ')[0]}</p>
                            <p className='absolute top-0 -translate-y-1/2 bg-white px-1 text-sm text-gray-300'>First Name</p>
                        </div>
                        <div className="border w-full h-10 border-gray-300 rounded-lg flex items-center pl-4 relative">
                            <p className='capitalize font-medium text-gray-400 text-lg'>{profile?.fullName.split(' ')[1]}</p>
                            <p className='absolute top-0 -translate-y-1/2 bg-white px-1 text-sm text-gray-300'>Last Name</p>
                        </div>
                        <div className="border w-full h-10 border-gray-300 rounded-lg flex items-center pl-4 relative">
                            <p className=' font-medium text-gray-400 text-lg'>{profile?.email}</p>
                            <p className='absolute top-0 -translate-y-1/2 bg-white px-1 text-sm text-gray-300'>Email</p>
                        </div>
                        <div className="border w-full h-10 border-gray-300 rounded-lg flex items-center pl-4 relative">
                            <p className=' font-medium text-gray-400 text-lg'>{profile?.mobileNumber ? profile?.mobileNumber : 'N/A'}</p>
                            <p className='absolute top-0 -translate-y-1/2 bg-white px-1 text-sm text-gray-300'>Phone Number</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => router.push('/profile/edit')}
                        className="mt-6 bg-black hover:bg-black/60 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit Profile
                    </Button>
                </div>
                {/* <div className="flex items-center space-x-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-black">Your Profile</h1>
                </div>
            </div>
            <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                    <div className="space-y-2 grid md:grid-cols-2 w-full gap-4 mt-10">
                        <p className='capitalize'><strong>Name:</strong> {profile?.fullName}</p>
                        <p><strong>Email:</strong> {profile?.email}</p>
                        <p><strong>Mobile:</strong> {profile?.mobileNumber || 'Not provided'}</p>
                        <p><strong>Account Type:</strong> {profile?.accountType}</p>
                    </div>
            </div>
            <Button
                onClick={() => router.push('/profile/edit')}
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Edit Profile
            </Button> 
            */}

            </div>
        </div>
    )
}