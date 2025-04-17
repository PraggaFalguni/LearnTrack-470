// Mock users data
export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
    enrolledCourses: [1, 3],
    paymentHistory: [
      { id: 1, courseId: 1, amount: 29.99, date: "2023-05-15", method: "Card" },
      { id: 2, courseId: 3, amount: 49.99, date: "2023-06-20", method: "Bkash" },
    ],
    role: "user",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    enrolledCourses: [2, 4],
    paymentHistory: [
      { id: 3, courseId: 2, amount: 19.99, date: "2023-04-10", method: "Bkash" },
      { id: 4, courseId: 4, amount: 39.99, date: "2023-07-05", method: "Card" },
    ],
    role: "admin",
  },
]

// Mock tasks data
export const tasks = [
  {
    id: 1,
    userId: 1,
    title: "Complete Project Proposal",
    description: "Finish the project proposal for the client meeting",
    dueDate: "2023-08-15",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    userId: 1,
    title: "Review Code",
    description: "Review the code changes for the new feature",
    dueDate: "2023-08-10",
    priority: "medium",
    completed: true,
  },
  {
    id: 3,
    userId: 2,
    title: "Prepare Presentation",
    description: "Create slides for the upcoming presentation",
    dueDate: "2023-08-20",
    priority: "high",
    completed: false,
  },
  {
    id: 4,
    userId: 2,
    title: "Weekly Team Meeting",
    description: "Attend the weekly team meeting",
    dueDate: "2023-08-05",
    priority: "low",
    completed: true,
  },
]

// Mock course sections and videos
export const courseSections = [
  {
    id: 1,
    courseId: 1,
    title: "Introduction to HTML",
    order: 1,
    videos: [
      {
        id: 1,
        title: "HTML Basics",
        description: "Learn the fundamentals of HTML",
        youtubeUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
        duration: "15:30",
      },
      {
        id: 2,
        title: "HTML Elements",
        description: "Understanding HTML elements and their usage",
        youtubeUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
        duration: "12:45",
      },
    ],
  },
  {
    id: 2,
    courseId: 1,
    title: "CSS Fundamentals",
    order: 2,
    videos: [
      {
        id: 3,
        title: "CSS Selectors",
        description: "Learn about different CSS selectors",
        youtubeUrl: "https://www.youtube.com/embed/1PnVor36_40",
        duration: "18:20",
      },
      {
        id: 4,
        title: "CSS Box Model",
        description: "Understanding the CSS box model",
        youtubeUrl: "https://www.youtube.com/embed/rIO5326FgPE",
        duration: "14:10",
      },
    ],
  },
  {
    id: 3,
    courseId: 2,
    title: "React Fundamentals",
    order: 1,
    videos: [
      {
        id: 5,
        title: "Introduction to React",
        description: "Learn the basics of React",
        youtubeUrl: "https://www.youtube.com/embed/Tn6-PIqc4UM",
        duration: "20:15",
      },
      {
        id: 6,
        title: "React Components",
        description: "Understanding React components",
        youtubeUrl: "https://www.youtube.com/embed/Ke90Tje7VS0",
        duration: "22:30",
      },
    ],
  },
  {
    id: 4,
    courseId: 2,
    title: "Advanced React Patterns",
    order: 2,
    videos: [
      {
        id: 7,
        title: "React Hooks",
        description: "Learn about React hooks",
        youtubeUrl: "https://www.youtube.com/embed/TNhaISOUy6Q",
        duration: "25:40",
      },
      {
        id: 8,
        title: "Context API",
        description: "Understanding the Context API",
        youtubeUrl: "https://www.youtube.com/embed/35lXWvCuM8o",
        duration: "18:55",
      },
    ],
  },
  {
    id: 5,
    courseId: 3,
    title: "UI Design Principles",
    order: 1,
    videos: [
      {
        id: 9,
        title: "Color Theory",
        description: "Learn about color theory in UI design",
        youtubeUrl: "https://www.youtube.com/embed/AvgCkHrcj8w",
        duration: "16:20",
      },
      {
        id: 10,
        title: "Typography",
        description: "Understanding typography in UI design",
        youtubeUrl: "https://www.youtube.com/embed/QrNi9FmdlxY",
        duration: "14:45",
      },
    ],
  },
  {
    id: 6,
    courseId: 4,
    title: "Node.js Basics",
    order: 1,
    videos: [
      {
        id: 11,
        title: "Introduction to Node.js",
        description: "Learn the basics of Node.js",
        youtubeUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
        duration: "19:30",
      },
      {
        id: 12,
        title: "Node.js Modules",
        description: "Understanding Node.js modules",
        youtubeUrl: "https://www.youtube.com/embed/xHLd36QoS4k",
        duration: "17:15",
      },
    ],
  },
]

// Mock courses data
export const courses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    category: "Web Development",
    price: 29.99,
    creatorId: 2,
    rating: 4.5,
    ratingCount: 120,
    preview: "This course covers the fundamentals of web development...",
  },
  {
    id: 2,
    title: "Advanced React Techniques",
    description: "Master advanced React concepts and patterns",
    category: "JavaScript",
    price: 49.99,
    creatorId: 1,
    rating: 4.8,
    ratingCount: 85,
    preview: "Take your React skills to the next level with advanced techniques...",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Learn the principles of effective UI/UX design",
    category: "Design",
    price: 39.99,
    creatorId: 2,
    rating: 4.2,
    ratingCount: 95,
    preview: "Understand the core principles of creating user-friendly interfaces...",
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node.js",
    category: "Backend",
    price: 59.99,
    creatorId: 1,
    rating: 4.6,
    ratingCount: 110,
    preview: "Learn how to create robust backend systems using Node.js...",
  },
]

// Helper functions to mimic database operations
export function getUserById(id) {
  return users.find((user) => user.id === id)
}

export function getUserByEmail(email) {
  return users.find((user) => user.email === email)
}

export function getTasksByUserId(userId) {
  return tasks.filter((task) => task.userId === userId)
}

export function getCourseById(id) {
  return courses.find((course) => course.id === id)
}

export function getEnrolledCourses(userId) {
  const user = getUserById(userId)
  if (!user) return []
  return user.enrolledCourses.map((courseId) => getCourseById(courseId))
}

export function getPaymentHistory(userId) {
  const user = getUserById(userId)
  return user ? user.paymentHistory : []
}

export function getAllCourses() {
  return courses
}

export function getCoursesByCategory(category) {
  return courses.filter((course) => course.category === category)
}

export function searchCourses(query) {
  const lowerQuery = query.toLowerCase()
  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery) ||
      course.category.toLowerCase().includes(lowerQuery),
  )
}

export function getCourseSections(courseId) {
  return courseSections.filter((section) => section.courseId === courseId).sort((a, b) => a.order - b.order)
}

export function getCourseVideos(sectionId) {
  const section = courseSections.find((section) => section.id === sectionId)
  return section ? section.videos : []
}

export function getAllCourseSectionsWithVideos(courseId) {
  return courseSections.filter((section) => section.courseId === courseId).sort((a, b) => a.order - b.order)
}

export function isUserAdmin(userId) {
  const user = getUserById(userId)
  return user && user.role === "admin"
}
