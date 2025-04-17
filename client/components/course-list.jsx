import Link from "next/link"
import CourseCard from "./course-card"

export default function CourseList({ courses }) {
  if (courses.length === 0) {
    return <p className="text-gray-500">No courses found.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Link key={course.id} href={`/courses/${course.id}`}>
          <CourseCard course={course} />
        </Link>
      ))}
    </div>
  )
}
