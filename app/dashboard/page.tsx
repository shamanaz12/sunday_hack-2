'use client';

import { useState, useEffect } from 'react';
import { Task } from '../../types';
import Header from '../../components/Header/Header';
import Button from '../../components/UI/Button';
import { Card, CardContent } from '../../components/UI/Card';
import { todoApi } from '../../lib/todo-api';
import { useSession } from '../../lib/auth';
import ChatWidget from '../../components/Chat/ChatWidget';

const DashboardPageContent = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low'|'medium'|'high',
    completed: false
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await todoApi.getTasks();
      setTasks(fetchedTasks);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch tasks');
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'all') return true;
      return filter === 'pending' ? !task.completed : task.completed;
    })
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title.trim()) {
      try {
        // Map priority string to integer for API
        const priorityValue = newTask.priority === 'low' ? 0 : newTask.priority === 'high' ? 2 : 1;

        const createdTask = await todoApi.createTask({
          title: newTask.title,
          description: newTask.description || '',
          completed: false,
          priority: priorityValue,
        });
        setTasks([createdTask, ...tasks]);
        setNewTask({ title: '', description: '', priority: 'medium', completed: false });
      } catch (error: any) {
        setError(error.message || 'Failed to add task');
        console.error("Failed to add task", error);
      }
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await todoApi.deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (error: any) {
        setError(error.message || 'Failed to delete task');
        console.error("Failed to delete task", error);
      }
    }
  };

  const handleToggleComplete = async (id: string) => {
    try {
      const updatedTask = await todoApi.toggleTaskCompletion(id);
      setTasks(tasks.map(task =>
        task.id === id
          ? updatedTask
          : task
      ));
    } catch (error: any) {
      setError(error.message || 'Failed to toggle task completion');
      console.error("Failed to toggle task completion", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description || '',
      priority: (typeof task.priority === 'number'
        ? (task.priority === 0 ? 'low' : task.priority === 2 ? 'high' : 'medium')
        : task.priority) || 'medium',
      completed: task.completed
    });
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask && newTask.title.trim()) {
      try {
        // Map priority string to integer for API
        const priorityValue = newTask.priority === 'low' ? 0 : newTask.priority === 'high' ? 2 : 1;

        const updatedTask = await todoApi.updateTask(editingTask.id, {
          title: newTask.title,
          description: newTask.description,
          completed: newTask.completed,
          priority: priorityValue
        });
        setTasks(tasks.map(task =>
          task.id === editingTask.id
            ? updatedTask
            : task
        ));
        setEditingTask(null);
        setNewTask({ title: '', description: '', priority: 'medium', completed: false });
      } catch (error: any) {
        setError(error.message || 'Failed to update task');
        console.error("Failed to update task", error);
      }
    }
  };

  const getPriorityLabel = (priority: 'low' | 'medium' | 'high' | number | undefined): string => {
    if (priority === undefined) {
      return 'MED';
    }
    if (typeof priority === 'number') {
      return priority === 0 ? 'LOW' : priority === 2 ? 'HIGH' : 'MED';
    }
    return priority.toUpperCase().substring(0, 3);
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high' | number | undefined) => {
    if (priority === undefined) {
      return 'bg-gray-100 text-gray-700 border-gray-200';
    }

    let priorityStr = '';
    if (typeof priority === 'number') {
      // Convert integer priority to string
      priorityStr = priority === 0 ? 'low' : priority === 2 ? 'high' : 'medium';
    } else {
      priorityStr = priority;
    }

    switch(priorityStr) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
          <p className="text-lg text-emerald-700">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md mx-4" role="alert">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={fetchTasks}
            className="mt-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <Header />
      <ChatWidget />
      <main className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
            Todo Dashboard
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Manage your tasks with beautiful light green design
          </p>
          <div className="text-left text-gray-800 max-w-2xl mx-auto space-y-3 p-6 bg-white rounded-xl shadow-lg border border-emerald-100">
            <h2 className="text-2xl font-bold text-emerald-700 mb-3">1️⃣ Ye “TaskFlow” kya hai?</h2>
            <p className="text-lg leading-relaxed">
              TaskFlow ek Task / To-Do Management Web App hai. Iska simple matlab:
            </p>
            <ul className="list-none space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-emerald-600">👉</span>
                <span>User apne daily kaam (tasks) likh asakta hai</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-emerald-600">👉</span>
                <span>Un tasks ko dekh, edit, delete kar sakta hai</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-emerald-600">👉</span>
                <span>Apni zindagi / kaam ko organize karne ke liye</span>
              </li>
            </ul>
            <p className="text-lg font-semibold mt-4">Jaise:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>doodh lana</li>
              <li>office ka kaam</li>
              <li>personal reminders</li>
            </ul>
          </div>
        </div>

        {/* Stats Cards - Light Green Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 uppercase tracking-wide">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 uppercase tracking-wide">Completed</p>
                  <p className="text-3xl font-bold text-emerald-700 mt-1">{stats.completed}</p>
                </div>
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700 uppercase tracking-wide">Pending</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{stats.pending}</p>
                </div>
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Add Task Form */}
          <div className="lg:col-span-2">
            <Card className="border border-emerald-200 shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingTask ? '✏️ Edit Task' : '➕ Add New Task'}
                  </h2>
                </div>

                <form onSubmit={editingTask ? handleUpdateTask : handleAddTask} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="Enter your task title..."
                      className="w-full p-4 border-2 border-emerald-200 bg-emerald-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-lg shadow-sm hover:shadow-md"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      placeholder="Add description (optional)..."
                      rows={3}
                      className="w-full p-4 border-2 border-emerald-200 bg-emerald-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-vertical shadow-sm hover:shadow-md"
                    />
                  </div>
                  <div>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'low'|'medium'|'high'})}
                      className="w-full p-4 border-2 border-emerald-200 bg-emerald-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm hover:shadow-md"
                    >
                      <option value="low">🟢 Low Priority</option>
                      <option value="medium">🟡 Medium Priority</option>
                      <option value="high">🔴 High Priority</option>
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
                    >
                      {editingTask ? 'Update Task' : 'Add Task'}
                    </Button>
                    {editingTask && (
                      <Button
                        type="button"
                        onClick={() => {
                          setEditingTask(null);
                          setNewTask({ title: '', description: '', priority: 'medium', completed: false });
                        }}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="lg:col-span-1 lg:row-span-2">
            <Card className="border border-emerald-200 shadow-lg sticky top-8 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </h3>
                <div className="space-y-3">
                  {(['all', 'pending', 'completed'] as const).map((type) => {
                    const count = type === 'all' ? stats.total : type === 'pending' ? stats.pending : stats.completed;
                    return (
                      <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                          filter === type
                            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl shadow-emerald-500/25 border-emerald-500'
                            : 'bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-300 text-gray-800 hover:bg-emerald-100 shadow-md hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full shadow-sm ${filter === type ? 'bg-white scale-110' : 'bg-emerald-400'}`} />
                          <span className="font-semibold capitalize">{type === 'all' ? 'All Tasks' : type}</span>
                        </div>
                        <span className="text-lg font-bold">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TASKS LIST - CLEAR SHOW LIST */}
          <div className="lg:col-span-3">
            <Card className="border border-emerald-200 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">📋 Tasks List</h2>
                      <p className="text-emerald-700 font-semibold">{filteredTasks.length} tasks showing</p>
                    </div>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border-2 border-emerald-200 bg-emerald-50 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                    />
                    <svg className="w-5 h-5 text-emerald-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {filteredTasks.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-r from-emerald-100 to-green-100 rounded-3xl flex items-center justify-center shadow-xl">
                      <svg className="w-16 h-16 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No tasks found</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Add your first task above or adjust filters/search
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTasks.map((task) => (
                      <div key={task.id} className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
                        task.completed
                          ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300 shadow-md'
                          : 'bg-white border-emerald-200 hover:border-emerald-300 shadow-sm'
                      }`}>
                        <div className="flex items-start gap-4">
                          {/* Checkbox */}
                          <div className="flex-shrink-0 mt-1 pt-0.5">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => handleToggleComplete(task.id)}
                              className="w-7 h-7 text-emerald-600 border-2 border-emerald-300 rounded-xl focus:ring-emerald-500 bg-white shadow-sm hover:scale-105 transition-all"
                            />
                          </div>

                          {/* Task Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex-1 pr-4">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className={`text-xl font-bold transition-all pr-2 ${
                                    task.completed
                                      ? 'line-through text-gray-500'
                                      : 'text-gray-900 group-hover:text-emerald-700'
                                  }`}>
                                    {task.title}
                                  </h3>
                                  <span className={`px-3 py-1 text-sm font-bold rounded-full shadow-sm border-2 ${getPriorityColor(task.priority || 'medium')}`}>
                                    {getPriorityLabel(task.priority || 'medium')}
                                  </span>
                                </div>

                                {task.description && (
                                  <p className={`text-gray-600 leading-relaxed transition-all ${
                                    task.completed ? 'line-through text-gray-400' : ''
                                  }`}>
                                    {task.description}
                                  </p>
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 ml-4 flex-shrink-0">
                                <button
                                  onClick={() => handleEditTask(task)}
                                  className="p-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-700 hover:text-emerald-800 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center group-hover:bg-emerald-300"
                                  title="Edit Task"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m1.5-3l-3-3" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="p-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center group-hover:bg-red-300"
                                  title="Delete Task"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <DashboardPageContent />
  );
}