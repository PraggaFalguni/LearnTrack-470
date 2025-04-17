"use client";

import { useState, useEffect } from "react";
import { tasksAPI } from "@/utils/api";
import TaskList from "@/components/task-list";
import { useAuth } from "@/context/AuthContext";

export default function DueSoonPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = tasks.filter((task) =>
    priorityFilter === "all" ? true : task.priority === priorityFilter
  );

  const fetchDueSoonTasks = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await tasksAPI.getDueSoonTasks();
      if (response.data.status === "success") {
        setTasks(response.data.data.tasks || []);
      } else {
        setError("Failed to load tasks. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching due soon tasks:", error);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const response = await tasksAPI.updateTask(taskId, updates);

      if (response.data.status === "success") {
        await fetchDueSoonTasks();
      } else {
        await fetchDueSoonTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task. Please try again.");
      await fetchDueSoonTasks();
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const response = await tasksAPI.deleteTask(taskId);

      if (response.data.status !== "success") {
        await fetchDueSoonTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
      await fetchDueSoonTasks();
    }
  };

  useEffect(() => {
    fetchDueSoonTasks();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please log in to view your tasks.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading tasks due soon...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <label htmlFor="priorityFilter" className="text-sm font-medium text-purple-700">
          Filter by Priority:
        </label>
        <select
          id="priorityFilter"
          value={priorityFilter}
          onChange={handlePriorityFilterChange}
          className="form-select mt-2 w-full py-2 px-3 bg-yellow-100 border border-yellow-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <h1 className="text-3xl font-bold mb-6">Tasks Due Soon</h1>

      {error ? (
        <div className="text-red-600">{error}</div>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-600">No tasks due within the next 7 days.</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
      )}
    </div>
  );
}

