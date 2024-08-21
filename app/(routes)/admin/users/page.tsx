'use client'

import { useGetUsersQuery } from '@/app/lib/api'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"

export default function UserManagement() {
    const { data: users, isLoading } = useGetUsersQuery()

    if (isLoading) {
        return <Loader2 className="h-8 w-8 animate-spin" />
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Account Type</TableHead>
                        <TableHead>Courses Enrolled</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user:any) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.accountType}</TableCell>
                            <TableCell>{user.enrolledCourses}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}