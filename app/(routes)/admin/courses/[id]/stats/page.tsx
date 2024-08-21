'use client'

import { useGetCourseStatsQuery } from '@/app/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function CourseStats({ params }: { params: { id: string } }) {
    const { data: stats, isLoading } = useGetCourseStatsQuery(params.id)

    if (isLoading) {
        return <Loader2 className="h-8 w-8 animate-spin" />
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Course Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Enrollments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{stats?.totalEnrollments}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">₹{stats?.totalRevenue}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Average Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{stats?.averageRating.toFixed(1)}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}