"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnrollButton({ courseId }) {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = () => {
    setIsEnrolling(true);
    // Navigate to the payment page with the course ID in the URL path
    router.push(`/payment/${courseId}`);
  };

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
