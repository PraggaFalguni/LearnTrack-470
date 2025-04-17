import { getAllCourses, isUserAdmin } from "@/lib/data"
import Link from "next/link"
import { PlusCircle, Edit, Trash } from "lucide-react"

export default function AdminPage() {
  // In a real app, we would get the userId from the session
  const userId = 2 // Using Jane Smith who is an admin
  const isAdmin = isUserAdmin(userId)

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You do not have permission to access this page.</p>
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    )
  }

  const courses = getAllCourses()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/create-course" className="btn-primary flex items-center">
          <PlusCircle className="h-5 w-5 mr-2" />
          Add New Course
        </Link>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Manage Courses</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${course.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.rating.toFixed(1)} ({course.ratingCount})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <Link
                      href={`/admin/edit-course?id=${course.id}`}
                      className="text-purple-600 hover:text-purple-900 inline-flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-900 inline-flex items-center">
                      <Trash className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
