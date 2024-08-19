import Link from 'next/link'

// This would typically come from an API or database
const getCourse = (id: string) => ({
    id,
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    lectures: [
        { id: 1, title: 'React Components' },
        { id: 2, title: 'State and Props' },
        { id: 3, title: 'Hooks' },
    ],
})

export default function Component({ params }: { params: { id: string } }) {
    const course = getCourse(params.id)

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-gray-600 mb-8">{course.description}</p>
                <h2 className="text-2xl font-semibold mb-4">Lectures</h2>
                <ul className="space-y-2">
                    {course.lectures.map((lecture) => (
                        <li key={lecture.id}>
                            <Link
                                href={`/courses/${course.id}/lectures/${lecture.id}`}
                                className="text-indigo-600 hover:text-indigo-800"
                            >
                                {lecture.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}