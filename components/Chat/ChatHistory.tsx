// components/Chat/ChatHistory.tsx
'use client';

import React from 'react';
import { ChatMessage } from '@/types/chat';

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to HTML
    return content
      .split('\n')
      .map((line, i) => {
        // Bold text
        line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        // Code blocks
        line = line.replace(/`([^`]+)`/g, '<code class="bg-gray-200 px-1 rounded text-sm">$1</code>');
        // Bullet points
        if (line.startsWith('•') || line.startsWith('-')) {
          return `<div class="ml-4">${line}</div>`;
        }
        return line;
      })
      .join('<br />');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <div className="text-4xl mb-4">💬</div>
          <p className="font-medium">Start a conversation!</p>
          <p className="text-sm mt-2">Try: &quot;add buy milk&quot; or &quot;show my tasks&quot;</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md'
                  : message.status === 'error'
                  ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-md'
                  : 'bg-white text-gray-800 shadow-md border border-gray-100 rounded-bl-md'
              }`}
            >
              {/* Agent Badge for system messages */}
              {message.sender === 'system' && message.status !== 'error' && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    🤖 TaskFlow Agent
                  </span>
                </div>
              )}

              {/* Message Content */}
              <div
                className="text-sm leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              />

              {/* Timestamp */}
              <div
                className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                {message.status === 'error' && (
                  <span className="ml-2 text-red-500">⚠️ Error</span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatHistory;
