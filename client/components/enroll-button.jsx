"use client";

import { useRouter } from "next/navigation";

export default function EnrollButton({ courseId }) {
  const router = useRouter();

  const handleEnroll = () => {
    // Redirect to the payment page with the courseId as a query parameter
    router.push(`/payment?courseId=${courseId}`);
  };

  return (
    <button
      className="btn-primary w-full mt-2"
      onClick={handleEnroll}
    >
      Enroll
    </button>
  );
}
