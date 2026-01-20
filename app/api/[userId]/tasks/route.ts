import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Extract the user ID from the params
    const userId = params.userId;
    
    // Get the backend API URL from environment
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Forward the request to the backend
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/${userId}/tasks`, {
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
    // Return empty array as fallback
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    // Extract the user ID from the params
    const userId = params.userId;
    
    // Get the backend API URL from environment
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Get the request body
    const body = await request.json();
    
    // Forward the request to the backend
    const backendResponse = await fetch(`${BACKEND_API_URL}/api/${userId}/tasks`, {
      method: 'POST',
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
      { error: 'Failed to create task in backend' }, 
      { status: 500 }
    );
  }
}