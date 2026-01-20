'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { signUp } from '../../lib/auth';

const SignupPageContent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      // Using Better Auth for registration
      const response = await signUp.email({
        email,
        password,
        name,
        callbackURL: '/dashboard', // Redirect to dashboard after signup
      });

      if (response.error) {
        setError(response.error.message || 'Registration failed');
      }
      // On successful signup, redirect will happen automatically
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
            <div className="bg-white p-3 rounded-2xl shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
        </div>
        <h2 className="text-center text-4xl font-bold text-emerald-800">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-lg text-gray-600">
            Join us and start managing your tasks!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="border border-emerald-200 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 bg-emerald-50 rounded-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 bg-emerald-50 rounded-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 bg-emerald-50 rounded-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 border-2 border-emerald-200 bg-emerald-50 rounded-lg focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Sign up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function SignupPage() {
  return (
    <SignupPageContent />
  );
}