import PublishCourseForm from "@/components/publish-course-form"

export default function PublishCoursePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Publish a Course</h1>
      <p className="text-gray-600">Share your knowledge with the world by creating and publishing your own course.</p>

      <PublishCourseForm />
    </div>
  )
}
