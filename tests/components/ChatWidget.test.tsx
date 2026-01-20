// tests/components/ChatWidget.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatWidget from '@/components/Chat/ChatWidget';

// Mock the chatService
jest.mock('@/services/api/chatService', () => ({
  chatService: {
    sendMessage: jest.fn()
  }
}));

import { chatService } from '@/services/api/chatService';

describe('ChatWidget', () => {
  beforeEach(() => {
    (chatService.sendMessage as jest.MockedFunction<any>).mockClear();
  });

  test('renders chat interface correctly', () => {
    render(<ChatWidget />);
    
    expect(screen.getByText('TaskFlow Assistant')).toBeInTheDocument();
    expect(screen.getByText('Ask me to manage your tasks')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  test('allows user to type and send a message', async () => {
    (chatService.sendMessage as jest.MockedFunction<any>).mockResolvedValue({
      response: 'Mock response from server',
      timestamp: new Date().toISOString(),
      action_taken: 'processed_query'
    });

    render(<ChatWidget />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: 'Send' });
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });
  });

  test('disables send button when input is empty', () => {
    render(<ChatWidget />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: 'Send' });
    
    // Initially disabled since input is empty
    expect(sendButton).toBeDisabled();
    
    fireEvent.change(input, { target: { value: 'Non-empty message' } });
    expect(sendButton).not.toBeDisabled();
    
    fireEvent.change(input, { target: { value: '' } });
    expect(sendButton).toBeDisabled();
  });

  test('shows loading state when sending message', async () => {
    // Mock a delayed response to observe loading state
    (chatService.sendMessage as jest.MockedFunction<any>).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        response: 'Delayed response',
        timestamp: new Date().toISOString(),
        action_taken: 'processed_query'
      }), 100))
    );

    render(<ChatWidget />);
    
    const input = screen.getByPlaceholderText('Type your message...');
    const sendButton = screen.getByRole('button', { name: 'Send' });
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    // Check that loading spinner appears
    expect(screen.getByText('Processing your request...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Processing your request...')).not.toBeInTheDocument();
    });
  });
});