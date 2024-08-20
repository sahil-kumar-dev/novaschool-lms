import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
// import { getServerSession } from 'next-auth/next'
import { getUser } from '@/app/lib/auth'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function GET() {
    const user = getUser()

    console.log(user)

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
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

        return NextResponse.json(userDetails)
    } catch (error) {
        console.error('Profile fetch error:', error)
        return NextResponse.json({ error: 'An error occurred while fetching the profile' }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    const user = getUser()

    console.log(user)

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await req.formData()
        const fullName = formData.get('fullName') as string
        const mobileNumber = formData.get('mobileNumber') as string
        const photo = formData.get('photo') as File | null

        const firstName = fullName.split(' ')[0]
        const lastName = fullName.includes(' ') ? fullName.split(' ')[1] : ''


        let thumbnail = undefined || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
        if (photo) {
            thumbnail = '/path/to/uploaded/photo.jpg'
        }

        const updatedUser = await prisma.user.update({
            where: { id: user },
            data: {
                fullName,
                mobileNumber,
                ...(thumbnail && { thumbnail }),
            },
        })

        revalidatePath('/profile')
        return NextResponse.json({ message: 'Profile updated successfully' })

    } catch (error) {
        console.error('Profile update error:', error)
        return NextResponse.json({ error: 'An error occurred while updating the profile' }, { status: 500 })
    }
}