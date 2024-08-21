'use client'

import { useGetCourseDetailsQuery } from '@/app/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from 'next/link'

export default function CourseDetails({ params }: { params: { id: string } }) {
    const { data: course, isLoading } = useGetCourseDetailsQuery(params.id)

    if (isLoading) {
        return <Loader2 className="h-8 w-8 animate-spin" />
    }

    if (!course) {
        return <div>Course not found</div>
    }

    return (
        <div className="container mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <p className="text-lg font-bold mb-4">Price: ₹{course.price}</p>
                    <h3 className="text-xl font-semibold mb-2">Course Content:</h3>
                    <ul className="list-disc pl-5 mb-4">
                        {course.sections.map((section) => (
                            <li key={section.id}>
                                {section.title}
                                <ul className="list-circle pl-5">
                                    {section.subsections.map((subsection) => (
                                        <li key={subsection.id}>{subsection.title}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                    {course.isEnrolled ? (
                        <Link href={`/dashboard/courses/${course.id}`}>
                            <Button>Go to Course</Button>
                        </Link>
                    ) : (
                        <Button>Purchase Course</Button>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}