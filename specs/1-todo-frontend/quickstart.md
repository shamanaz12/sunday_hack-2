# Quickstart Guide: Todo App Frontend

## Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Access to the backend API at http://localhost:8000

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following content:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Authentication
- Navigate to `/signup` to create a new account
- Navigate to `/login` to sign in to an existing account
- Once authenticated, you'll be redirected to the dashboard

## Using the Application
- On the dashboard (`/`), you can view your task list and create new tasks
- Click on a task to view and edit its details on the `/tasks/[id]` page
- Use the checkbox to toggle task completion status
- Use the delete button to remove tasks

## API Integration
The application connects to the backend API at the endpoints specified in the API contract. All API calls include proper error handling and loading states.

## Troubleshooting
- If you encounter API connection errors, verify that the backend server is running at http://localhost:8000
- If authentication isn't working, ensure the Better Auth configuration is correct
- For styling issues, check that Tailwind CSS is properly configured