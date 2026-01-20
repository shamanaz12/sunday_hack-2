'use client';

import Link from 'next/link';
import { useState } from 'react';

const AboutPageContent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-800">TaskFlow</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Home</Link>
              <Link href="/dashboard" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Dashboard</Link>
              <Link href="/about" className="text-emerald-600 font-medium">About</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Sign In</Link>
              <Link href="/signup" className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2 rounded-lg font-medium hover:from-emerald-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg">
                Sign Up
              </Link>
            </div>

            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="text-slate-600 hover:text-emerald-600 font-medium px-2 py-2">Home</Link>
                <Link href="/dashboard" className="text-slate-600 hover:text-emerald-600 font-medium px-2 py-2">Dashboard</Link>
                <Link href="/about" className="text-emerald-600 font-medium px-2 py-2">About</Link>
                <hr className="border-slate-200" />
                <Link href="/login" className="text-slate-600 hover:text-emerald-600 font-medium px-2 py-2">Sign In</Link>
                <Link href="/signup" className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium text-center">Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            About <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">TaskFlow</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We believe productivity should feel effortless. TaskFlow is designed to help you focus on what matters most.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6">
                At TaskFlow, we're on a mission to transform how people manage their daily tasks. We understand that in today's fast-paced world, staying organized isn't just about making lists—it's about creating a system that works with your natural workflow.
              </p>
              <p className="text-lg text-slate-600">
                Our platform combines simplicity with powerful features to help you achieve more without the overwhelm. Whether you're a student, professional, or entrepreneur, TaskFlow adapts to your needs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">10K+</div>
                  <div className="text-slate-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">500K+</div>
                  <div className="text-slate-600">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">99.9%</div>
                  <div className="text-slate-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">4.9/5</div>
                  <div className="text-slate-600">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Simplicity First</h3>
              <p className="text-slate-600">
                We believe the best tools get out of your way. Every feature is designed with simplicity at its core.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Privacy Matters</h3>
              <p className="text-slate-600">
                Your data belongs to you. We use industry-standard encryption and never sell your information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">User Focused</h3>
              <p className="text-slate-600">
                Every decision we make starts with one question: "How will this help our users succeed?"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Built with Modern Technology</h2>
          <p className="text-lg text-slate-600 mb-12">
            TaskFlow is powered by cutting-edge technologies to ensure the best performance and reliability.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-medium">Next.js 14</span>
            <span className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-medium">React 18</span>
            <span className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-medium">TypeScript</span>
            <span className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-medium">Tailwind CSS</span>
            <span className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-medium">FastAPI</span>
            <span className="px-6 py-3 bg-slate-100 rounded-full text-slate-700 font-medium">PostgreSQL</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-10 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-emerald-100 text-lg mb-8">
              Join thousands of users who are already boosting their productivity with TaskFlow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all shadow-lg">
                Create Free Account
              </Link>
              <Link href="/dashboard" className="bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all">
                Try Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">TaskFlow</span>
            </Link>
            <p>&copy; 2026 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function AboutPage() {
  return (
    <AboutPageContent />
  );
}