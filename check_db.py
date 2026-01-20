import psycopg2
from urllib.parse import urlparse

# Database URL from the main.py file
DATABASE_URL = 'postgresql://neondb_owner:npg_3PpKacOl8ysd@ep-little-fire-ahtqcsxh-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    # Check the tasks table structure
    cursor.execute("""
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'tasks'
        ORDER BY ordinal_position;
    """)
    
    print('Current tasks table structure:')
    for row in cursor.fetchall():
        print(f'  {row[0]}: {row[1]}, nullable={row[2]}')
    
    cursor.close()
    conn.close()
except Exception as e:
    print(f'Error connecting to database: {e}')
    
    # Let's also check if the table exists at all
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_name = 'tasks';
        """)
        
        tables = cursor.fetchall()
        if tables:
            print(f'Tasks table exists: {tables[0][0]}')
        else:
            print('Tasks table does not exist in the database')
            
        cursor.close()
        conn.close()
    except Exception as e2:
        print(f'Also failed to check if table exists: {e2}')