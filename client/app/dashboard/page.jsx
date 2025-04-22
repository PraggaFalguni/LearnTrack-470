"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { tasksAPI, coursesAPI } from "@/utils/api";
import Link from "next/link";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    tasksDueSoon: 0,
  });
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getTasks();
      if (response.data.status === "success") {
        setTasks(response.data.data.tasks);
        updateStats(response.data.data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await coursesAPI.getCourses();
      if (response.data.status === "success") {
        // Filter enrolled courses
        const enrolled = response.data.data.courses.filter((course) =>
          course.students?.includes(user.id)
        );
        setEnrolledCourses(enrolled);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  const updateStats = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const tasksDueSoon = tasks.filter(
      (task) =>
        task.status !== "completed" &&
        new Date(task.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length;

    setStats({
      totalTasks,
      completedTasks,
      tasksDueSoon,
    });
  };

  // Add task update handler
  const handleTaskUpdate = async () => {
    await fetchTasks(); // Refresh tasks and stats
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Here's an overview of your tasks and courses.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Tasks</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">
              {stats.totalTasks}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">
              Completed Tasks
            </h3>
            <p className="mt-2 text-3xl font-bold text-green-500">
              {stats.completedTasks}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Due Soon</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-500">
              {stats.tasksDueSoon}
            </p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Your Enrolled Courses
          </h3>
          {enrolledCourses.length > 0 ? (
            <div className="relative">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-6 pb-4 px-1">
                  {enrolledCourses.map((course) => (
                    <div
                      key={course._id}
                      className="flex-none w-[300px] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {course.category}
                          </span>
                          <Link
                            href={`/my-courses/${course._id}`}
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            Continue Learning →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              You haven't enrolled in any courses yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
