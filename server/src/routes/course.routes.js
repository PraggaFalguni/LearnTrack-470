const express = require("express");
const {
  createCourse,
  getCourses,
  getCourse,
  enrollCourse,
  rateCourse,
} = require("../controllers/course.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

router
  .route("/")
  .get(getCourses)
  .post(protect, authorize("instructor", "admin"), createCourse);

router.route("/:id").get(getCourse);

router.post("/:id/enroll", protect, enrollCourse);
router.post("/:id/rate", protect, rateCourse);

module.exports = router;
