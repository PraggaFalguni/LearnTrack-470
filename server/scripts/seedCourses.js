require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../src/models/course.model");

const courses = [
  {
    title: "Introduction to Web Development",
    description:
      "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
    price: 49.99,
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
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
    title: "Advanced React Development",
    description: "Master React.js with hooks, context, and advanced patterns.",
    price: 69.99,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Web Development",
    level: "intermediate",
    duration: 25,
    instructor: "Default Instructor",
    lessons: [
      {
        title: "React Hooks Deep Dive",
        content: "Understanding and implementing React hooks",
        videoUrl: "https://example.com/react-hooks",
        duration: 50,
      },
      {
        title: "State Management",
        content: "Advanced state management techniques",
        videoUrl: "https://example.com/state-management",
        duration: 55,
      },
    ],
    isPublished: true,
  },
  {
    title: "Full Stack Development with MERN",
    description:
      "Build complete web applications using MongoDB, Express, React, and Node.js.",
    price: 89.99,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Web Development",
    level: "advanced",
    duration: 35,
    instructor: "Default Instructor",
    lessons: [
      {
        title: "MERN Stack Overview",
        content: "Introduction to the MERN stack architecture",
        videoUrl: "https://example.com/mern-overview",
        duration: 40,
      },
      {
        title: "Building RESTful APIs",
        content: "Creating robust backend APIs with Express",
        videoUrl: "https://example.com/restful-apis",
        duration: 45,
      },
    ],
    isPublished: true,
  },
  {
    title: "iOS App Development with Swift",
    description:
      "Learn to build native iOS applications using Swift and SwiftUI.",
    price: 79.99,
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Mobile Development",
    level: "intermediate",
    duration: 30,
    instructor: "Default Instructor",
    lessons: [
      {
        title: "Swift Fundamentals",
        content: "Master the Swift programming language",
        videoUrl: "https://example.com/swift-fundamentals",
        duration: 50,
      },
      {
        title: "SwiftUI Basics",
        content: "Building user interfaces with SwiftUI",
        videoUrl: "https://example.com/swiftui-basics",
        duration: 45,
      },
    ],
    isPublished: true,
  },
  {
    title: "Android Development with Kotlin",
    description:
      "Create modern Android applications using Kotlin and Jetpack Compose.",
    price: 74.99,
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Mobile Development",
    level: "intermediate",
    duration: 28,
    instructor: "Default Instructor",
    lessons: [
      {
        title: "Kotlin Programming",
        content: "Learn Kotlin programming language",
        videoUrl: "https://example.com/kotlin-programming",
        duration: 45,
      },
      {
        title: "Jetpack Compose",
        content: "Modern Android UI development",
        videoUrl: "https://example.com/jetpack-compose",
        duration: 50,
      },
    ],
    isPublished: true,
  },
  {
    title: "Cross-Platform Mobile Development with Flutter",
    description:
      "Build beautiful native apps for iOS and Android using Flutter.",
    price: 69.99,
    thumbnail:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Mobile Development",
    level: "intermediate",
    duration: 25,
    instructor: "Default Instructor",
    lessons: [
      {
        title: "Flutter Basics",
        content: "Introduction to Flutter framework",
        videoUrl: "https://example.com/flutter-basics",
        duration: 40,
      },
      {
        title: "State Management",
        content: "Managing state in Flutter applications",
        videoUrl: "https://example.com/flutter-state",
        duration: 45,
      },
    ],
    isPublished: true,
  },
  {
    title: "Python Programming",
    description: "Master Python programming from basics to advanced concepts.",
    price: 59.99,
    thumbnail:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
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
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing courses
    await Course.deleteMany({});
    console.log("Cleared existing courses");

    // Insert new courses
    const insertedCourses = await Course.insertMany(courses);
    console.log(`Successfully seeded ${insertedCourses.length} courses`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
}

seedCourses();
