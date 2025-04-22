"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnrollButton({ courseId }) {
  return (
    <button
      className="btn-primary w-full mt-2 opacity-50 cursor-not-allowed"
      disabled={true}
    >
      Enroll
    </button>
  );
}
