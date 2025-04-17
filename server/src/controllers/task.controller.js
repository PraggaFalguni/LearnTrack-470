const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id,
    });
    console.log("👉 createTask called");
    res.status(201).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Retrieves all tasks belonging to the current user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: 1 });

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Retrieves a single task by its id
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get pending tasks
exports.getPendingTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      status: "pending",
    }).sort({ dueDate: 1 });

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: { tasks },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get completed tasks
exports.getCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
      status: "completed",
    }).sort({ dueDate: 1 });

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: { tasks },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get tasks due within next 7 days
exports.getDueSoonTasks = async (req, res) => {
  try {
    const now = new Date();
    const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const tasks = await Task.find({
      user: req.user.id,
      status: "pending", // Only pending tasks due soon
      dueDate: { $gte: now, $lte: next7Days },
    }).sort({ dueDate: 1 });

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: { tasks },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

