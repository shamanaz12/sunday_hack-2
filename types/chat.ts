// types/chat.ts
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'system';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'error';
}

export interface ChatHistory {
  sessionId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRequestPayload {
  query: string;
  chat_history: string[];
}

export interface ChatApiResponse {
  response: string;
  timestamp: string;
  action_taken: string;
}

export interface ApiError {
  detail: string;
}