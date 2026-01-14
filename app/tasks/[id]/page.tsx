'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Task } from '../../../types';

const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        // In a real implementation, this would call the API to get the task
        // For demo purposes, we'll simulate the data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock task data
        const mockTask: Task = {
          id: id,
          title: 'Sample Task',
          description: 'This is a sample task description',
          completed: false,
          userId: 'user123',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        setTask(mockTask);
        setTitle(mockTask.title);
        setDescription(mockTask.description || '');
      } catch (err) {
        setError('Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSave = async () => {
    try {
      // In a real implementation, this would call the API to update the task
      // For demo purposes, we'll simulate the update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock update
      const updatedTask: Task = {
        ...task!,
        title,
        description,
        updatedAt: new Date()
      };
      
      setTask(updatedTask);
      alert('Task updated successfully!');
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    try {
      // In a real implementation, this would call the API to delete the task
      // For demo purposes, we'll simulate the deletion
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect to dashboard after deletion
      router.push('/');
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const toggleCompletion = async () => {
    try {
      // In a real implementation, this would call the API to toggle completion
      // For demo purposes, we'll simulate the toggle
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedTask = {
        ...task!,
        completed: !task!.completed,
        updatedAt: new Date()
      };
      
      setTask(updatedTask);
    } catch (err) {
      setError('Failed to update task status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Task not found</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Task Details
              </h3>
              <Link href="/" className="text-blue-600 hover:underline">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-center">
                  <input
                    id="completed"
                    name="completed"
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleCompletion}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="completed" className="ml-2 block text-sm text-gray-900">
                    Mark as completed
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <div>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Task
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;