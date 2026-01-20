'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../../lib/auth';
import LoadingSpinner from '../UI/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: session, isPending: isLoading } = useSession();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!session?.user) {
    // Redirect to login if not authenticated
    router.push('/login');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;