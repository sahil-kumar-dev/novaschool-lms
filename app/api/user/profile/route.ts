import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getUser } from '@/app/lib/auth'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

// Function to handle GET request for user profile
export async function GET() {
    // Retrieve the user from the session
    const user = getUser()

    // If no user is found, return an unauthorized error
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Fetch user details from the database
        const userDetails = await prisma.user.findUnique({
            where: { id: user },
            select: {
                fullName: true,
                email: true,
                thumbnail: true,
                mobileNumber: true,
                accountType: true,
            },
        })

        // Return the user details
        return NextResponse.json(userDetails)
    } catch (error) {
        // Log the error if fetching user details fails
        console.error('Profile fetch error:', error)
        // Return an error response
        return NextResponse.json({ error: 'An error occurred while fetching the profile' }, { status: 500 })
    }
}

// Function to handle PUT request for updating user profile
export async function PUT(req: Request) {
    // Retrieve the user from the session
    const user = getUser()

    // If no user is found, return an unauthorized error
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Parse the request form data
        const formData = await req.formData()
        const fullName = formData.get('fullName') as string
        const mobileNumber = formData.get('mobileNumber') as string
        const photo = formData.get('photo') as File | null

        // Split the full name into first and last names
        const firstName = fullName.split(' ')[0]
        const lastName = fullName.includes(' ') ? fullName.split(' ')[1] : ''

        // Generate a default thumbnail URL if no photo is provided
        let thumbnail = undefined || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
        // If a photo is provided, set the thumbnail to the uploaded photo path
        if (photo) {
            thumbnail = '/path/to/uploaded/photo.jpg'
        }

        // Update the user details in the database
        const updatedUser = await prisma.user.update({
            where: { id: user },
            data: {
                fullName,
                mobileNumber,
                ...(thumbnail && { thumbnail }),
            },
        })

        // Revalidate the profile path to ensure the updated profile is reflected
        revalidatePath('/profile')
        // Return a success message
        return NextResponse.json({ message: 'Profile updated successfully' })

    } catch (error) {
        // Log the error if updating user profile fails
        console.error('Profile update error:', error)
        // Return an error response
        return NextResponse.json({ error: 'An error occurred while updating the profile' }, { status: 500 })
    }
}