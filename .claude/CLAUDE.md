# TaskFlow - Todo Application Project Configuration

This is a Next.js 14 todo application called **TaskFlow** with a separate backend API.

## Project Structure

```
dec_2026/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard (task management)
│   ├── login/
│   │   └── page.tsx              # Login page (Better Auth)
│   ├── signup/
│   │   └── page.tsx              # Signup page
│   └── tasks/
│       └── [id]/
│           └── page.tsx          # Task detail page
├── components/
│   ├── Dashboard/
│   │   ├── TaskTable.tsx         # Task list table
│   │   ├── StatsCards.tsx        # Statistics cards
│   │   ├── ActivityFeed.tsx      # Activity feed
│   │   └── TaskCompletionChart.tsx
│   ├── Header/
│   │   ├── Header.tsx            # Main header
│   │   ├── Navigation.tsx        # Navigation links
│   │   ├── UserMenu.tsx          # User dropdown menu
│   │   └── SearchBar.tsx         # Search component
│   ├── UI/
│   │   ├── Button.tsx            # Button component
│   │   ├── Card.tsx              # Card component
│   │   ├── Badge.tsx             # Badge component
│   │   ├── TaskItem.tsx          # Single task item
│   │   ├── TaskList.tsx          # Task list component
│   │   ├── TaskForm.tsx          # Task create/edit form
│   │   ├── LandingPage.tsx       # Landing page
│   │   ├── ProtectedLayout.tsx   # Protected layout wrapper
│   │   ├── LoadingSpinner.tsx    # Loading indicator
│   │   └── ErrorDisplay.tsx      # Error display component
│   ├── Icons/
│   │   ├── TaskIcon.tsx
│   │   ├── UserIcon.tsx
│   │   └── NotificationIcon.tsx
│   └── ProtectedRoute/
│       └── ProtectedRoute.tsx    # Route protection HOC
├── lib/
│   ├── auth.ts                   # Better Auth client
│   ├── api.ts                    # Generic API utilities
│   └── todo-api.ts               # Task API functions
├── types/
│   └── index.ts                  # TypeScript types
├── middleware.ts                 # Next.js middleware (auth)
└── backend/                      # Backend API (separate)
```

## Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4
- **Authentication**: Better Auth (better-auth)
- **HTTP Client**: Axios
- **Backend API**: Separate service at port 8001

## Type Definitions

### User Type
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Task Type
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  priority?: 'low' | 'medium' | 'high';  // Also accepts 0, 1, 2 from API
}
```

## API Endpoints

Backend runs at: `http://localhost:8001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create new task |
| PUT | /tasks/:id | Update task |
| DELETE | /tasks/:id | Delete task |

## Authentication

Uses Better Auth with email/password authentication:
- `signIn.email({ email, password })` - Login
- `signUp.email({ email, password, name })` - Register
- `signOut()` - Logout
- `useSession()` - Get current session

### Protected Routes (via middleware.ts)
- `/dashboard` - Requires auth
- `/tasks/*` - Requires auth
- `/` - Requires auth (redirects to login)

### Public Routes
- `/login`
- `/signup`

## Key Implementation Details

### Priority Mapping
The API uses integers for priority, but the frontend uses strings:
```typescript
// Frontend to API
'low' → 0
'medium' → 1
'high' → 2

// API to Frontend
0 → 'low'
1 → 'medium'
2 → 'high'
```

### Task Filtering (Dashboard)
```typescript
filter: 'all' | 'pending' | 'completed'
// pending = !task.completed
// completed = task.completed
```

### Environment Variables
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000    # Better Auth base URL
NEXT_PUBLIC_API_URL=http://localhost:8001     # Backend API URL
```

## Development Commands

```bash
npm run dev     # Start dev server (port 3000/3001)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Agent Usage

When working on this project, agents should:

1. **Always reference actual file paths** from this structure
2. **Use the correct type definitions** from `types/index.ts`
3. **Follow the existing component patterns** in `components/`
4. **Use `todoApi` from `lib/todo-api.ts`** for task operations
5. **Use `authClient` from `lib/auth.ts`** for authentication
6. **Handle priority conversion** between string and integer formats
7. **Respect the middleware protection** for routes
