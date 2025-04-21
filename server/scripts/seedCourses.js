require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../models/Course");

const courses = [
  {
    title: "Introduction to Data Science",
    description:
      "Learn the fundamentals of data science, including data analysis, visualization, and machine learning concepts.",
    category: "Data Science",
    level: "Beginner",
    duration: "8 weeks",
    instructor: "Dr. Sarah Johnson",
    price: 49.99,
    rating: 4.7,
    students: [],
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1685086785054-d047cdc0e525?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lessons: [
      {
        title: "Introduction to Data Science",
        content: "Overview of data science and its applications",
        duration: "30 minutes",
        videoUrl: "https://example.com/videos/intro-to-data-science",
      },
      {
        title: "Data Analysis Fundamentals",
        content: "Basic concepts of data analysis and statistics",
        duration: "45 minutes",
        videoUrl: "https://example.com/videos/data-analysis-fundamentals",
      },
    ],
  },
  {
    title: "Web Development Bootcamp",
    description:
      "Master modern web development with HTML, CSS, JavaScript, and popular frameworks.",
    category: "Web Development",
    level: "Intermediate",
    duration: "12 weeks",
    instructor: "John Smith",
    price: 79.99,
    rating: 4.8,
    students: [],
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
    lessons: [
      {
        title: "HTML & CSS Basics",
        content: "Learn the fundamentals of web markup and styling",
        duration: "40 minutes",
        videoUrl: "https://example.com/videos/html-css-basics",
      },
      {
        title: "JavaScript Fundamentals",
        content: "Introduction to JavaScript programming",
        duration: "50 minutes",
        videoUrl: "https://example.com/videos/javascript-fundamentals",
      },
    ],
  },
  {
    title: "Digital Marketing Strategy",
    description:
      "Learn how to create and implement effective digital marketing campaigns across various platforms.",
    category: "Marketing",
    level: "Beginner",
    duration: "6 weeks",
    instructor: "Emily Chen",
    price: 59.99,
    rating: 4.6,
    students: [],
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    lessons: [
      {
        title: "Introduction to Digital Marketing",
        content: "Overview of digital marketing channels and strategies",
        duration: "35 minutes",
        videoUrl: "https://example.com/videos/digital-marketing-intro",
      },
      {
        title: "Social Media Marketing",
        content: "Strategies for effective social media campaigns",
        duration: "45 minutes",
        videoUrl: "https://example.com/videos/social-media-marketing",
      },
    ],
  },
  {
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile applications using React Native framework.",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "10 weeks",
    instructor: "Michael Rodriguez",
    price: 69.99,
    rating: 4.5,
    students: [],
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    lessons: [
      {
        title: "React Native Basics",
        content: "Introduction to React Native and its core concepts",
        duration: "40 minutes",
        videoUrl: "https://example.com/videos/react-native-basics",
      },
      {
        title: "Building Your First App",
        content: "Step-by-step guide to creating a mobile app",
        duration: "55 minutes",
        videoUrl: "https://example.com/videos/first-react-native-app",
      },
    ],
  },
];

async function seedCourses() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing courses
    await Course.deleteMany({});
    console.log("Cleared existing courses");

    // Insert new courses
    await Course.insertMany(courses);
    console.log("Successfully seeded courses");

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
}

seedCourses();
