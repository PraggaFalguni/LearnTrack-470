"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EnrollButton({ courseId }) {
  const [isEnrolling, setIsEnrolling] = useState(false)
  const router = useRouter()

  const handleEnroll = () => {
    setIsEnrolling(true)

    // In a real app, this would enroll the user in the course
    setTimeout(() => {
      setIsEnrolling(false)
      router.push(`/payment/${courseId}`)
    }, 1000)
  }

  return (
    <button onClick={handleEnroll} className="btn-primary w-full mt-2" disabled={isEnrolling}>
      {isEnrolling ? "Processing..." : "Enroll Now"}
    </button>
  )
}
