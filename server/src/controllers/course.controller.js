const Course = require("../models/course.model");
const User = require("../models/user.model");

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate("instructor", "name")
      .sort("-createdAt");

    res.status(200).json({
      status: "success",
      results: courses.length,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name")
      .populate("students", "name")
      .populate("lessons")
      .populate("ratings.user", "name");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Calculate average rating
    const averageRating =
      course.ratings.length > 0
        ? course.ratings.reduce((acc, rating) => acc + rating.rating, 0) /
          course.ratings.length
        : 0;

    // Add calculated fields to the course object
    const courseWithStats = {
      ...course.toObject(),
      averageRating,
      studentCount: course.students.length,
      lessonCount: course.lessons.length,
    };

    res.status(200).json({
      status: "success",
      data: {
        course: courseWithStats,
      },
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user is already enrolled
    if (course.students.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course" });
    }

    // Add student to course
    course.students.push(req.user.id);
    await course.save();

    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(req.user.id, {
      $push: { enrolledCourses: course._id },
    });

    res.status(200).json({
      status: "success",
      message: "Successfully enrolled in course",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.rateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user has already rated this course
    const existingRating = course.ratings.find(
      (rating) => rating.user.toString() === req.user.id
    );

    if (existingRating) {
      return res.status(400).json({
        message: "You have already rated this course",
      });
    }

    // Add new rating
    course.ratings.push({
      user: req.user.id,
      rating: req.body.rating,
      review: req.body.review,
    });

    // Calculate new average rating
    const totalRatings = course.ratings.length;
    const sumRatings = course.ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    course.averageRating = sumRatings / totalRatings;

    await course.save();

    res.status(200).json({
      status: "success",
      message: "Rating submitted successfully",
      data: {
        course,
      },
    });
  } catch (error) {
    console.error("Error rating course:", error);
    res.status(400).json({ message: error.message });
  }
};
