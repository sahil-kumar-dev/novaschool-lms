import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
    try {
        const courses = await prisma.course.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
            },
        })

        return NextResponse.json(courses)
    } catch (error) {
        console.error('Error fetching courses:', error)
        return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
    }
}