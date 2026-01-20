import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'consolidated_backend'))

from main import app
import uvicorn
import threading
import time
import requests
import json

def run_server():
    uvicorn.run(app, host='0.0.0.0', port=8000, log_level='debug')

def test_api():
    time.sleep(2)  # Wait for server to start
    
    # Test the health endpoint first
    try:
        response = requests.get('http://localhost:8000/health')
        print(f"Health check: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Health check failed: {e}")
    
    # Test task creation
    try:
        task_data = {
            "title": "Buy milk",
            "description": "Need to buy milk from the store",
            "priority": 1
        }
        response = requests.post(
            'http://localhost:8000/tasks',
            headers={'Content-Type': 'application/json'},
            data=json.dumps(task_data)
        )
        print(f"Task creation: {response.status_code}, {response.text}")
    except Exception as e:
        print(f"Task creation failed: {e}")

if __name__ == "__main__":
    # Start server in a thread
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    
    # Run tests
    test_api()
    
    # Keep the main thread alive to see server logs
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down...")