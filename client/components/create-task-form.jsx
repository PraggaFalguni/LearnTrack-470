"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { tasksAPI } from "@/utils/api";

export default function CreateTaskForm({ onTaskCreated, closeForm }) {
  const { user, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please log in to create tasks");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const taskData = {
        title,
        description,
        dueDate,
        priority,
        userId: user._id,
      };

      const response = await tasksAPI.createTask(taskData);

      if (response.data.status === "success") {
        // Notify parent component
        if (onTaskCreated) onTaskCreated(response.data.data.task);

        // Reset form
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("medium");

        // Auto-close the form
        if (closeForm) closeForm();
        alert("Task created successfully!");
      } else {
        throw new Error(response.data.message || "Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setError(error.response?.data?.message || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading authentication state...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please log in to create tasks.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md">{error}</div>
      )}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input w-full"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input w-full"
          rows="3"
          disabled={isSubmitting}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input w-full"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-input w-full"
            disabled={isSubmitting}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
