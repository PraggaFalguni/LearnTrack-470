import { getEnrolledCourses } from "@/lib/data"
import Link from "next/link"
import { BookOpen, Clock } from "lucide-react"

export default function MyCoursesPage() {
  // In a real app, we would get the userId from the session
  const userId = 1
  const enrolledCourses = getEnrolledCourses(userId)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Courses</h1>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet.</p>
          <Link href="/courses" className="btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="card hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4 aspect-video bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">{course.category}</span>
                </div>

                <div className="md:w-3/4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Last accessed: 2 days ago</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Enrolled</div>
                    </div>

                    <Link href={`/my-courses/${course.id}`} className="btn-primary">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
