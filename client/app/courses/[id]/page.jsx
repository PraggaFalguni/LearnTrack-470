import { getCourseById } from "@/lib/data"
import EnrollButton from "@/components/enroll-button"
import CourseRating from "@/components/course-rating"
import Link from "next/link"

export default function CoursePage({ params }) {
  const courseId = Number.parseInt(params.id)
  const course = getCourseById(courseId)

  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link href="/courses" className="btn-primary">
          Browse Courses
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.category}</p>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-auto">
          <div className="card text-center p-4">
            <p className="text-3xl font-bold text-purple-600">${course.price.toFixed(2)}</p>
            <EnrollButton courseId={courseId} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Course Description</h2>
            <p className="text-gray-700">{course.description}</p>
          </div>

          <div className="card mt-6">
            <h2 className="text-xl font-bold mb-4">Course Preview</h2>
            <p className="text-gray-700">{course.preview}</p>
          </div>
        </div>

        <div>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Course Rating</h2>
            <CourseRating rating={course.rating} ratingCount={course.ratingCount} />
          </div>
        </div>
      </div>
    </div>
  )
}
