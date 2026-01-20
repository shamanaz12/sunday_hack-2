export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId?: string;
  createdAt: Date;
  updatedAt?: Date;
  completedAt?: Date;
  priority?: 'low' | 'medium' | 'high' | number;
}

// API expects these types
export interface CreateTaskInput {
  title: string;
  description?: string;
  completed?: boolean;
  priority?: number;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: number;
}