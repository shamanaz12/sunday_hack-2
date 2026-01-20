// tests/services/chatService.test.ts
import { chatService } from '@/services/api/chatService';
import { ChatRequestPayload, ChatApiResponse } from '@/types/chat';

// Mock fetch
global.fetch = jest.fn();

describe('chatService', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('sendMessage successfully sends a message and receives a response', async () => {
    const mockPayload: ChatRequestPayload = {
      query: 'Test query',
      chat_history: ['Previous message']
    };

    const mockResponse: ChatApiResponse = {
      response: 'Mock response',
      timestamp: new Date().toISOString(),
      action_taken: 'processed_query'
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await chatService.sendMessage(mockPayload);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:8000/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockPayload),
      }
    );
  });

  test('sendMessage throws an error when API returns non-ok response', async () => {
    const mockPayload: ChatRequestPayload = {
      query: 'Test query',
      chat_history: []
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ detail: 'Internal server error' })
    });

    await expect(chatService.sendMessage(mockPayload)).rejects.toThrow('Internal server error');
  });

  test('sendMessage throws an error when fetch fails', async () => {
    const mockPayload: ChatRequestPayload = {
      query: 'Test query',
      chat_history: []
    };

    (global.fetch as jest.Mock).mockRejectedValue(new TypeError('Network error'));

    await expect(chatService.sendMessage(mockPayload)).rejects.toThrow(
      'Network error: Unable to connect to the server. Please check your connection.'
    );
  });
});