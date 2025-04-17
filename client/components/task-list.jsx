"use client";
import TaskItem from "./task-item";

export default function TaskList({
  tasks = [],
  priorityFilter = "all",
  onTaskUpdate,
  onTaskDelete,
}) {
  const filtered = tasks.filter((task) =>
    priorityFilter === "all" ? true : task.priority === priorityFilter
  );

  const handleTaskUpdate = async (taskId, updatedData) => {
    await onTaskUpdate(taskId, updatedData);
  };

  const handleTaskDelete = async (taskId) => {
    await onTaskDelete(taskId);
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={handleTaskDelete}
          onUpdate={handleTaskUpdate}
        />
      ))}
    </div>
  );
}
