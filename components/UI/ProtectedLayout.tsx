'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean; // If true, redirects to login if not authenticated
}

const ProtectedLayout = ({ children, requireAuth = true }: ProtectedLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('auth-token');
    
    if (requireAuth && !token) {
      // Redirect to login if authentication is required and user is not logged in
      router.push('/login');
    } else if (!requireAuth && token) {
      // Redirect to dashboard if user is logged in but this is a public route (like login/signup)
      router.push('/');
    } else {
      // Set authentication status
      setIsAuthenticated(!!token);
    }
  }, [requireAuth, router]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated, don't render children
  // (they should have been redirected by now)
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedLayout;