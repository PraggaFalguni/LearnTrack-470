const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the course"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  instructor: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: 0,
  },
  thumbnail: {
    type: String,
    required: [true, "Please provide a thumbnail image"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  duration: {
    type: Number, // in hours
    required: [true, "Please provide course duration"],
  },
  lessons: [
    {
      title: String,
      content: String,
      videoUrl: String,
      duration: Number, // in minutes
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      review: String,
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
