'use client';
import ChatWidget from '@/components/Chat/ChatWidget';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">TaskFlow Assistant</h1>
          <p className="text-gray-600">Chat with AI to manage your tasks</p>
        </div>
        <ChatWidget />
        <div className="mt-4 text-center">
          <a href="/dashboard" className="text-indigo-600 hover:underline">Go to Dashboard</a>
        </div>
      </div>
    </div>
  );
}
