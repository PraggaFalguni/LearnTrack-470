const API_URL = 'http://localhost:8000/api';

export const api = {
  // Auth
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  async register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  async getProfile() {
    return await authenticatedRequest(`${API_URL}/auth/profile`);
  },

  // Courses
  async getCourses() {
    const response = await fetch(`${API_URL}/courses`);
    return handleResponse(response);
  },

  async getCourse(id) {
    const response = await fetch(`${API_URL}/courses/${id}`);
    return handleResponse(response);
  },

  async createCourse(courseData) {
    return await authenticatedRequest(`${API_URL}/courses`, {
      method: 'POST',
      body: JSON.stringify(courseData)
    });
  },

  async updateCourse(id, courseData) {
    return await authenticatedRequest(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData)
    });
  },

  async enrollCourse(courseId) {
    return await authenticatedRequest(`${API_URL}/courses/${courseId}/enroll`, {
      method: 'POST'
    });
  },

  async rateCourse(courseId, rating, review) {
    return await authenticatedRequest(`${API_URL}/courses/${courseId}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating, review })
    });
  },

  // Tasks
  async getCourseTasks(courseId) {
    return await authenticatedRequest(`${API_URL}/tasks/course/${courseId}`);
  },

  async createTask(taskData) {
    return await authenticatedRequest(`${API_URL}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
  },

  async submitTask(taskId, submissionUrl) {
    return await authenticatedRequest(`${API_URL}/tasks/${taskId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ submissionUrl })
    });
  },

  async updateTaskStatus(taskId, status) {
    return await authenticatedRequest(`${API_URL}/tasks/${taskId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  // Payments
  async processPayment(courseId) {
    return await authenticatedRequest(`${API_URL}/payments/${courseId}`, {
      method: 'POST'
    });
  }
};

// Helper functions
async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

async function authenticatedRequest(url, options = {}) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  return handleResponse(response);
}

export default api;
