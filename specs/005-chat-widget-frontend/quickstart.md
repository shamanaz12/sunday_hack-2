# Quickstart Guide: Chat Widget Frontend Component

## Prerequisites
- Node.js 18+ installed
- Next.js 14.2.5 project set up
- TypeScript 5.0+
- Access to backend API at http://127.0.0.1:8000/chat

## Installation

1. Clone or navigate to your Next.js project directory
2. Install required dependencies:
```bash
npm install react react-dom next typescript @types/react @types/node @types/react-dom
```

## Setup

1. Create the component directory structure:
```bash
mkdir -p components/Chat
mkdir -p components/UI
mkdir -p services/api
mkdir -p types
```

2. Add the following files to their respective directories:

### Component Files
- `components/Chat/ChatWidget.tsx` - Main chat widget component
- `components/Chat/ChatMessage.tsx` - Individual message display component
- `components/Chat/ChatInput.tsx` - Input field component
- `components/Chat/ChatHistory.tsx` - Chat history display component
- `components/UI/LoadingSpinner.tsx` - Loading indicator component
- `components/UI/ErrorMessage.tsx` - Error display component
- `types/chat.ts` - TypeScript types for chat entities

### Service Files
- `services/api/chatService.ts` - API service for chat communication

## Basic Usage

1. Import and use the ChatWidget component in your Next.js page:
```tsx
import ChatWidget from '@/components/Chat/ChatWidget';

export default function ChatPage() {
  return (
    <div className="container mx-auto">
      <h1>Chat Interface</h1>
      <ChatWidget />
    </div>
  );
}
```

2. The ChatWidget will handle:
   - Displaying chat history
   - Allowing user input
   - Communicating with the backend API
   - Showing loading states
   - Handling and displaying errors

## API Configuration

The chat service is configured to communicate with the backend API at `http://127.0.0.1:8000/chat`. If you need to change this endpoint, update the URL in `services/api/chatService.ts`.

## Running the Component

1. Start your Next.js development server:
```bash
npm run dev
```

2. Navigate to the page where you've placed the ChatWidget component

## Testing

Unit tests are located in the `tests/` directory:
- `tests/components/ChatWidget.test.tsx` - Tests for the chat widget component
- `tests/services/chatService.test.tsx` - Tests for the chat service

Run tests with:
```bash
npm test
```

## Troubleshooting

- If API requests fail, ensure the backend server is running at http://127.0.0.1:8000
- Check browser console for any JavaScript errors
- Verify that the API endpoint accepts POST requests with JSON payloads
- Ensure the request format matches the API contract: `{ query: string, chat_history: string[] }`