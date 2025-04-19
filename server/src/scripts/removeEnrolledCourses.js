const mongoose = require("mongoose");
const Course = require("../models/course.model");
require("dotenv").config();

async function removeEnrolledCourses() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully!");

    // Update all courses to remove students array
    console.log("Removing enrolled courses...");
    const result = await Course.updateMany({}, { $set: { students: [] } });

    console.log(`Updated ${result.modifiedCount} courses`);
    console.log("Successfully removed all enrolled courses!");

    process.exit(0);
  } catch (error) {
    console.error("Error removing enrolled courses:", error);
    process.exit(1);
  }
}

// Run the function
removeEnrolledCourses();
