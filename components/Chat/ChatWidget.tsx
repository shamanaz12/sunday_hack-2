'use client';
import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinner from '../UI/LoadingSpinner';

interface Msg {
  id: string;
  text: string;
  role: 'user' | 'assistant';
}

interface LocalTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const STORAGE_KEY = 'taskflow_chat_tasks';

// Local task management functions
const getLocalTasks = (): LocalTask[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLocalTasks = (tasks: LocalTask[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Command parser and handler
const processCommand = (input: string): string => {
  const trimmed = input.trim().toLowerCase();
  const original = input.trim();

  // Show tasks command
  if (trimmed === 'show tasks' || trimmed === 'list' || trimmed === 'show' || trimmed === 'tasks') {
    const tasks = getLocalTasks();
    if (tasks.length === 0) {
      return '📋 No tasks yet!\n\nTry adding one:\n• "add Buy groceries"\n• "add Complete project high"';
    }

    const pending = tasks.filter(t => !t.completed);
    const completed = tasks.filter(t => t.completed);

    let response = `📋 Your Tasks (${tasks.length} total)\n\n`;

    if (pending.length > 0) {
      response += `⏳ Pending (${pending.length}):\n`;
      pending.forEach((t, i) => {
        const priority = t.priority === 'high' ? '🔴' : t.priority === 'medium' ? '🟡' : '🟢';
        response += `${i + 1}. ${priority} ${t.title}\n`;
      });
    }

    if (completed.length > 0) {
      response += `\n✅ Completed (${completed.length}):\n`;
      completed.forEach((t, i) => {
        response += `${i + 1}. ✓ ${t.title}\n`;
      });
    }

    return response.trim();
  }

  // Add task command
  if (trimmed.startsWith('add ')) {
    const taskText = original.slice(4).trim();
    if (!taskText) {
      return '❌ Please provide a task name.\nExample: "add Buy groceries"';
    }

    // Check for priority at end
    let priority: 'low' | 'medium' | 'high' = 'medium';
    let title = taskText;

    const words = taskText.split(' ');
    const lastWord = words[words.length - 1].toLowerCase();

    if (lastWord === 'high' || lastWord === 'low' || lastWord === 'medium') {
      priority = lastWord as 'low' | 'medium' | 'high';
      title = words.slice(0, -1).join(' ');
    }

    if (!title) {
      return '❌ Please provide a task name.\nExample: "add Buy groceries high"';
    }

    const tasks = getLocalTasks();
    const newTask: LocalTask = {
      id: uuidv4(),
      title,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    saveLocalTasks(tasks);

    const priorityEmoji = priority === 'high' ? '🔴' : priority === 'medium' ? '🟡' : '🟢';
    return `✅ Task added!\n\n${priorityEmoji} "${title}"\nPriority: ${priority}\n\nType "show tasks" to see all tasks.`;
  }

  // Complete task command
  if (trimmed.startsWith('complete ') || trimmed.startsWith('done ') || trimmed.startsWith('finish ')) {
    const searchText = trimmed.replace(/^(complete |done |finish )/, '').trim();
    if (!searchText) {
      return '❌ Please specify which task to complete.\nExample: "complete buy groceries"';
    }

    const tasks = getLocalTasks();
    const taskIndex = tasks.findIndex(t =>
      t.title.toLowerCase().includes(searchText) && !t.completed
    );

    if (taskIndex === -1) {
      const alreadyCompleted = tasks.find(t =>
        t.title.toLowerCase().includes(searchText) && t.completed
      );
      if (alreadyCompleted) {
        return `ℹ️ "${alreadyCompleted.title}" is already completed!`;
      }
      return `❌ No pending task found matching "${searchText}".\nType "show tasks" to see your tasks.`;
    }

    tasks[taskIndex].completed = true;
    saveLocalTasks(tasks);

    return `🎉 Task completed!\n\n✅ "${tasks[taskIndex].title}"\n\nGreat job! Type "show tasks" to see remaining tasks.`;
  }

  // Delete task command
  if (trimmed.startsWith('delete ') || trimmed.startsWith('remove ')) {
    const searchText = trimmed.replace(/^(delete |remove )/, '').trim();
    if (!searchText) {
      return '❌ Please specify which task to delete.\nExample: "delete buy groceries"';
    }

    const tasks = getLocalTasks();
    const taskIndex = tasks.findIndex(t =>
      t.title.toLowerCase().includes(searchText)
    );

    if (taskIndex === -1) {
      return `❌ No task found matching "${searchText}".\nType "show tasks" to see your tasks.`;
    }

    const deletedTask = tasks[taskIndex];
    tasks.splice(taskIndex, 1);
    saveLocalTasks(tasks);

    return `🗑️ Task deleted!\n\n"${deletedTask.title}" has been removed.\n\nType "show tasks" to see remaining tasks.`;
  }

  // Edit task command
  if (trimmed.startsWith('edit ')) {
    const editText = original.slice(5).trim();

    // Format: edit [old] to [new]
    const toIndex = editText.toLowerCase().indexOf(' to ');
    if (toIndex === -1) {
      return '❌ Please use format: "edit [old task] to [new name]"\nExample: "edit buy groceries to buy vegetables"';
    }

    const oldName = editText.slice(0, toIndex).trim().toLowerCase();
    const newName = editText.slice(toIndex + 4).trim();

    if (!oldName || !newName) {
      return '❌ Please provide both old and new task names.\nExample: "edit buy groceries to buy vegetables"';
    }

    const tasks = getLocalTasks();
    const taskIndex = tasks.findIndex(t =>
      t.title.toLowerCase().includes(oldName)
    );

    if (taskIndex === -1) {
      return `❌ No task found matching "${oldName}".\nType "show tasks" to see your tasks.`;
    }

    const oldTitle = tasks[taskIndex].title;
    tasks[taskIndex].title = newName;
    saveLocalTasks(tasks);

    return `✏️ Task updated!\n\nOld: "${oldTitle}"\nNew: "${newName}"\n\nType "show tasks" to see your tasks.`;
  }

  // Priority change command
  if (trimmed.startsWith('priority ') || trimmed.startsWith('set priority ')) {
    const prioText = trimmed.replace(/^(set priority |priority )/, '').trim();
    const parts = prioText.split(' ');

    if (parts.length < 2) {
      return '❌ Please use format: "priority [task] [high/medium/low]"\nExample: "priority groceries high"';
    }

    const newPriority = parts[parts.length - 1].toLowerCase();
    if (!['high', 'medium', 'low'].includes(newPriority)) {
      return '❌ Priority must be: high, medium, or low\nExample: "priority groceries high"';
    }

    const searchText = parts.slice(0, -1).join(' ');
    const tasks = getLocalTasks();
    const taskIndex = tasks.findIndex(t =>
      t.title.toLowerCase().includes(searchText)
    );

    if (taskIndex === -1) {
      return `❌ No task found matching "${searchText}".\nType "show tasks" to see your tasks.`;
    }

    tasks[taskIndex].priority = newPriority as 'low' | 'medium' | 'high';
    saveLocalTasks(tasks);

    const priorityEmoji = newPriority === 'high' ? '🔴' : newPriority === 'medium' ? '🟡' : '🟢';
    return `${priorityEmoji} Priority updated!\n\n"${tasks[taskIndex].title}" is now ${newPriority} priority.`;
  }

  // Clear all tasks
  if (trimmed === 'clear' || trimmed === 'clear all' || trimmed === 'delete all') {
    saveLocalTasks([]);
    return '🗑️ All tasks cleared!\n\nYour task list is now empty.';
  }

  // Help command
  if (trimmed === 'help' || trimmed === '?' || trimmed === 'commands') {
    return `📚 TaskFlow Commands\n
📝 Add Task:
• "add [task name]"
• "add [task] high/medium/low"

✅ Complete Task:
• "complete [task name]"
• "done [task name]"

✏️ Edit Task:
• "edit [old] to [new]"

🗑️ Delete Task:
• "delete [task name]"

⭐ Change Priority:
• "priority [task] high/medium/low"

📋 View Tasks:
• "show tasks" or "list"

🧹 Clear All:
• "clear all"`;
  }

  // Stats command
  if (trimmed === 'stats' || trimmed === 'summary') {
    const tasks = getLocalTasks();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const high = tasks.filter(t => t.priority === 'high' && !t.completed).length;
    const medium = tasks.filter(t => t.priority === 'medium' && !t.completed).length;
    const low = tasks.filter(t => t.priority === 'low' && !t.completed).length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return `📊 Task Statistics\n
📈 Overview:
• Total: ${total}
• Completed: ${completed} (${completionRate}%)
• Pending: ${pending}

⏳ Pending by Priority:
• 🔴 High: ${high}
• 🟡 Medium: ${medium}
• 🟢 Low: ${low}`;
  }

  // Handle single command words without arguments
  if (trimmed === 'add') {
    return `📝 To add a task, include the task name:\n\nExamples:\n• "add Buy groceries"\n• "add Complete homework high"\n• "add Call mom low"`;
  }

  if (trimmed === 'edit') {
    return `✏️ To edit a task, use this format:\n\n"edit [old name] to [new name]"\n\nExample:\n• "edit groceries to buy vegetables"`;
  }

  if (trimmed === 'delete' || trimmed === 'remove') {
    return `🗑️ To delete a task, include the task name:\n\nExample:\n• "delete groceries"\n• "remove homework"`;
  }

  if (trimmed === 'complete' || trimmed === 'done' || trimmed === 'finish') {
    return `✅ To complete a task, include the task name:\n\nExample:\n• "complete groceries"\n• "done homework"`;
  }

  if (trimmed === 'priority') {
    return `⭐ To change priority, use this format:\n\n"priority [task name] [high/medium/low]"\n\nExample:\n• "priority groceries high"`;
  }

  // Unrecognized command - smart suggestions
  if (trimmed.length > 0) {
    return `🤔 I didn't understand "${original}"\n\nTry these commands:\n• "add [task]" - create a task\n• "show tasks" - view all tasks\n• "complete [task]" - mark as done\n• "delete [task]" - remove a task\n• "help" - see all commands`;
  }

  return 'Type "help" to see available commands.';
};

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
    // Load existing tasks count for welcome message
    const tasks = getLocalTasks();
    const taskInfo = tasks.length > 0
      ? `\n\n📋 You have ${tasks.length} task(s). Type "show tasks" to see them.`
      : '';

    setMsgs([
      {
        id: uuidv4(),
        text: `👋 Welcome to TaskFlow!\n\nI can help you manage tasks:\n• "add [task]" - create task\n• "complete [task]" - mark done\n• "show tasks" - view all\n• "help" - all commands${taskInfo}`,
        role: 'assistant',
      },
    ]);
  }, []);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const newUserMessage: Msg = { id: uuidv4(), text: userMessage, role: 'user' };

    setMsgs((p) => [...p, newUserMessage]);
    setInput('');
    setLoading(true);

    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    // Process command locally
    const response = processCommand(userMessage);

    setMsgs((p) => [
      ...p,
      {
        id: uuidv4(),
        text: response,
        role: 'assistant',
      },
    ]);

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
            ✨
          </div>
          <div>
            <h3 className="font-bold text-sm">TaskFlow Assistant</h3>
            <p className="text-[10px] opacity-80">Works offline</p>
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
          placeholder="Type a command..."
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
