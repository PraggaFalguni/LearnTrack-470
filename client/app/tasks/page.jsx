"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { tasksAPI } from "@/utils/api";
import TaskList from "@/components/task-list";
import TaskStatistics from "@/components/task-statistics";
import CreateTaskForm from "@/components/create-task-form";
import Link from "next/link";


export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]); //list of all task with attibutes
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("all"); // State for priority filter
  //filter using js bult in function filter
  //if all priorityFilter if no then check for each task and create filteredTasks for that priority
  const filteredTasks = tasks.filter((task) =>
    priorityFilter === "all" ? true : task.priority === priorityFilter
  );
  // Fetch tasks
  const fetchTasks = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await tasksAPI.getTasks();
      if (response.data.status === "success") {
        setTasks(response.data.data.tasks || []); //update tasks 
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
  ///for side bar
  // stats obj as useState({})
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0, // Add a count for pending tasks
    tasksDueSoon: 0,
  });
  const updateStats = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "completed").length;
    const pendingTasks = tasks.filter((task) => task.status === "pending").length;
    const tasksDueSoon = tasks.filter(
      (task) =>
        task.status === "pending" &&
        new Date(task.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) //7 days from now in milisec
    ).length;
  
    setStats({
      totalTasks,
      completedTasks,
      pendingTasks,
      tasksDueSoon,
    });
  };
  useEffect(() => {
    fetchTasks();
  }, []); // Empty array = run once

  // Update stats whenever tasks change
  useEffect(() => {
    updateStats(tasks);
  }, [tasks]);  // runs every time task changes
  ////side bar ends
  useEffect(() => {
    fetchTasks();
  }, [user?.id]);

  // Handle task creation
  const handleTaskCreated = async (newTask) => {
    try {
      await fetchTasks();  // Refresh task list after new task is added
    } catch (error) {
      console.error("Error refreshing tasks:", error);
      setError("Failed to refresh tasks. Please try again.");
    }
  };

  // Handle task updates
  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const response = await tasksAPI.updateTask(taskId, updates);

      if (response.data.status === "success") {
        // Refresh the task list to ensure consistency
        await fetchTasks();
      } else {
        // Revert optimistic update on failure
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task. Please try again.");
      // Revert optimistic update
      await fetchTasks();
    }
  };

  // Handle task deletion
  const handleTaskDelete = async (taskId) => {
    try {
      // Make the API call
      const response = await tasksAPI.deleteTask(taskId);

      if (response.data.status !== "success") {
        // Revert optimistic update on failure
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
      // Revert optimistic update
      await fetchTasks();
    }
  };
  // Handle priority filter change
  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please log in to view your tasks.</p>
        <Link href="/login" className="btn-primary mt-4">
          Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Create Tasks:</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
      <div className="md:col-span-2">
      <div className="text-center mb-6">

  </div>

    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <CreateTaskForm
      onTaskCreated={handleTaskCreated}
      
    /> 
    </div>
 

  <h2 className="text-3xl font-bold mb-4">My Tasks:</h2>
  {/* Priority Filter Dropdown */}
    <div className="mb-6">
      <label htmlFor="priorityFilter" className="text-sm font-medium text-purple-700">
        Filter by Priority:
      </label>
      <select
        id="priorityFilter"
        value={priorityFilter}
        onChange={handlePriorityFilterChange}
        className="form-select mt-2 w-full py-2 px-3 bg-purple-100 border border-purple-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
      >
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>


  
  {isLoading ? (
    <div className="text-center py-8">
      <p className="text-gray-500">Loading tasks...</p>
    </div>
  ) : (
    <TaskList
  tasks={filteredTasks}
  priorityFilter={priorityFilter}
  onTaskUpdate={handleTaskUpdate}
  onTaskDelete={handleTaskDelete}
/>

  )}
</div>
<div>
<p className="text-2xl font-bold text-purple-600">Progress Tracking:</p>
<div className="mt-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-black-400">
            <p>Total Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {stats.totalTasks}
              </span>
            </p>
          </div>
          <div className="text-black-400">
            <p>Pending Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {stats.pendingTasks}
              </span>
            </p>
          </div>
          <div className="text-black-400">
            <p>Due soon Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {stats.tasksDueSoon}
              </span>
            </p>
          </div>
          <div className="text-black-400">
            <p>Completed:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {stats.completedTasks}
              </span>
            </p>
          </div>
        </div>
      </div>
  <div className="bg-white rounded-lg shadow-md p-6 sticky top-4"> 
    
    <TaskStatistics  />  
  </div>
</div>
</div>
</div>
  );
}
