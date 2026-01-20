# API Contract: Chat Endpoint

## Endpoint: POST /chat

### Description
Endpoint for sending chat messages to the backend and receiving responses. This endpoint is used by the ChatWidget frontend component to communicate with the backend API.

### Request

#### URL
`http://127.0.0.1:8000/chat`

#### Method
`POST`

#### Headers
```
Content-Type: application/json
```

#### Body
```json
{
  "query": "string",
  "chat_history": ["string"]
}
```

**Body Parameters**:
- `query`: The current user input/message to send to the backend
- `chat_history`: Array of previous messages in the conversation (used for context)

### Response

#### Success Response (200 OK)
```json
{
  "response": "string",
  "timestamp": "string",
  "action_taken": "string"
}
```

**Response Parameters**:
- `response`: The backend's response to the user's query
- `timestamp`: ISO 8601 formatted timestamp of when the response was generated
- `action_taken`: Identifier for what action the backend performed

#### Error Response (500 Internal Server Error)
```json
{
  "detail": "string"
}
```

**Error Response Parameters**:
- `detail`: Description of the error that occurred

### Example Request
```json
{
  "query": "add buy groceries",
  "chat_history": [
    "Hello",
    "How can I add a task?",
    "You can say 'add [task name]'"
  ]
}
```

### Example Response
```json
{
  "response": "Task 'buy groceries' added successfully!",
  "timestamp": "2026-01-20T15:30:00.123456",
  "action_taken": "added_task"
}
```

### Validation Rules
- The `query` field must be a non-empty string
- The `chat_history` field must be an array of strings
- The request body must be valid JSON
- The `Content-Type` header must be `application/json`