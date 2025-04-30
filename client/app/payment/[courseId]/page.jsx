"use client";

import { useEffect, useState } from "react";
import PaymentForm from "@/components/payment-form";
import Link from "next/link";
import { coursesAPI } from "@/utils/api";

export default function PaymentPage({ params }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await coursesAPI.getCourse(params.courseId);
        if (response.data && response.data.data && response.data.data.course) {
          setCourse(response.data.data.course);
          setError(null);
        } else {
          throw new Error("Invalid course data structure");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.courseId]);

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
        <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link href="/courses" className="btn-primary">
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Complete Your Purchase</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <PaymentForm course={course} />
        </div>

        <div>
          <div className="card sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Course:</span>
                <span className="font-medium">{course.title}</span>
              </div>

              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-medium">${course.price.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-purple-600">${course.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>By completing your purchase, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
