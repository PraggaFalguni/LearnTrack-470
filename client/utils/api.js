import axios from "axios";

// Ensure the API URL includes the /api prefix
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log the full URL being requested
    console.log("API Request:", {
      fullUrl: `${config.baseURL}${config.url}`,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    if (error.response?.status === 401) {
      // Clear auth data on 401
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      if (response.data.success) {
        authAPI.setToken(response.data.token);
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  register: async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      if (response.data.success) {
        authAPI.setToken(response.data.token);
      }
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },
  getMe: () => api.get("/auth/me"),
  setToken: (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
       api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  },
};

// Tasks API
//all the functions is in contoller ex:getTasks...
export const tasksAPI = {
  getTasks: () => api.get("/tasks"),
  getPendingTasks: () => api.get("/tasks/status/pending"),
  getCompletedTasks: () => api.get("/tasks/status/completed"),
  getDueSoonTasks: () => api.get("/tasks/due-soon"), 
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (data) => api.post("/tasks", data),
  updateTask: (id, data) => api.patch(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};



//Courses API
export const coursesAPI = {
  getCourses: () => api.get("/courses"),
  getCourse: (id) => api.get(`/courses/${id}`),
  createCourse: (data) => api.post("/courses", data),
  updateCourse: (id, data) => api.patch(`/courses/${id}`, data),
  deleteCourse: (id) => api.delete(`/courses/${id}`),
  enrollCourse: (id) => api.post(`/courses/${id}/enroll`),
  rateCourse: (id, data) => api.post(`/courses/${id}/rate`, data),
  completeCourse: (id) => api.post(`/courses/${id}/complete`),
};

export default api;
