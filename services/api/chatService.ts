// services/api/chatService.ts
import { ChatRequestPayload, ChatApiResponse, ApiError } from '@/types/chat';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

class ChatService {
  async sendMessage(payload: ChatRequestPayload): Promise<ChatApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          detail: `HTTP error! status: ${response.status}`
        }));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data: ChatApiResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the server. Please check your connection.');
      }
      throw error;
    }
  }
}

export const chatService = new ChatService();
export default ChatService;