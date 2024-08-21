import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const userId = req.headers.get('x-user-id')

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const course = await prisma.course.findUnique({
            where: { id: params.id },
        })

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 })
        }

        // Check if the user is already enrolled
        const existingEnrollment = await prisma.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId: params.id,
                },
            },
        })

        if (existingEnrollment) {
            return NextResponse.json({ error: 'Already enrolled in this course' }, { status: 400 })
        }

        // Create enrollment
        await prisma.enrollment.create({
            data: {
                userId,
                courseId: params.id,
            },
        })

        return NextResponse.json({ message: 'Course purchased successfully' })
    } catch (error) {
        console.error('Error purchasing course:', error)
        return NextResponse.json({ error: 'Failed to purchase course' }, { status: 500 })
    }
}