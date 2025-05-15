"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { tasksAPI, coursesAPI } from "@/utils/api";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    tasksDueSoon: 0,
  });
  const [notification, setNotification] = useState(null);

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await tasksAPI.getTasks();
      if (res.data.status === "success") {
        const allTasks = res.data.data.tasks;
        setTasks(allTasks);
        //calculate stats
        const completed = allTasks.filter(
          (t) => t.status === "completed"
        ).length;
        const dueSoon = allTasks.filter(
          (t) =>
            t.status !== "completed" &&
            new Date(t.dueDate) <=
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        ).length;

        setStats({
          totalTasks: allTasks.length,
          completedTasks: completed,
          tasksDueSoon: dueSoon,
        });

        //notify user
        const pending = allTasks.filter(
          (t) => t.status.toLowerCase() === "pending"
        );
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };

        pending.sort((a, b) => {
          const prio = priorityOrder[a.priority] - priorityOrder[b.priority];
          return prio !== 0 ? prio : new Date(a.dueDate) - new Date(b.dueDate);
        });

        if (pending.length > 0) {
          const top = pending[0];
          setNotification(
            `🔔 ${user.name}, You have "${
              top.priority
            }" priority tasks due soon (${new Date(
              top.dueDate
            ).toLocaleDateString()}).`
          );
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const res = await coursesAPI.getCourses();
      if (res.data.status === "success") {
        const enrolled = res.data.data.courses.filter((course) =>
          course.students?.includes(user.id)
        );
        setEnrolledCourses(enrolled);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) return null;

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

        {notification && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            {notification}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Total Tasks"
            value={stats.totalTasks}
            color="text-purple-600"
          />
          <StatCard
            label="Completed Tasks"
            value={stats.completedTasks}
            color="text-green-500"
          />
          <StatCard
            label="Due Soon"
            value={stats.tasksDueSoon}
            color="text-yellow-500"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Your Enrolled Courses
          </h3>
          {enrolledCourses.length > 0 ? (
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-6 pb-4 px-1">
                {enrolledCourses.map((course) => (
                  <div
                    key={course._id}
                    className="flex-none w-[300px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <span className="text-sm text-gray-500">
                        {course.category}
                      </span>
                    </div>
                  </div>
                ))}
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

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900">{label}</h3>
      <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
