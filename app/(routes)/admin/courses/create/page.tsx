'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateCourseMutation } from '@/app/lib/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function CreateCourse() {
    const router = useRouter()
    const [createCourse, { isLoading }] = useCreateCourseMutation()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [thumbnail, setThumbnail] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        if (thumbnail) {
            formData.append('thumbnail', thumbnail)
        }

        try {
            await createCourse(formData).unwrap()
            router.push('/admin/courses')
        } catch (error) {
            console.error('Failed to create course:', error)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <Label htmlFor="title">Course Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="description">Course Description</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e:any) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="price">Price (in ₹)</Label>
                    <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="thumbnail">Thumbnail</Label>
                    <Input
                        id="thumbnail"
                        type="file"
                        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                        accept="image/*"
                    />
                </div>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Course'}
                </Button>
            </form>
        </div>
    )
}