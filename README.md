# Todo App Frontend

This is a Next.js 14.2.5 frontend application for a todo management system. It connects to a backend API and provides user authentication, task management, and real-time updates.

## Features

- User authentication (login/signup)
- Dashboard showing user's task list
- Create, read, update, and delete tasks
- Toggle task completion status
- Responsive design with Tailwind CSS

## Tech Stack

- Next.js 14.2.5 with App Router
- React 18.2.0
- TypeScript
- Tailwind CSS
- Better Auth for authentication
- Axios for API requests

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables by copying `.env.example` to `.env.local` and updating the values:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
app/                    # Next.js App Router pages
├── layout.tsx          # Root layout
├── page.tsx            # Dashboard page
├── login/              # Login page
├── signup/             # Signup page
└── tasks/[id]/         # Task detail page
components/             # Reusable React components
├── Header.tsx          # Navigation header
├── TaskList.tsx        # Task list component
├── TaskItem.tsx        # Individual task component
└── TaskForm.tsx        # Task creation form
lib/                    # Utility functions and API clients
├── api.ts              # API service layer
└── auth.ts             # Authentication client
types/                  # TypeScript type definitions
├── index.ts            # User and Task interfaces
```

## API Integration

The application connects to a backend API at the endpoints specified in the API contract:
- GET/POST `/api/{user_id}/tasks`
- GET/PUT/DELETE `/api/{user_id}/tasks/{id}`
- PATCH `/api/{user_id}/tasks/{id}/complete`

All API calls include proper error handling and loading states.

## Authentication

Authentication is handled using Better Auth. The application redirects unauthenticated users to the login page when accessing protected routes.