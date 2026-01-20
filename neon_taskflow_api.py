from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

tasks = {}

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    priority: int = 1

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[int] = None

class ChatRequest(BaseModel):
    query: str
    user_id: Optional[str] = "default"
    chat_history: Optional[list] = []

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/{user_id}/tasks")
def get_tasks(user_id: str):
    return [t for t in tasks.values() if t["user_id"] == user_id]

@app.post("/api/{user_id}/tasks")
def create_task(user_id: str, task: TaskCreate):
    tid = str(uuid.uuid4())
    t = {"id": tid, "title": task.title, "description": task.description, "completed": task.completed, "priority": task.priority, "user_id": user_id, "created_at": datetime.utcnow().isoformat()}
    tasks[tid] = t
    return t

@app.delete("/api/{user_id}/tasks/{task_id}")
def delete_task(user_id: str, task_id: str):
    if task_id in tasks: del tasks[task_id]
    return {"ok": True}

@app.patch("/api/{user_id}/tasks/{task_id}/complete")
def toggle(user_id: str, task_id: str):
    if task_id in tasks: tasks[task_id]["completed"] = not tasks[task_id]["completed"]
    return tasks.get(task_id, {})

@app.post("/chat")
def chat(req: ChatRequest):
    msg, uid = req.query.lower(), req.user_id
    skip = ['add','create','new','delete','remove','complete','done','mark','show','list','a','the','my','task','please']
    title = ' '.join([w for w in req.query.split() if w.lower() not in skip]).strip()
    user_tasks = [t for t in tasks.values() if t["user_id"] == uid]

    if any(w in msg for w in ['add','create','new']):
        if title:
            tid = str(uuid.uuid4())
            t = {"id": tid, "title": title, "completed": False, "priority": 1, "user_id": uid}
            tasks[tid] = t
            return {"response": f"Created: {title}", "task_data": t}
        return {"response": "Example: add buy milk"}

    if any(w in msg for w in ['delete','remove']):
        for t in user_tasks:
            if title.lower() in t["title"].lower():
                del tasks[t["id"]]
                return {"response": f"Deleted: {t['title']}"}
        return {"response": "Not found"}

    if any(w in msg for w in ['complete','done','mark']):
        for t in user_tasks:
            if title.lower() in t["title"].lower():
                tasks[t["id"]]["completed"] = True
                return {"response": f"Completed: {t['title']}", "task_data": tasks[t["id"]]}
        return {"response": "Not found"}

    if any(w in msg for w in ['show','list','all']):
        if user_tasks:
            return {"response": "\n".join([f"{'[x]' if t['completed'] else '[ ]'} {t['title']}" for t in user_tasks])}
        return {"response": "No tasks. Try: add buy milk"}

    return {"response": "Commands: add/show/complete/delete [task]"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
