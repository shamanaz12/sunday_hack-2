'use client';

import { Task } from '../../types';
import Link from 'next/link';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const handleToggle = () => {
    onToggle(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className={`border rounded-xl p-5 mb-4 flex items-center justify-between transition-all duration-300 hover:shadow-md ${
      task.completed
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center w-full">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-300 ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-400'
          }`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <Link
            href={`/tasks/${task.id}`}
            className={`text-lg font-medium ${
              task.completed
                ? 'text-green-700 line-through'
                : 'text-gray-800'
            } hover:text-indigo-600 transition-colors`}
          >
            {task.title}
          </Link>
          {task.description && (
            <p className={`mt-1 text-sm ${
              task.completed
                ? 'text-green-600'
                : 'text-gray-600'
            } line-clamp-2`}>
              {task.description}
            </p>
          )}

          <div className="mt-2 flex items-center text-xs text-gray-500">
            <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            {task.completedAt && (
              <span className="ml-3">Completed: {new Date(task.completedAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 ml-4">
        <Link
          href={`/tasks/${task.id}`}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </Link>

        <button
          onClick={handleDelete}
          className="p-2 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;