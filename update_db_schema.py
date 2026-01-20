import psycopg2

# Database URL from the main.py file
DATABASE_URL = 'postgresql://neondb_owner:npg_3PpKacOl8ysd@ep-little-fire-ahtqcsxh-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    # Add the missing priority column
    try:
        cursor.execute("ALTER TABLE tasks ADD COLUMN priority INTEGER DEFAULT 1;")
        print("Added priority column to tasks table")
    except psycopg2.Error as e:
        print(f"Priority column may already exist: {e}")
    
    # Add the missing completed_at column
    try:
        cursor.execute("ALTER TABLE tasks ADD COLUMN completed_at TIMESTAMP;")
        print("Added completed_at column to tasks table")
    except psycopg2.Error as e:
        print(f"Completed_at column may already exist: {e}")
    
    conn.commit()
    cursor.close()
    conn.close()
    
    print("Database schema updated successfully!")
    
    # Verify the changes
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = 'tasks'
        ORDER BY ordinal_position;
    """)
    
    print('\nUpdated tasks table structure:')
    for row in cursor.fetchall():
        print(f'  {row[0]}: {row[1]}, nullable={row[2]}, default={row[3]}')
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f'Error updating database schema: {e}')