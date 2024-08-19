import Link from 'next/link'

// This would typically come from an API or database
const myCourses = [
    { id: 1, title: 'Introduction to React', progress: 60 },
    { id: 2, title: 'Advanced JavaScript', progress: 30 },
]

export default function Component() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Courses</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myCourses.map((course) => (
                        <div key={course.id} className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-indigo-600 h-2.5 rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{course.progress}% complete</p>
                            </div>
                            <Link
                                href={`/courses/${course.id}`}
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                                Continue Learning
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}