import { getCourseById, getAllCourseSectionsWithVideos } from "@/lib/data"
import AdminCourseForm from "@/components/admin-course-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function EditCoursePage({ searchParams }) {
  const courseId = searchParams?.id ? Number.parseInt(searchParams.id) : null
  const course = courseId ? getCourseById(courseId) : null
  const sections = courseId ? getAllCourseSectionsWithVideos(courseId) : []

  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link href="/admin" className="btn-primary">
          Back to Admin Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin" className="text-purple-600 hover:text-purple-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Admin Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold">Edit Course: {course.title}</h1>

      <AdminCourseForm course={course} sections={sections} isEditing={true} />
    </div>
  )
}
