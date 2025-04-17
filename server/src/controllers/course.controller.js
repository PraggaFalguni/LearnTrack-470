const Course = require("../models/course.model");
const User = require("../models/user.model");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructor: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
      .populate("students", "name");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      {
        _id: req.params.id,
        instructor: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user.id,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
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
    const { rating, review } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user is enrolled
    if (!course.students.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You must be enrolled to rate this course" });
    }

    // Check if user has already rated
    const existingRating = course.ratings.find(
      (r) => r.user.toString() === req.user.id
    );
    if (existingRating) {
      return res
        .status(400)
        .json({ message: "You have already rated this course" });
    }

    // Add rating
    course.ratings.push({
      user: req.user.id,
      rating,
      review,
    });

    // Calculate average rating
    const totalRatings = course.ratings.length;
    const sumRatings = course.ratings.reduce((sum, r) => sum + r.rating, 0);
    course.averageRating = sumRatings / totalRatings;

    await course.save();

    res.status(200).json({
      status: "success",
      message: "Rating submitted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
