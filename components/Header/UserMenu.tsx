'use client';

import { useState, useEffect } from 'react';

const UserMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center">
          <span className="font-semibold">{userName.charAt(0)}</span>
        </div>
        <span className="hidden md:inline-block font-medium">{userName}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hidden md:block" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* User Dropdown */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <p className="font-semibold text-gray-800">{userName}</p>
            <p className="text-sm text-gray-600 truncate">{localStorage.getItem('user-email') || 'user@example.com'}</p>
          </div>
          <div className="py-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Billing</a>
          </div>
          <div className="border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;