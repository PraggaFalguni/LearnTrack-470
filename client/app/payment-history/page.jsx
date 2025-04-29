"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { coursesAPI } from "@/utils/api";

export default function PaymentHistoryPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await coursesAPI.getCourses();
        if (response.data.status === "success") {
          const enrolled = response.data.data.courses.filter((course) =>
            course.students?.includes(user?.id)
          );
          setEnrolledCourses(enrolled);
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return <div className="text-center py-8">Loading payment history...</div>;
  }

  if (enrolledCourses.length === 0) {
    return <p className="text-gray-500">No enrolled courses found.</p>
  }

  const totalAmount = enrolledCourses.reduce((sum, course) => sum + course.price, 0);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enrolledCourses.map((course) => (
              <tr key={course._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${course.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Enrolled
                  </span>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Total</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-purple-600">
                ${totalAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
