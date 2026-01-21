'use client';

import { useState, useEffect } from 'react';
import { Task } from '../../types';
import TaskItem from '../UI/TaskItem';
import ErrorDisplay from '../UI/ErrorDisplay';
import LoadingSpinner from '../UI/LoadingSpinner';

interface TaskTableProps {
  userId: string;
}

const TaskTable = ({ userId }: TaskTableProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch tasks for the user
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // In a real implementation, this would call the API to get tasks
        // For demo purposes, we'll simulate the data
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock tasks data
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Complete project proposal',
            description: 'Finish the project proposal document and submit to the team',
            completed: false,
            userId: userId,
            createdAt: new Date(Date.now() - 86400000), // 1 day ago
            updatedAt: new Date(Date.now() - 86400000)
          },
          {
            id: '2',
            title: 'Team meeting preparation',
            description: 'Prepare slides and agenda for the weekly team meeting',
            completed: true,
            userId: userId,
            createdAt: new Date(Date.now() - 172800000), // 2 days ago
            updatedAt: new Date(Date.now() - 172800000),
            completedAt: new Date(Date.now() - 86400000)
          },
          {
            id: '3',
            title: 'Update documentation',
            description: 'Review and update the API documentation with new endpoints',
            completed: false,
            userId: userId,
            createdAt: new Date(Date.now() - 43200000), // 12 hours ago
            updatedAt: new Date(Date.now() - 43200000)
          },
          {
            id: '4',
            title: 'Client feedback review',
            description: 'Review feedback from the client and create action items',
            completed: false,
            userId: userId,
            createdAt: new Date(Date.now() - 3600000), // 1 hour ago
            updatedAt: new Date(Date.now() - 3600000)
          },
          {
            id: '5',
            title: 'Code review',
            description: 'Perform code review for the pull request #123',
            completed: true,
            userId: userId,
            createdAt: new Date(Date.now() - 259200000), // 3 days ago
            updatedAt: new Date(Date.now() - 172800000),
            completedAt: new Date(Date.now() - 172800000)
          }
        ];

        setTasks(mockTasks);
      } catch (err: any) {
        setError(err.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  // Apply filters and sorting
  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      } else {
        return sortOrder === 'asc' 
          ? a.createdAt.getTime() - b.createdAt.getTime() 
          : b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const handleToggleTask = async (task: Task) => {
    try {
      // In a real implementation, this would call the API to toggle task completion
      // For demo purposes, we'll update the local state
      await new Promise(resolve => setTimeout(resolve, 300));

      const updatedTasks = tasks.map(t =>
        t.id === task.id ? { ...t, completed: !t.completed, updatedAt: new Date(), completedAt: !t.completed ? new Date() : undefined } : t
      );

      setTasks(updatedTasks);
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      // In a real implementation, this would call the API to delete the task
      // For demo purposes, we'll update the local state
      await new Promise(resolve => setTimeout(resolve, 300));

      const updatedTasks = tasks.filter(t => t.id !== taskId);
      setTasks(updatedTasks);
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => {
          setError('');
          // Re-fetch tasks when retry is clicked
          const fetchTasks = async () => {
            try {
              setLoading(true);
              // Mock API call
              await new Promise(resolve => setTimeout(resolve, 500));

              const mockTasks: Task[] = [
                {
                  id: '1',
                  title: 'Sample Task 1',
                  description: 'This is a sample task description',
                  completed: false,
                  userId: userId,
                  createdAt: new Date(),
                  updatedAt: new Date()
                },
                {
                  id: '2',
                  title: 'Completed Task',
                  description: 'This task is already completed',
                  completed: true,
                  userId: userId,
                  createdAt: new Date(),
                  updatedAt: new Date()
                },
                {
                  id: '3',
                  title: 'Another Sample Task',
                  description: 'This is another sample task',
                  completed: false,
                  userId: userId,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
              ];

              setTasks(mockTasks);
            } catch (err: any) {
              setError(err.message || 'Failed to load tasks');
            } finally {
              setLoading(false);
            }
          };
          fetchTasks();
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Filters and Sorting Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'active'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'completed'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
        </div>

        <div className="flex space-x-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
          >
            {sortOrder === 'asc' ? (
              <>
                <span>Ascending</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </>
            ) : (
              <>
                <span>Descending</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Task Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredAndSortedTasks.length}</span> of{' '}
          <span className="font-semibold">{tasks.length}</span> tasks
        </p>
      </div>

      {/* Task List */}
      <div>
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
            <p className="mt-1 text-gray-500">
              {filter === 'all' 
                ? 'Get started by creating a new task.' 
                : filter === 'active' 
                  ? 'All tasks are completed! Great job!' 
                  : 'No tasks have been completed yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskTable;