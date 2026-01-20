import axios from 'axios';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types';
import { authClient } from './auth';

// Use Next.js API routes instead of direct backend calls
const NEXT_JS_API_URL = '';

// Helper function to get user ID from auth session
const getUserId = (): string => {
  // In a real implementation, this would retrieve the user ID from auth session
  // For now, using a default user ID for testing
  // You would typically get this from your auth provider
  if (typeof window !== 'undefined') {
    // Client-side code - you could retrieve from localStorage, session, etc.
    const storedUserId = localStorage.getItem('user-id');
    if (storedUserId) {
      return storedUserId;
    }
  }
  // Fallback to a default user ID for development
  return 'default-user-id';
};

export const todoApi = {
  async getTasks(): Promise<Task[]> {
    try {
      const userId = getUserId();
      const response = await axios.get(`${NEXT_JS_API_URL}/api/${userId}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async createTask(task: CreateTaskInput): Promise<Task> {
    try {
      const userId = getUserId();
      const response = await axios.post(`${NEXT_JS_API_URL}/api/${userId}/tasks`, task);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async updateTask(id: string, task: UpdateTaskInput): Promise<Task> {
    try {
      const userId = getUserId();
      const response = await axios.put(`${NEXT_JS_API_URL}/api/${userId}/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async deleteTask(id: string): Promise<Task> {
    try {
      const userId = getUserId();
      const response = await axios.delete(`${NEXT_JS_API_URL}/api/${userId}/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  async getTaskById(id: string): Promise<Task> {
    try {
      const userId = getUserId();
      const response = await axios.get(`${NEXT_JS_API_URL}/api/${userId}/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  async toggleTaskCompletion(id: string): Promise<Task> {
    try {
      const userId = getUserId();
      const response = await axios.patch(`${NEXT_JS_API_URL}/api/${userId}/tasks/${id}/complete`);
      return response.data;
    } catch (error) {
      console.error('Error toggling task completion:', error);
      throw error;
    }
  },

  async sendMessage(message: string, chatHistory: string[] = []): Promise<{
    response: string;
    action_taken?: string;
    agent_used?: string;
    task_data?: any;
  }> {
    try {
      const userId = getUserId();
      // Call the backend chat endpoint with user_id
      const CHAT_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await axios.post(`${CHAT_API_URL}/chat`, {
        query: message,
        user_id: userId,
        chat_history: chatHistory
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Get user ID helper (exposed for components)
  getUserId(): string {
    return getUserId();
  }
};
