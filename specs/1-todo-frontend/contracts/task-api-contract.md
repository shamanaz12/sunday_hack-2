# API Contracts: Todo App Frontend

## Task Management API

### GET `/api/{user_id}/tasks`
**Description**: Retrieve all tasks for a specific user
**Response**: Array of Task objects
**Authentication**: Required
**Example Request**:
```
GET /api/123/tasks
Authorization: Bearer <token>
```
**Example Response**:
```
[
  {
    "id": "task1",
    "title": "Sample Task",
    "description": "Sample Description",
    "completed": false,
    "userId": "123",
    "createdAt": "2026-01-12T10:00:00Z",
    "updatedAt": "2026-01-12T10:00:00Z"
  }
]
```

### POST `/api/{user_id}/tasks`
**Description**: Create a new task for a specific user
**Request Body**: Task object (without id)
**Response**: Created Task object
**Authentication**: Required
**Example Request**:
```
POST /api/123/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "New Description",
  "completed": false
}
```
**Example Response**:
```
{
  "id": "task456",
  "title": "New Task",
  "description": "New Description",
  "completed": false,
  "userId": "123",
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T10:00:00Z"
}
```

### GET `/api/{user_id}/tasks/{id}`
**Description**: Retrieve a specific task for a user
**Response**: Task object
**Authentication**: Required
**Example Request**:
```
GET /api/123/tasks/task1
Authorization: Bearer <token>
```
**Example Response**:
```
{
  "id": "task1",
  "title": "Sample Task",
  "description": "Sample Description",
  "completed": false,
  "userId": "123",
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T10:00:00Z"
}
```

### PUT `/api/{user_id}/tasks/{id}`
**Description**: Update a specific task for a user
**Request Body**: Task object (partial updates allowed)
**Response**: Updated Task object
**Authentication**: Required
**Example Request**:
```
PUT /api/123/tasks/task1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated Description"
}
```
**Example Response**:
```
{
  "id": "task1",
  "title": "Updated Task",
  "description": "Updated Description",
  "completed": false,
  "userId": "123",
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T11:00:00Z"
}
```

### DELETE `/api/{user_id}/tasks/{id}`
**Description**: Delete a specific task for a user
**Response**: Empty
**Authentication**: Required
**Example Request**:
```
DELETE /api/123/tasks/task1
Authorization: Bearer <token>
```
**Example Response**:
```
{}
```

### PATCH `/api/{user_id}/tasks/{id}/complete`
**Description**: Toggle the completion status of a specific task
**Response**: Updated Task object
**Authentication**: Required
**Example Request**:
```
PATCH /api/123/tasks/task1/complete
Authorization: Bearer <token>
Content-Type: application/json

{
  "completed": true
}
```
**Example Response**:
```
{
  "id": "task1",
  "title": "Sample Task",
  "description": "Sample Description",
  "completed": true,
  "userId": "123",
  "createdAt": "2026-01-12T10:00:00Z",
  "updatedAt": "2026-01-12T11:00:00Z",
  "completedAt": "2026-01-12T11:00:00Z"
}
```