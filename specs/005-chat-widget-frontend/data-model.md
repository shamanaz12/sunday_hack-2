# Data Model: Chat Widget Frontend Component

## Entities

### Chat Message
**Fields**:
- `id`: string (unique identifier for the message)
- `content`: string (the actual message text)
- `sender`: 'user' | 'system' (indicates who sent the message)
- `timestamp`: Date (when the message was sent/received)
- `status`: 'sent' | 'delivered' | 'error' (delivery status of the message)

**Validation rules**:
- `content` must not be empty or whitespace only
- `sender` must be either 'user' or 'system'
- `timestamp` must be a valid date/time

**State transitions**:
- Initially created with status 'sent'
- Updates to 'delivered' when acknowledged by the backend
- Updates to 'error' when API request fails

### Chat History
**Fields**:
- `sessionId`: string (unique identifier for the conversation session)
- `messages`: Array<ChatMessage> (ordered list of messages in the conversation)
- `createdAt`: Date (when the session was started)
- `updatedAt`: Date (when the session was last updated)

**Validation rules**:
- `messages` must maintain chronological order
- `sessionId` must be unique per active session
- Maximum number of messages in history may be limited (e.g., last 50 messages)

### API Request Payload
**Fields**:
- `query`: string (the user's input message)
- `chat_history`: Array<string> (previous messages in the conversation)

**Validation rules**:
- `query` must not be empty or whitespace only
- `chat_history` must be an array of strings
- `query` and `chat_history` combined should not exceed API limits

### API Response
**Fields**:
- `response`: string (the system's response to the query)
- `timestamp`: string (ISO date string when response was generated)
- `action_taken`: string (what action the backend took)

**Validation rules**:
- `response` must be a string
- `timestamp` must be a valid ISO date string
- `action_taken` must be a valid action identifier

## Relationships

- One Chat History contains many Chat Messages (one-to-many)
- Each Chat Message belongs to one Chat History
- API Request Payload is derived from Chat History and current input
- API Response creates a new Chat Message with sender 'system'

## State Diagram

```
[User types message] -> [Send message to API] -> [Waiting for response]
         |                           |                      |
         v                           v                      v
[Message added to UI] <- [API request successful] <- [Receive response]
         |                           |                      |
         v                           v                      v
[Show as 'sent'] -> [Update with delivery status] -> [Add response to UI]
```

## Constraints

1. Message order must be preserved in the UI
2. User messages must be distinguishable from system responses
3. Error states must be clearly communicated to the user
4. The component must handle loading states during API requests
5. Previous messages must be included in new API requests to maintain context