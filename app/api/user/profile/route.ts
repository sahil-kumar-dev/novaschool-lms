import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { verifyAuth } from '@/app/lib/auth'

const prisma = new PrismaClient()

// Function to handle GET request for user profile
export async function GET(request: NextRequest) {
    // Retrieve the user from the session

    const token = request.cookies.get('token')?.value

    const user = await verifyAuth(token!)

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Fetch user details from the database
        const userDetails = await prisma.user.findUnique({
            where: { id: user.id },
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
export async function PUT(request: Request) {
    // Retrieve the user from the session

    const token = request.cookies.get('token')?.value

    const user :{ id:string,email:string,acccountType:string} = await verifyAuth(token!)

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }


    try {
        // Parse the request form data
        const formData = await request.formData()
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
            where: { id: user.id },
            data: {
                fullName,
                mobileNumber,
                ...(thumbnail && { thumbnail }),
            },
        })

        // Revalidate the profile path to ensure the updated profile is reflected
        // Return a success message
        return NextResponse.json({ message: 'Profile updated successfully' })

    } catch (error) {
        // Log the error if updating user profile fails
        console.error('Profile update error:', error)
        // Return an error response
        return NextResponse.json({ error: 'An error occurred while updating the profile' }, { status: 500 })
    }
}