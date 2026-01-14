'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Check if user is logged in (this would typically check for auth tokens)
  useEffect(() => {
    // In a real implementation, this would check for auth tokens in cookies/localStorage
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggedIn(true);
      // In a real app, you might fetch user details here
      setUserName(localStorage.getItem('user-name') || 'User');
    }
  }, []);

  const handleLogout = () => {
    // In a real implementation, this would clear auth tokens
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-name');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <div className="flex space-x-3">
          <Link href="/dashboard" className="px-3 py-2 rounded-lg text-white hover:bg-blue-500 transition-colors">
            Dashboard
          </Link>
          <Link href="/tasks" className="px-3 py-2 rounded-lg text-white hover:bg-blue-500 transition-colors">
            Tasks
          </Link>
          <Link href="/calendar" className="px-3 py-2 rounded-lg text-white hover:bg-blue-500 transition-colors">
            Calendar
          </Link>
        </div>
      ) : (
        <div className="flex space-x-3">
          <Link href="/login" className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-50 transition-colors">
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;