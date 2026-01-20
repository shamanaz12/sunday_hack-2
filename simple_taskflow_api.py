from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

# Initialize FastAPI app
app = FastAPI(
    title="TaskFlow API - Error Free Version",
    description="Simple, reliable API for TaskFlow application",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    priority: int = 1  # 0: low, 1: medium, 2: high

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[int] = None

class Task(TaskBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

class ChatRequest(BaseModel):
    message: str
    user_id: str

class ChatResponse(BaseModel):
    response: str
    action_taken: Optional[str] = None

# In-memory storage (for simplicity)
tasks_db = {}
users_db = {}

# 1. HEALTH CHECK ENDPOINT
@app.get("/health")
def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "TaskFlow API"
    }

# 2. USER MANAGEMENT ENDPOINTS
@app.post("/users")
def create_user(name: str, email: str):
    """
    Create a new user
    """
    user_id = str(uuid.uuid4())
    users_db[user_id] = {
        "id": user_id,
        "name": name,
        "email": email,
        "created_at": datetime.utcnow()
    }
    return users_db[user_id]

@app.get("/users/{user_id}")
def get_user(user_id: str):
    """
    Get user by ID
    """
    if user_id not in users_db:
        return {"error": "User not found"}
    return users_db[user_id]

# 3. TASK MANAGEMENT ENDPOINTS
@app.get("/api/{user_id}/tasks", response_model=List[Task])
def get_tasks(user_id: str):
    """
    Get all tasks for a user
    """
    user_tasks = []
    for task_id, task in tasks_db.items():
        if task["user_id"] == user_id:
            user_tasks.append(task)
    return user_tasks

@app.post("/api/{user_id}/tasks", response_model=Task)
def create_task(user_id: str, task: TaskCreate):
    """
    Create a new task for a user
    """
    # Verify user exists
    if user_id not in users_db:
        return {"error": "User not found"}
    
    task_id = str(uuid.uuid4())
    new_task = {
        "id": task_id,
        "title": task.title,
        "description": task.description,
        "completed": task.completed,
        "priority": task.priority,
        "user_id": user_id,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    tasks_db[task_id] = new_task
    return new_task

@app.get("/api/{user_id}/tasks/{task_id}", response_model=Task)
def get_task(user_id: str, task_id: str):
    """
    Get a specific task
    """
    if task_id not in tasks_db:
        return {"error": "Task not found"}
    
    task = tasks_db[task_id]
    if task["user_id"] != user_id:
        return {"error": "Unauthorized"}
    
    return task

@app.put("/api/{user_id}/tasks/{task_id}", response_model=Task)
def update_task(user_id: str, task_id: str, task_update: TaskUpdate):
    """
    Update a task
    """
    if task_id not in tasks_db:
        return {"error": "Task not found"}
    
    task = tasks_db[task_id]
    if task["user_id"] != user_id:
        return {"error": "Unauthorized"}
    
    # Update fields
    for field, value in task_update.dict(exclude_unset=True).items():
        if value is not None:
            task[field] = value
    
    task["updated_at"] = datetime.utcnow()
    tasks_db[task_id] = task
    return task

@app.delete("/api/{user_id}/tasks/{task_id}")
def delete_task(user_id: str, task_id: str):
    """
    Delete a task
    """
    if task_id not in tasks_db:
        return {"error": "Task not found"}
    
    task = tasks_db[task_id]
    if task["user_id"] != user_id:
        return {"error": "Unauthorized"}
    
    del tasks_db[task_id]
    return {"message": "Task deleted successfully"}

@app.patch("/api/{user_id}/tasks/{task_id}/complete", response_model=Task)
def toggle_task_completion(user_id: str, task_id: str):
    """
    Toggle task completion
    """
    if task_id not in tasks_db:
        return {"error": "Task not found"}
    
    task = tasks_db[task_id]
    if task["user_id"] != user_id:
        return {"error": "Unauthorized"}
    
    task["completed"] = not task["completed"]
    task["updated_at"] = datetime.utcnow()
    tasks_db[task_id] = task
    return task

# 4. CHAT ENDPOINT
@app.post("/api/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    """
    Chat endpoint for task management
    """
    message = request.message.lower()
    
    if "add" in message or "create" in message or "new" in message:
        action = "suggest_create_task"
        response = f"I can help you add a task. I've processed your request: '{request.message}'"
    elif "show" in message or "list" in message or "see" in message:
        action = "suggest_view_tasks"
        response = "I can help you view your tasks. Your tasks are displayed in the dashboard."
    elif "complete" in message or "done" in message or "finish" in message:
        action = "suggest_complete_task"
        response = f"I can help you mark a task as complete based on your request: '{request.message}'"
    elif "delete" in message or "remove" in message:
        action = "suggest_delete_task"
        response = f"I can help you delete a task based on your request: '{request.message}'"
    else:
        action = "provide_assistance"
        response = f"I received your message: '{request.message}'. How can I assist you with your tasks?"
    
    return {
        "response": response,
        "action_taken": action
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)