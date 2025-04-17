import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  )
}
