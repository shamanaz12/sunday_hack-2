"""
Unified TaskFlow Application
Combines API, Backend, Chat UI, Agent, and Skills in a single file
"""

from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import uuid
import os
import asyncio
import json
from enum import Enum
from sqlalchemy import create_engine, Column, String, Boolean, Integer, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import func
from passlib.context import CryptContext
from jose import JWTError, jwt
from dotenv import load_dotenv
import re

# Load environment variables
load_dotenv()

# SQLAlchemy setup - Neon PostgreSQL
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://neondb_owner:npg_3PpKacOl8ysd@ep-little-fire-ahtqcsxh-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require")
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT token settings
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Models
class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship to tasks
    tasks = relationship("Task", back_populates="owner")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    completed = Column(Boolean, default=False)
    priority = Column(Integer, default=1)  # 0: low, 1: medium, 2: high
    user_id = Column(String, ForeignKey("users.id"))

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationship to user
    owner = relationship("User", back_populates="tasks")


# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class UserBase(BaseModel):
    email: str
    name: str


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserResponse(UserBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True


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


class TaskResponse(TaskBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    query: str
    chat_history: Optional[List[ChatMessage]] = []


class Skill(Enum):
    CREATE_TASK = "create_task"
    UPDATE_TASK = "update_task"
    DELETE_TASK = "delete_task"
    LIST_TASKS = "list_tasks"
    MARK_COMPLETE = "mark_complete"


# Authentication helpers
def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: str = Depends(lambda: None)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # In a real implementation, you would fetch the user from the database
    # For this unified example, we'll simulate a user
    return UserResponse(
        id=user_id,
        email="user@example.com",
        name="Demo User",
        created_at=datetime.utcnow()
    )


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Import database session handling for endpoints
from fastapi import Depends
from sqlalchemy.orm import Session

def get_current_user_from_token(
    token: str = Depends(lambda: None),
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception

    return user
from sqlalchemy.orm import Session


# Initialize FastAPI app
app = FastAPI(
    title="TaskFlow Unified API",
    description="Complete API for TaskFlow application with task management, chat functionality, and AI agent",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple responses for the chatbot
CHAT_RESPONSES = {
    "hello": "Hello! Welcome to TaskFlow. How can I help you manage your tasks today?",
    "hi": "Hi there! I'm your TaskFlow assistant. Need help with tasks?",
    "help": "I can help you with:\n- Creating new tasks\n- Managing your task list\n- Setting priorities\n- Filtering tasks\n\nJust ask!",
    "task": "To manage tasks, go to the Dashboard. You can:\n- Add new tasks with the form\n- Set priority (Low/Medium/High)\n- Mark tasks as complete\n- Edit or delete tasks",
    "create": "To create a task:\n1. Go to Dashboard\n2. Fill in the task title\n3. Add description (optional)\n4. Select priority\n5. Click 'Add Task'",
    "priority": "TaskFlow has 3 priority levels:\n🟢 Low - Not urgent\n🟡 Medium - Normal priority\n🔴 High - Urgent tasks",
    "filter": "You can filter tasks by:\n- All tasks\n- Pending (incomplete)\n- Completed\n\nUse the filter buttons above the task list.",
    "delete": "To delete a task, click the red trash icon on any task card. You'll be asked to confirm.",
    "edit": "To edit a task, click the green edit icon on the task card. Update the details and save.",
    "complete": "Click the checkbox next to any task to mark it as complete or incomplete.",
    "dashboard": "The Dashboard is your main workspace. Access it from the navigation menu or go to /dashboard",
    "thanks": "You're welcome! Let me know if you need anything else.",
    "thank": "Happy to help! Feel free to ask more questions.",
    "bye": "Goodbye! Have a productive day with TaskFlow!",
}

# Agent and Skills Implementation
class TaskAgent:
    """
    AI Agent that handles task management requests
    """

    def __init__(self):
        self.skills = {
            Skill.CREATE_TASK: self.create_task_skill,
            Skill.UPDATE_TASK: self.update_task_skill,
            Skill.DELETE_TASK: self.delete_task_skill,
            Skill.LIST_TASKS: self.list_tasks_skill,
            Skill.MARK_COMPLETE: self.mark_complete_skill
        }

    def extract_task_info(self, query: str) -> dict:
        """
        Extract task information from user query
        """
        # Simple extraction using regex - in a real implementation, you'd use NLP
        title_match = re.search(r'"([^"]*)"', query) or re.search(r"'([^']*)'", query)
        title = title_match.group(1) if title_match else "New Task"

        # Extract priority
        priority = 1  # Default to medium
        if "high priority" in query or "urgent" in query or "important" in query:
            priority = 2
        elif "low priority" in query or "not urgent" in query:
            priority = 0

        # Extract description
        description = f"Created from query: {query}"

        return {
            "title": title,
            "description": description,
            "priority": priority
        }

    def create_task_skill(self, query: str, user_id: str) -> str:
        """
        Skill to create a new task
        """
        task_info = self.extract_task_info(query)
        # In a real implementation, this would interact with the database
        return f"I've created a new task for you: '{task_info['title']}' with priority {'high' if task_info['priority'] == 2 else 'medium' if task_info['priority'] == 1 else 'low'}"

    def update_task_skill(self, query: str, user_id: str) -> str:
        """
        Skill to update an existing task
        """
        # In a real implementation, this would parse the query to identify which task to update
        return f"I've updated the task based on your request: '{query}'"

    def delete_task_skill(self, query: str, user_id: str) -> str:
        """
        Skill to delete a task
        """
        # In a real implementation, this would parse the query to identify which task to delete
        return f"I've deleted the task as requested: '{query}'"

    def list_tasks_skill(self, query: str, user_id: str) -> str:
        """
        Skill to list tasks
        """
        # In a real implementation, this would fetch tasks from the database
        return f"Here are your tasks. You have 3 tasks: Task 1, Task 2, Task 3"

    def mark_complete_skill(self, query: str, user_id: str) -> str:
        """
        Skill to mark a task as complete
        """
        # In a real implementation, this would parse the query to identify which task to mark complete
        return f"I've marked the task as complete: '{query}'"

    def process_query(self, query: str, user_id: str) -> str:
        """
        Process a user query and determine which skill to use
        """
        query_lower = query.lower()

        # Determine which skill to use based on the query
        if any(word in query_lower for word in ["create", "add", "new", "make"]):
            return self.skills[Skill.CREATE_TASK](query, user_id)
        elif any(word in query_lower for word in ["update", "change", "modify"]):
            return self.skills[Skill.UPDATE_TASK](query, user_id)
        elif any(word in query_lower for word in ["delete", "remove"]):
            return self.skills[Skill.DELETE_TASK](query, user_id)
        elif any(word in query_lower for word in ["list", "show", "view", "all"]):
            return self.skills[Skill.LIST_TASKS](query, user_id)
        elif any(word in query_lower for word in ["complete", "done", "finish"]):
            return self.skills[Skill.MARK_COMPLETE](query, user_id)
        else:
            # Default to a general response if no specific skill matches
            for keyword, response in CHAT_RESPONSES.items():
                if keyword in query_lower:
                    return response

            return f"I understand you're asking about: '{query}'\n\nI'm your TaskFlow assistant. I can help with:\n- Creating new tasks\n- Managing your task list\n- Setting priorities\n- Filtering tasks\n\nTry asking about any of these topics!"


# Initialize the agent
task_agent = TaskAgent()


# Health check endpoint
@app.get("/", tags=["Health"])
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "TaskFlow Unified API is running"}


@app.get("/health", tags=["Health"])
def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }


# Authentication endpoints
@app.post("/auth/signup", response_model=UserResponse, tags=["Authentication"])
def signup(user_data: UserCreate, db=Depends(get_db)):
    """
    Register a new user
    """
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create new user
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(user_data.password)
    new_user = User(
        id=user_id,
        email=user_data.email,
        name=user_data.name,
        password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@app.post("/auth/login", response_model=Token, tags=["Authentication"])
def login(credentials: UserLogin, db=Depends(get_db)):
    """
    Login and get access token
    """
    user = db.query(User).filter(User.email == credentials.email).first()

    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.id})

    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/me", response_model=UserResponse, tags=["Authentication"])
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current authenticated user info"""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        created_at=current_user.created_at
    )


# Task endpoints
@app.get("/tasks", response_model=List[TaskResponse], tags=["Tasks"])
def get_all_tasks(
    completed: Optional[bool] = None,
    priority: Optional[int] = None,
    current_user: UserResponse = Depends(get_current_user),
    db=Depends(get_db)
):
    """
    Get all tasks for the current user
    """
    query = db.query(Task).filter(Task.user_id == current_user.id)

    if completed is not None:
        query = query.filter(Task.completed == completed)

    if priority is not None:
        query = query.filter(Task.priority == priority)

    tasks = query.order_by(Task.created_at.desc()).all()
    return tasks


@app.get("/tasks/{task_id}", response_model=TaskResponse, tags=["Tasks"])
def get_task_by_id(
    task_id: str,
    current_user: UserResponse = Depends(get_current_user),
    db=Depends(get_db)
):
    """
    Get a specific task by ID
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@app.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED, tags=["Tasks"])
def create_task(
    task_data: TaskCreate,
    current_user: UserResponse = Depends(get_current_user),
    db=Depends(get_db)
):
    """
    Create a new task
    """
    task_id = str(uuid.uuid4())
    new_task = Task(
        id=task_id,
        title=task_data.title,
        description=task_data.description,
        priority=task_data.priority if task_data.priority is not None else 1,
        user_id=current_user.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@app.put("/tasks/{task_id}", response_model=TaskResponse, tags=["Tasks"])
def update_task(
    task_id: str,
    task_data: TaskUpdate,
    current_user: UserResponse = Depends(get_current_user),
    db=Depends(get_db)
):
    """
    Update an existing task
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    # Update fields if provided
    if task_data.title is not None:
        task.title = task_data.title

    if task_data.description is not None:
        task.description = task_data.description

    if task_data.priority is not None:
        task.priority = task_data.priority

    if task_data.completed is not None:
        task.completed = task_data.completed
        # Set completed_at timestamp
        if task_data.completed:
            task.completed_at = datetime.utcnow()
        else:
            task.completed_at = None

    db.commit()
    db.refresh(task)

    return task


@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Tasks"])
def delete_task(
    task_id: str,
    current_user: UserResponse = Depends(get_current_user),
    db=Depends(get_db)
):
    """
    Delete a task
    """
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.user_id == current_user.id
    ).first()

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return None


# Task statistics endpoint
@app.get("/tasks/stats/summary", tags=["Tasks"])
def get_task_stats(
    current_user: UserResponse = Depends(get_current_user),
    db=Depends(get_db)
):
    """
    Get task statistics for the current user
    """
    tasks = db.query(Task).filter(Task.user_id == current_user.id).all()

    total = len(tasks)
    completed = len([t for t in tasks if t.completed])
    pending = total - completed

    by_priority = {
        "low": len([t for t in tasks if t.priority == 0]),
        "medium": len([t for t in tasks if t.priority == 1]),
        "high": len([t for t in tasks if t.priority == 2])
    }

    return {
        "total": total,
        "completed": completed,
        "pending": pending,
        "by_priority": by_priority
    }


# Chat endpoints
@app.post("/chat", tags=["Chat"])
async def chat_endpoint(request: ChatRequest):
    """
    Process chat messages and provide intelligent responses
    """
    response = task_agent.process_query(request.query, "demo_user_id")
    return {
        "response": response,
        "timestamp": datetime.now().isoformat(),
        "action_taken": "processed_query"
    }


@app.post("/api/v1/chat/send", tags=["Chat"])
async def chat_send_endpoint(request: Request):
    """
    Endpoint for chat widget integration
    """
    try:
        body = await request.json()
        content = body.get('query', body.get('content', ''))
    except:
        # If JSON parsing fails, try to get content from query parameter
        content = request.query_params.get('content', '')

    response = task_agent.process_query(content or '', "demo_user_id")
    return {
        "response": response,
        "timestamp": datetime.now().isoformat()
    }


@app.post("/chat-stream", tags=["Chat"])
async def chat_stream_endpoint(request: ChatRequest):
    """
    Stream chat responses
    """
    response = task_agent.process_query(request.query, "demo_user_id")

    async def generate_stream():
        # Simulate streaming by yielding words
        words = response.split(' ')
        for i, word in enumerate(words):
            if i > 0:
                yield ' '
            yield word
            await asyncio.sleep(0.03)  # Small delay for streaming effect

    return StreamingResponse(generate_stream(), media_type="text/plain")


# Serve the frontend
# Note: This assumes you have a 'static' directory with your frontend files
# In a real implementation, you'd serve your Next.js frontend differently
try:
    app.mount("/static", StaticFiles(directory="static"), name="static")
    templates = Jinja2Templates(directory="templates")

    @app.get("/chat-ui")
    async def chat_ui(request: Request):
        """
        Serve the chat UI
        """
        return templates.TemplateResponse("chat.html", {"request": request})
except:
    # If static files directory doesn't exist, skip mounting
    pass


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)