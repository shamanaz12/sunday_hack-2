'use client';
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinner from '../UI/LoadingSpinner';

interface Msg {
  id: string;
  text: string;
  role: 'user' | 'assistant';
}

export default function ChatWidget() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  useEffect(() => {
    setMsgs([
      {
        id: uuidv4(),
        text: 'Welcome! Commands:\n- add [task]\n- edit [old] to [new]\n- delete [task]\n- complete [task]\n- show tasks',
        role: 'assistant',
      },
    ]);
  }, []);

  const getUserId = () => {
    if (typeof window === 'undefined') return 'user1';
    let id = localStorage.getItem('uid');
    if (!id) {
      id = Math.random().toString(36).slice(2);
      localStorage.setItem('uid', id);
    }
    return id;
  };

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input;
    const newUserMessage: Msg = { id: uuidv4(), text: q, role: 'user' };
    setMsgs((p) => [...p, newUserMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${apiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          user_id: getUserId(),
          chat_history: msgs.map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      setMsgs((p) => [
        ...p,
        {
          id: uuidv4(),
          text: data.response || 'Done!',
          role: 'assistant',
        },
      ]);
    } catch (error) {
        // If the API call fails, remove the user's message from the UI.
        setMsgs((p) => p.filter((m) => m.id !== newUserMessage.id));
        setMsgs((p) => [
            ...p,
            {
            id: uuidv4(),
            text: 'Error communicating with the server. Please try again.',
            role: 'assistant',
            },
        ]);
    }
    setLoading(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-all z-50"
      >
        <span>💬</span> Chat
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-[420px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-indigo-100 overflow-hidden">
      <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">
            AI
          </div>
          <div>
            <h3 className="font-bold text-sm">TaskFlow Assistant</h3>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {msgs.map((m) => (
          <div
            key={m.id}
            className={`flex ${ 
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${ 
                m.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border shadow-sm'
              }`}
            >
              <pre className="whitespace-pre-wrap font-sans">{m.text}</pre>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-center items-center p-2">
            <LoadingSpinner size="sm" />
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="px-2 py-1 bg-gray-50 flex gap-1 flex-wrap border-t">
        {['add ', 'edit ', 'delete ', 'complete ', 'show tasks'].map((c) => (
          <button
            key={c}
            onClick={() => setInput(c)}
            className="px-2 py-1 text-[10px] bg-white border rounded-full hover:bg-indigo-50"
          >
            {c.trim()}
          </button>
        ))}
      </div>

      <div className="p-2 bg-white border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type..."
          className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          disabled={loading}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}