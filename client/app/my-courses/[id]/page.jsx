import { getCourseById } from "@/lib/data";
import CourseContent from "@/components/course-content";
import CourseSidebar from "@/components/course-sidebar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EnrolledCoursePage({ params }) {
  const courseId = Number.parseInt(params.id);
  const course = getCourseById(courseId);

  // In a real app, we would check if the user is enrolled in this course
  const isEnrolled = true;

  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-6">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/my-courses" className="btn-primary">
          My Courses
        </Link>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You are not enrolled in this course.
        </p>
        <Link href={`/courses/${courseId}`} className="btn-primary">
          View Details
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href="/my-courses"
          className="text-purple-600 hover:text-purple-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to My Courses
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <CourseContent course={course} />
        </div>
        <div className="lg:col-span-1">
          <CourseSidebar course={course} />
        </div>
      </div>
    </div>
  );
}
