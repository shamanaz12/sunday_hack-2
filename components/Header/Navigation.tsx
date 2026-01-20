'use client';

import Link from 'next/link';
import { useSession } from '../../lib/auth'; // Corrected path to match the location

const Navigation = () => {
  const { data: session, isPending: isLoading } = useSession();

  if (isLoading) {
    // Show loading state while checking session
    return (
      <div className="flex items-center space-x-4">
        <div className="px-4 py-2 rounded-lg text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {session?.user ? (
        <div className="flex space-x-3">
          <Link href="/" className="px-3 py-2 rounded-lg text-white hover:bg-emerald-500 transition-colors">
            Dashboard
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