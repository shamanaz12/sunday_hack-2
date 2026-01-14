# Data Model: Todo App Frontend

## User Entity
- **id**: string - Unique identifier for the user
- **email**: string - Email address for authentication
- **name**: string - User's display name
- **createdAt**: Date - Account creation timestamp
- **updatedAt**: Date - Last account update timestamp

## Task Entity
- **id**: string - Unique identifier for the task
- **title**: string - Title of the task (required)
- **description**: string - Detailed description of the task (optional)
- **completed**: boolean - Completion status of the task
- **userId**: string - Reference to the user who owns the task
- **createdAt**: Date - Task creation timestamp
- **updatedAt**: Date - Last task update timestamp
- **completedAt**: Date - Timestamp when task was marked as completed (optional)

## Relationships
- A User can have many Tasks (one-to-many relationship)
- A Task belongs to one User

## Validation Rules
- Task title must be between 1 and 255 characters
- Task description must not exceed 1000 characters
- Task completion status can only be changed by the task owner
- User email must be in valid email format

## State Transitions
- Task state can transition from incomplete to complete via PATCH request
- Task state can transition from complete to incomplete via PATCH request
- Task can be created in either state (completed or incomplete)