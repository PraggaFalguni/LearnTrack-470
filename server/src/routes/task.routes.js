const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getPendingTasks,
  getCompletedTasks,
  getDueSoonTasks,
  getOverdueTasks
} = require("../controllers/task.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Apply authentication middleware
router.use(protect);

// /tasks
router.get("/", getTasks);
router.post("/", createTask);

// More specific routes first
router.get("/status/pending", getPendingTasks);
router.get("/status/completed", getCompletedTasks);
router.get("/due-soon", getDueSoonTasks);
router.get("/overdue", getOverdueTasks);
      

// /tasks/:id
router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);


module.exports = router;

