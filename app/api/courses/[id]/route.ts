import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const userId = req.headers.get('x-user-id')

    if(!userId){
        return NextResponse.json({ error: 'User ID not found' }, { status: 400 })
    }

    try {
        const course = await prisma.course.findUnique({
            where: { id: params.id },
            include: {
                sections: {
                    include: {
                        subsections: {
                            select: {
                                id: true,
                                title: true,
                            },
                        },
                    },
                },
                enrollments: {
                    where: { userId },
                },
            },
        })

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 })
        }

        return NextResponse.json({
            ...course,
            isEnrolled: course.enrollments.length > 0,
            enrollments: undefined,
        })
    } catch (error) {
        console.error('Error fetching course details:', error)
        return NextResponse.json({ error: 'Failed to fetch course details' }, { status: 500 })
    }
}