const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the task"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: [true, "Please provide a due date"],
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
