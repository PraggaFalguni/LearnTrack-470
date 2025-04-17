import AdminCourseForm from "@/components/admin-course-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CreateCoursePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin" className="text-purple-600 hover:text-purple-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Admin Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold">Add New Course</h1>

      <AdminCourseForm />
    </div>
  )
}
