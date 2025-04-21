"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { tasksAPI } from "@/utils/api";
import TaskList from "@/components/task-list";

export default function CompletedTasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTasks = tasks
    .filter(task => task.status === "completed") // only completed tasks
    .filter(task => 
      priorityFilter === "all" ? true : task.priority === priorityFilter
    );

  const fetchTasks = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await tasksAPI.getTasks();
      if (response.data.status === "success") {
        setTasks(response.data.data.tasks || []);
      } else {
        setError("Failed to load tasks. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
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
        await fetchTasks();
      } else {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task. Please try again.");
      await fetchTasks();
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const response = await tasksAPI.deleteTask(taskId);

      if (response.data.status !== "success") {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
      await fetchTasks();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please log in to view your tasks.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-8">Loading completed tasks...</div>;
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
          className="form-select mt-2 w-full py-2 px-3 bg-pink-100 border border-pink-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition duration-200"
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <h1 className="text-3xl font-bold mb-6">Completed Tasks</h1>

      {error ? (
        <div className="text-pink-600">{error}</div>
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

