import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Extract the user ID and task ID from the URL
    const { pathname } = new URL(request.url);
    const pathParts = pathname.split('/');
    const userIdIndex = pathParts.indexOf('api') + 1;
    const userId = pathParts[userIdIndex];
    const taskId = params.id;
    
    // Get the backend API URL from environment
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Forward the request to the backend
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/${userId}/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!backendResponse.ok) {
      throw new Error(`Backend responded with status ${backendResponse.status}`);
    }
    
    const data = await backendResponse.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error forwarding request to backend:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task from backend' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Extract the user ID and task ID from the URL
    const { pathname } = new URL(request.url);
    const pathParts = pathname.split('/');
    const userIdIndex = pathParts.indexOf('api') + 1;
    const userId = pathParts[userIdIndex];
    const taskId = params.id;
    
    // Get the backend API URL from environment
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Get the request body
    const body = await request.json();
    
    // Forward the request to the backend
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!backendResponse.ok) {
      throw new Error(`Backend responded with status ${backendResponse.status}`);
    }
    
    const data = await backendResponse.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error forwarding request to backend:', error);
    return NextResponse.json(
      { error: 'Failed to update task in backend' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Extract the user ID and task ID from the URL
    const { pathname } = new URL(request.url);
    const pathParts = pathname.split('/');
    const userIdIndex = pathParts.indexOf('api') + 1;
    const userId = pathParts[userIdIndex];
    const taskId = params.id;
    
    // Get the backend API URL from environment
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Forward the request to the backend
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/${userId}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!backendResponse.ok) {
      throw new Error(`Backend responded with status ${backendResponse.status}`);
    }
    
    const data = await backendResponse.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error forwarding request to backend:', error);
    return NextResponse.json(
      { error: 'Failed to delete task from backend' }, 
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Extract the user ID and task ID from the URL
    const { pathname } = new URL(request.url);
    const pathParts = pathname.split('/');
    const userIdIndex = pathParts.indexOf('api') + 1;
    const userId = pathParts[userIdIndex];
    const taskId = params.id;
    
    // Get the backend API URL from environment
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Forward the request to the backend for toggling completion
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/${userId}/tasks/${taskId}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!backendResponse.ok) {
      throw new Error(`Backend responded with status ${backendResponse.status}`);
    }
    
    const data = await backendResponse.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error forwarding request to backend:', error);
    return NextResponse.json(
      { error: 'Failed to toggle task completion in backend' }, 
      { status: 500 }
    );
  }
}