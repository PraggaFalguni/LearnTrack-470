"use client";
import Link from "next/link";
import CourseCard from "./course-card";
import { coursesAPI } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

export default function CourseList({ courses, onTaskUpdate }) {
  const { user } = useAuth();

  const handleEnroll = async (courseId) => {
    try {
      const response = await coursesAPI.enrollCourse(courseId);
      if (response.data.status === "success") {
        alert("Successfully enrolled in the course!");
        onTaskUpdate(); // Refresh the courses list
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert(error.response?.data?.message || "Failed to enroll in course");
    }
  };

  if (courses.length === 0) {
    return <p className="text-gray-500">No courses found.</p>;
  }

  return (
    <div className="h-full">
      {courses.map((course) => (
        <div key={course._id} className="relative h-full">
          <Link href={`/courses/${course._id}`}>
            <CourseCard course={course} />
          </Link>
          {(!course.students ||
            !Array.isArray(course.students) ||
            !course.students.includes(user?.id)) && (
            <Link
              href={`/courses/${course._id}`}
              className="absolute bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Details
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
