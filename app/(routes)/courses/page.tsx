'use client'

import { useState } from 'react'
import { useGetCourseQuery } from '@/app/lib/api'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Link from 'next/link'
import PurchaseModal from '@/app/components/course/PurchaseModal'

export default function CourseCatalog() {
    const { data: courses, isLoading } = useGetCourseQuery()
    const [selectedCourse, setSelectedCourse] = useState(null)

    if (isLoading) {
        return <Loader2 className="h-8 w-8 animate-spin" />
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Course Catalog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((course) => (
                    <Card key={course.id}>
                        <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">{course.description}</p>
                            <p className="text-lg font-bold mt-2">₹{course.price}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href={`/courses/${course.id}`}>
                                <Button variant="outline">View Details</Button>
                            </Link>
                            <Button onClick={() => setSelectedCourse(course)}>Purchase</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {selectedCourse && (
                <PurchaseModal
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                />
            )}
        </div>
    )
}