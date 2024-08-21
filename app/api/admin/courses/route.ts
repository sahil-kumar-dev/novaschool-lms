import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    const requestHeaders = new Headers(request.headers)

    const accountType = requestHeaders.get('x-user-account-type')
    const userId = requestHeaders.get('x-user-id')


    if (accountType !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const formData = await request.formData()
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const price = parseFloat(formData.get('price') as string)
        const thumbnail = formData.get('thumbnail') as File

        // Handle file upload (thumbnail) here
        // For this example, we'll assume it's stored and we have a URL
        const thumbnailUrl = '/assets/backend.png'

        const course = await prisma.course.create({
            data: {
                title,
                description,
                price,
                thumbnail: thumbnailUrl,
                authorId: userId!,
            },
        })

        return NextResponse.json(course)
    } catch (error) {
        console.error('Error creating course:', error)
        return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
    }
}