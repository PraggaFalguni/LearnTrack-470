import TaskItem from "./task-item"; // Assuming this is your TaskItem component

export default function TaskGroupByPriority({ tasks, onTaskUpdate, onTaskDelete }) {
  // Group tasks by priority
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.priority]) {
      acc[task.priority] = [];
    }
    acc[task.priority].push(task);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {["high", "medium", "low"].map((priority) => (
        <div key={priority}>
          <h3 className="text-xl font-semibold capitalize">{priority} Priority</h3>
          {groupedTasks[priority]?.length > 0 ? (
            <div className="space-y-4">
              {groupedTasks[priority].map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onTaskUpdate={onTaskUpdate}
                  onTaskDelete={onTaskDelete}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tasks for {priority} priority.</p>
          )}
        </div>
      ))}
    </div>
  );
}

