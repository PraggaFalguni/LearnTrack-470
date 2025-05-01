"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { tasksAPI, coursesAPI } from "@/utils/api";
import Link from "next/link";
import axios from "axios";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    tasksDueSoon: 0,
  });
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("pending"); // Default filter
  const [notification, setNotification] = useState(null); // For task notification
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
        const tasks = response.data.data.tasks;
        setTasks(tasks);
        updateStats(tasks);
        notifyHighestPriorityTask(tasks); // Notify user about the highest priority task
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await coursesAPI.getCourses();
      if (response.data.status === "success") {
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

  const notifyHighestPriorityTask = (tasks) => {
    // Filter pending tasks
    const pendingTasks = tasks.filter((task) => task.status.toLowerCase() === "pending");

    // Sort by priority (High > Medium > Low) and nearest due date
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const sortedTasks = pendingTasks.sort((a, b) => {
      const priorityComparison =
        priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityComparison !== 0) return priorityComparison;

      // If priorities are the same, sort by nearest due date
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    // Get the top task
    if (sortedTasks.length > 0) {
      const topTask = sortedTasks[0];
      setNotification(
        `🔔 ${user.name}, You have "${topTask.priority}" priority tasks due soon (${new Date(topTask.dueDate).toLocaleDateString()}).`
      );
    }
  };

  // Filter tasks based on the selected filter
  useEffect(() => {
    const filterTasks = () => {
      let filtered = [];

      if (filter === "pending") {
        filtered = tasks.filter(
          (task) => task.status.toLowerCase() === "pending"
        );

        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        filtered.sort((a, b) => {
          const aPriority =
            priorityOrder[
              a.priority?.charAt(0).toUpperCase() +
                a.priority?.slice(1).toLowerCase()
            ] || 999;
          const bPriority =
            priorityOrder[
              b.priority?.charAt(0).toUpperCase() +
                b.priority?.slice(1).toLowerCase()
            ] || 999;
          return aPriority - bPriority;
        });
      } else if (filter === "dueSoon") {
        filtered = tasks.filter(
          (task) =>
            task.status !== "completed" &&
            new Date(task.dueDate) <=
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        );
      } else if (filter === "completed") {
        filtered = tasks.filter(
          (task) => task.status.toLowerCase() === "completed"
        );
      }

      setFilteredTasks(filtered);
    };

    filterTasks();
  }, [filter, tasks]);

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

        {/* Notification */}
        {notification && (
          <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
            {notification}
          </div>
        )}

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

        {/* Tasks by Priority Section - Commented out for future use */}
        {/* <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Tasks by Priority
            </h3>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="pending">Pending</option>
              <option value="dueSoon">Due Soon</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500">No tasks to display! 🎉</p>
          ) : (
            <ul className="space-y-3">
              {filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className="p-4 bg-white shadow rounded flex justify-between"
                >
                  <div>
                    <span className="font-semibold">{task.title}</span>
                    <p className="text-gray-500 text-sm">{task.description}</p>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      task.priority === "High"
                        ? "text-red-600"
                        : task.priority === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div> */}

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

                          {/* Continue Learning → button  */}
                          {/* <Link
                            href={`/my-courses/${course._id}`}
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                          >
                            Continue Learning →
                          </Link> */}


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
