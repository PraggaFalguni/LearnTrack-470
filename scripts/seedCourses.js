const mongoose = require("mongoose");
const Course = require("../models/course.model");
require("dotenv").config();

const courses = [
  {
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    price: 49.99,
<<<<<<< HEAD
    thumbnail: "/p1.jpg",
=======
    thumbnail: "public/p1.jpg",
>>>>>>> c5249d1b6e5a66a89b45021d14f03ee59cc6bef6
    category: "Web Development",
    level: "beginner",
    duration: 20,
    instructor: "Default Instructor",
    lessons: [
      {
        title: "HTML Basics",
        content: "Introduction to HTML structure and elements",
        videoUrl: "https://example.com/html-basics",
        duration: 45,
      },
      {
        title: "CSS Fundamentals",
        content: "Learn how to style your web pages with CSS",
        videoUrl: "https://example.com/css-fundamentals",
        duration: 60,
      },
    ],
    isPublished: true,
  },
  {
    title: "Python Programming",
    description: "Master Python programming from basics to advanced concepts.",
    price: 59.99,
    thumbnail: "/p3.jpg",
    category: "Programming",
    level: "beginner",
    duration: 30,
    instructor: "Default Instructor",
    lessons: [
      {
        title: "Python Basics",
        content: "Introduction to Python syntax and data types",
        videoUrl: "https://example.com/python-basics",
        duration: 50,
      },
      {
        title: "Object-Oriented Programming",
        content: "Learn OOP concepts in Python",
        videoUrl: "https://example.com/python-oop",
        duration: 70,
      },
    ],
    isPublished: true,
  },
  {
    title: "Data Science Fundamentals",
    description: "Learn the basics of data science and machine learning.",
    price: 79.99,
    thumbnail: "/p2.png",
    category: "Data Science",
    level: "intermediate",
    duration: 40,
    instructor: "Default Instructor",
    lessons: [
      {
        title: "Data Analysis",
        content: "Introduction to data analysis techniques",
        videoUrl: "https://example.com/data-analysis",
        duration: 60,
      },
      {
        title: "Machine Learning Basics",
        content: "Introduction to machine learning algorithms",
        videoUrl: "https://example.com/ml-basics",
        duration: 80,
      },
    ],
    isPublished: true,
  },
];

async function seedCourses() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully!");

    // Clear existing courses
    console.log("Clearing existing courses...");
    await Course.deleteMany({});

    // Insert new courses
    console.log("Inserting new courses...");
    await Course.insertMany(courses);

    console.log("Courses seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
}

// Run the seed function
seedCourses();
