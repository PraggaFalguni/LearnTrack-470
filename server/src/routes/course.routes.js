const express = require("express");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  rateCourse,
} = require("../controllers/course.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

router
  .route("/")
  .get(getCourses)
  .post(protect, authorize("instructor", "admin"), createCourse);

router
  .route("/:id")
  .get(getCourse)
  .patch(protect, authorize("instructor", "admin"), updateCourse)
  .delete(protect, authorize("instructor", "admin"), deleteCourse);

router.post("/:id/enroll", protect, enrollCourse);
router.post("/:id/rate", protect, rateCourse);

module.exports = router;
