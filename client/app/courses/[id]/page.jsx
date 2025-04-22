"use client";

import { useEffect, useState } from "react";
import EnrollButton from "@/components/enroll-button";
import CourseRating from "@/components/course-rating";
import Link from "next/link";
import { Clock, Users, BookOpen, CheckCircle, Star } from "lucide-react";
import { coursesAPI } from "@/utils/api";

export default function CoursePage({ params }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("Fetching course with ID:", params.id);
        const response = await coursesAPI.getCourse(params.id);
        console.log("API Response:", response);

        if (response.data && response.data.data && response.data.data.course) {
          const courseData = response.data.data.course;
          console.log("Course data:", courseData);

          // Ensure we have all required fields with proper fallbacks
          const processedCourse = {
            ...courseData,
            description: courseData.description || "No description available",
            price: courseData.price || 0,
            lessons: courseData.lessons || [],
            duration: courseData.duration || 0,
            students: courseData.students || [],
            ratings: courseData.ratings || [],
            averageRating: courseData.averageRating || 0,
            instructor: courseData.instructor || { name: "Instructor" },
            category: courseData.category || "Uncategorized",
            level: courseData.level || "beginner",
            thumbnail:
              courseData.thumbnail || "https://via.placeholder.com/300x200",
          };

          console.log("Processed course data:", processedCourse);
          setCourse(processedCourse);
          setError(null);
        } else {
          throw new Error("Invalid course data structure");
        }
      } catch (err) {
        console.error("Error details:", err);
        console.error("Error response:", err.response);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
        <p className="text-gray-600 mb-6">
          {error ||
            "The course you're looking for doesn't exist or has been removed."}
        </p>
        <Link href="/courses" className="btn-primary">
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.category}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-1" />
              <span>{course.duration || 0} hours</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-1" />
              <span>{course.students?.length || 0} students</span>
            </div>
            <div className="flex items-center text-gray-600">
              <BookOpen className="h-5 w-5 mr-1" />
              <span>{course.lessons?.length || 0} lessons</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="card text-center p-4 sticky top-4">
            <p className="text-3xl font-bold text-purple-600 mb-4">
              ${course.price?.toFixed(2) || "0.00"}
            </p>
            <EnrollButton courseId={params.id} />
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
            <h2 className="text-xl font-bold mb-4">Course Content</h2>
            <div className="space-y-4">
              {course.lessons?.map((lesson, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-4 border rounded-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">{lesson.content}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{lesson.duration} minutes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Course Rating</h2>
            <div className="flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= course.averageRating
                        ? "text-yellow-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-lg font-medium">
                {course.averageRating?.toFixed(1) || "0.0"}
              </span>
              <span className="ml-1 text-sm text-gray-500">
                ({course.ratings?.length || 0} ratings)
              </span>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Course Requirements</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Basic computer skills</li>
              <li>Internet connection</li>
              <li>Willingness to learn</li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Instructor</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-medium">
                  {course.instructor?.name?.[0] || "I"}
                </span>
              </div>
              <div>
                <h3 className="font-medium">
                  {course.instructor?.name || "Instructor"}
                </h3>
                <p className="text-sm text-gray-600">Course Creator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
