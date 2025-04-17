import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>

      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>

      <p className="text-gray-600 mb-8">Thank you for your purchase. You now have access to the course.</p>

      <div className="space-y-4">
        <Link href="/dashboard" className="btn-primary block">
          Go to Dashboard
        </Link>

        <Link href="/courses" className="btn-secondary block">
          Browse More Courses
        </Link>
      </div>
    </div>
  )
}
