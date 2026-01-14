import { Task } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Helper function to get auth token from wherever it's stored
const getAuthToken = (): string | null => {
  // In a real implementation, this would retrieve the token from cookies, localStorage, etc.
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
};

// Generic request function with error handling
const request = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle responses that might not have JSON content
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // For responses like DELETE that return empty body
      return {};
    }
  } catch (error) {
    console.error(`API request failed: ${url}`, error);
    throw error;
  }
};

// User API functions
export const userAPI = {
  // Add user-specific API functions here if needed
};

// Task API functions
export const taskAPI = {
  // GET /api/{user_id}/tasks
  getTasks: async (userId: string): Promise<Task[]> => {
    return request(`/api/${userId}/tasks`);
  },

  // POST /api/{user_id}/tasks
  createTask: async (userId: string, taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    return request(`/api/${userId}/tasks`, {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  },

  // GET /api/{user_id}/tasks/{id}
  getTaskById: async (userId: string, taskId: string): Promise<Task> => {
    return request(`/api/${userId}/tasks/${taskId}`);
  },

  // PUT /api/{user_id}/tasks/{id}
  updateTask: async (userId: string, taskId: string, taskData: Partial<Task>): Promise<Task> => {
    return request(`/api/${userId}/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    });
  },

  // DELETE /api/{user_id}/tasks/{id}
  deleteTask: async (userId: string, taskId: string): Promise<void> => {
    await request(`/api/${userId}/tasks/${taskId}`, {
      method: "DELETE",
    });
  },

  // PATCH /api/{user_id}/tasks/{id}/complete
  toggleTaskCompletion: async (userId: string, taskId: string, completed: boolean): Promise<Task> => {
    return request(`/api/${userId}/tasks/${taskId}/complete`, {
      method: "PATCH",
      body: JSON.stringify({ completed }),
    });
  },
};