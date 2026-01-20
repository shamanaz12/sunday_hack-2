'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Task } from '../../../types';
import Header from '../../../components/Header/Header';
import { Card, CardContent } from '../../../components/UI/Card';
import Button from '../../../components/UI/Button';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import { useSession } from '../../../lib/auth';
import { todoApi } from '../../../lib/todo-api';

const TaskDetailPageContent = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending: isLoading } = useSession();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session?.user && !isLoading) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }

    const fetchTask = async () => {
      try {
        const fetchedTask = await todoApi.getTaskById(id);
        setTask(fetchedTask);
        setTitle(fetchedTask.title);
        setDescription(fetchedTask.description || '');

        // Convert integer priority to string for UI
        let priorityStr: 'low' | 'medium' | 'high' = 'medium';
        if (fetchedTask.priority !== undefined) {
          if (typeof fetchedTask.priority === 'number') {
            priorityStr = fetchedTask.priority === 0 ? 'low' :
                         fetchedTask.priority === 2 ? 'high' : 'medium';
          } else {
            priorityStr = fetchedTask.priority as 'low' | 'medium' | 'high';
          }
        }
        setPriority(priorityStr);
      } catch (err: any) {
        setError(err.message || 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchTask();
    }
  }, [id, session, isLoading, router]);

  const handleSave = async () => {
    if (!task) return;

    try {
      // Map priority string to integer for API
      const priorityValue = priority === 'low' ? 0 : priority === 'high' ? 2 : 1;

      const updatedTask = await todoApi.updateTask(task.id, {
        title,
        description,
        completed: task.completed,
        priority: priorityValue
      });

      setTask(updatedTask);
      alert('Task updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    if (!task) return;

    try {
      await todoApi.deleteTask(task.id);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
    }
  };

  const toggleCompletion = async () => {
    if (!task) return;

    try {
      // Map priority string to integer for API
      const priorityValue = priority === 'low' ? 0 : priority === 'high' ? 2 : 1;

      const updatedTask = await todoApi.updateTask(task.id, {
        ...task,
        completed: !task.completed,
        priority: priorityValue
      });

      setTask(updatedTask);
    } catch (err: any) {
      setError(err.message || 'Failed to update task status');
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold text-gray-700">Task not found</p>
          <Link href="/" className="text-emerald-600 hover:underline mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <Header />
      <main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="border border-emerald-200 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-emerald-200">
              <h2 className="text-3xl font-bold text-emerald-800">
                Task Details
              </h2>
              <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 bg-emerald-50 rounded-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 bg-emerald-50 rounded-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <div className="mt-1">
                  <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full p-3 border-2 border-emerald-200 bg-emerald-50 rounded-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  >
                    <option value="low">🟢 Low Priority</option>
                    <option value="medium">🟡 Medium Priority</option>
                    <option value="high">🔴 High Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="completed"
                  name="completed"
                  type="checkbox"
                  checked={task.completed}
                  onChange={toggleCompletion}
                  className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-emerald-300 rounded"
                />
                <label htmlFor="completed" className="ml-3 block text-lg text-gray-900">
                  Mark as completed
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Delete Task
              </Button>
              <div className="space-x-3">
                <Button
                  onClick={() => router.push('/')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default function TaskDetailPage() {
  return (
    <TaskDetailPageContent />
  );
}