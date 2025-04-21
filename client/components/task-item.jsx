"use client";

import { useState } from "react";
import { format  } from "date-fns";
import { CheckCircle, Circle, Trash, Edit, Calendar } from "lucide-react";

export default function TaskItem({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false); //tracks whether the task is in "edit mode"
  const [editedTask, setEditedTask] = useState(task); //holds a copy of the task

  const handleComplete = () => {
    const updatedStatus = task.status === "completed" ? "pending" : "completed";

    onUpdate(task._id, {
      ...task,
      status: updatedStatus,
    });

    if (updatedStatus === "completed") {
      alert("Awesome work! You've successfully completed the task!");
    } else {
      alert("Task is now marked as pending again. Keep going!");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      await onDelete(task._id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask(task);
  };

  const handleSave = async () => {
    // Check if anything actually changed
    const isUnchanged = JSON.stringify(task) === JSON.stringify(editedTask);

    if (isUnchanged) {
      alert("No changes detected.");
      setIsEditing(false);
      return;
    }

    try {
      await onUpdate(task._id, editedTask);
      setIsEditing(false);
      alert("Task successfully edited!");
    } catch (error) {
      console.error("Error updating task:", error);
      setEditedTask(task);
    }
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`card border-l-4 ${
        task.priority === "high"
          ? "border-l-red-500"
          : task.priority === "medium"
          ? "border-l-yellow-500"
          : "border-l-green-500"
      } ${
        task.status === "completed" ? "bg-blue-50" : ""
      } transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-grow">
          <button
            onClick={handleComplete}
            className="mt-1 cursor-pointer hover:opacity-75"
          >
            {task.status === "completed" ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-gray-400" />
            )}
          </button>

          <div className="flex-grow">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleChange}
                  className="form-input w-full"
                />
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleChange}
                  className="form-input w-full"
                  rows="2"
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="priority"
                    value={editedTask.priority}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <input
                    type="date"
                    name="dueDate"
                    value={
                      editedTask.dueDate
                        ? format(new Date(editedTask.dueDate), "yyyy-MM-dd")
                        : ""
                    }
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="flex space-x-2">
                  <button onClick={handleSave} className="btn-primary">
                    Save
                  </button>
                  <button onClick={handleCancel} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-medium">{task.title}</h3>
                {task.description && (
                  <p className="text-gray-600 mt-1">{task.description}</p>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(
                      task.priority
                    )}`}
                  >
                    {task.priority} priority
                  </span>
                  {task.dueDate && (
                    <span className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(task.dueDate), "MMM dd, yyyy")}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {!isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-gray-500 hover:text-gray-700"
              disabled={task.completed}
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-500 hover:text-red-600"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {task.status === "completed" && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
