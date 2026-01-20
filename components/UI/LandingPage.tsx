'use client';

import Link from 'next/link';
import { useState } from 'react';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-800">TaskFlow</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Home</Link>
              <Link href="/dashboard" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Dashboard</Link>
              <Link href="/about" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">About</Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg">
                Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="text-slate-600 hover:text-emerald-600 font-medium px-2 py-2">Home</Link>
                <Link href="/dashboard" className="text-slate-600 hover:text-emerald-600 font-medium px-2 py-2">Dashboard</Link>
                <Link href="/about" className="text-slate-600 hover:text-emerald-600 font-medium px-2 py-2">About</Link>
                <hr className="border-slate-200" />
                <Link href="/login" className="text-slate-600 hover:text-emerald-600 font-medium px-2 py-2">Sign In</Link>
                <Link href="/signup" className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium text-center">Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Built for Focused Work
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
              Turn Tasks<br />
              <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">Into Progress.</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              A modern task manager designed around clarity, flow, and execution — so you always know what to do next.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl">
                Get Started
              </Link>
              <Link href="/login" className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-semibold text-lg hover:border-emerald-300 hover:text-emerald-600 transition-all">
                Sign In
              </Link>
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="mt-20 flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-white px-5 py-3 rounded-full shadow-md border border-slate-100">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-slate-700 font-medium">Plan Tasks</span>
            </div>
            <div className="flex items-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-center bg-white px-5 py-3 rounded-full shadow-md border border-slate-100">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
              <span className="text-slate-700 font-medium">Focus</span>
            </div>
            <div className="flex items-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-center bg-white px-5 py-3 rounded-full shadow-md border border-slate-100">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <span className="text-slate-700 font-medium">Work Deeply</span>
              <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">In Progress</span>
            </div>
            <div className="flex items-center text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-center bg-white px-5 py-3 rounded-full shadow-md border border-slate-100">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
              <span className="text-slate-700 font-medium">Ship & Finish</span>
              <span className="ml-2 text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">Done</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Powerful Features for Maximum Focus
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage tasks efficiently — clean, fast and distraction-free.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Smart Task Management</h3>
              <p className="text-slate-600">Create, organize, and prioritize your tasks with an intuitive workflow.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Advanced Filtering</h3>
              <p className="text-slate-600">Filter tasks by priority, status, or deadline and stay focused.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600">Instant updates and smooth performance across all devices.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure & Private</h3>
              <p className="text-slate-600">Industry-standard security keeps your tasks safe and private.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Ready to boost your productivity?
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Organizing<br />Your Tasks Today
              </h2>

              <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
                Join thousands of focused people using TaskFlow to plan better, work smarter, and achieve more every day.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Link href="/signup" className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all shadow-lg">
                  Get Started Free
                </Link>
                <Link href="/about" className="bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                  Learn More
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-emerald-100 text-sm">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  No credit card required
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free forever
                </span>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Setup in 30 seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">TaskFlow</span>
              </Link>
              <p className="text-slate-400 max-w-md">
                Organize your life, one task at a time. Simple, powerful, and efficient task management.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center">
            <p>&copy; 2026 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
