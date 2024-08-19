import Link from 'next/link'

// This would typically come from an API or database
const courses = [
    { id: 1, title: 'Introduction to React', description: 'Learn the basics of React' },
    { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript concepts' },
    { id: 3, title: 'Node.js Fundamentals', description: 'Build server-side applications with Node.js' },
]

export default function Component() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">All Courses</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <Link
                                href={`/courses/${course.id}`}
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}