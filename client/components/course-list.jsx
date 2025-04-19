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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course._id} className="relative">
          <Link href={`/courses/${course._id}`}>
            <CourseCard course={course} />
          </Link>
          {(!course.students ||
            !Array.isArray(course.students) ||
            !course.students.includes(user?.id)) && (
            <button
              disabled
              className="absolute bottom-4 right-4 bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
            >
              Enroll Now
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
