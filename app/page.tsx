'use client';

import { useState, useEffect } from 'react';
import { Task } from '../types';
import Header from '../components/Header/Header';
import TaskTable from '../components/Dashboard/TaskTable';
import TaskForm from '../components/UI/TaskForm';
import TaskCompletionChart from '../components/Dashboard/TaskCompletionChart';
import StatsCards from '../components/Dashboard/StatsCards';
import ActivityFeed from '../components/Dashboard/ActivityFeed';
import Button from '../components/UI/Button';
import { Card, CardContent } from '../components/UI/Card';
import TaskIcon from '../components/Icons/TaskIcon';
import UserIcon from '../components/Icons/UserIcon';
import NotificationIcon from '../components/Icons/NotificationIcon';

const DashboardPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    // In a real implementation, this would check for auth tokens
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggedIn(true);
      // In a real app, you might fetch user details here
      setUserId(localStorage.getItem('user-id') || 'demo-user');
    } else {
      // Redirect to login if not authenticated
      window.location.href = '/login';
    }
  }, []);

  const handleCreateTask = (task: Task) => {
    // In a real implementation, this would update the task list from the API
    // For demo purposes, we'll just show an alert
    alert(`Task "${task.title}" created successfully!`);
  };

  if (!isLoggedIn) {
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your tasks today.</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCards
            title="Total Tasks"
            value="24"
            color="bg-gradient-to-r from-blue-500 to-blue-600"
            icon={<TaskIcon className="h-6 w-6 text-white" />}
          />
          <StatsCards
            title="Completed"
            value="18"
            color="bg-gradient-to-r from-green-500 to-green-600"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCards
            title="Pending"
            value="4"
            color="bg-gradient-to-r from-yellow-500 to-yellow-600"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCards
            title="Overdue"
            value="2"
            color="bg-gradient-to-r from-red-500 to-red-600"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Task Form and List */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>
                </div>
                {userId ? (
                  <TaskForm userId={userId} onCreateTask={handleCreateTask} />
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Recent Tasks</h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
                {userId ? (
                  <TaskTable userId={userId} />
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading tasks...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity and Quick Actions */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    fullWidth
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>Create Task</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>Export Tasks</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="border-2 border-green-500 text-green-700 hover:bg-green-50"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>Settings</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <ActivityFeed />

            {/* Task Completion Chart */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Task Completion</h2>
                <TaskCompletionChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;