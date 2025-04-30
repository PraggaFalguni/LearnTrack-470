"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { coursesAPI } from "@/utils/api";

export default function EnrollButton({ courseId }) {
  const router = useRouter();
  const { user } = useAuth();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        const response = await coursesAPI.getCourse(courseId);
        if (response.data.status === "success") {
          const course = response.data.data.course;
          setIsEnrolled(course.students?.includes(user?.id) || false);
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      checkEnrollment();
    }
  }, [user, courseId]);

  const handleEnroll = () => {
    setIsEnrolling(true);
    router.push(`/payment/${courseId}`);
  };

  if (isLoading) {
    return (
      <button className="btn-primary w-full mt-2" disabled>
        Loading...
      </button>
    );
  }

  if (isEnrolled) {
    return (
      <button className="btn-primary w-full mt-2 bg-gray-500 cursor-not-allowed" disabled>
        Already Enrolled
      </button>
    );
  }

  return (
    <button
      onClick={handleEnroll}
      className="btn-primary w-full mt-2"
      disabled={isEnrolling}
    >
      {isEnrolling ? "Processing..." : "Enroll Now"}
    </button>
  );
}
