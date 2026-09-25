import sqlite3
import sys

def migrate_db():
    try:
        conn = sqlite3.connect('yadvi_seeds.db')
        cur = conn.cursor()
        
        # Check if username exists
        cur.execute("PRAGMA table_info(users);")
        columns = [row[1] for row in cur.fetchall()]
        
        if 'username' not in columns:
            print("Adding username column to users table...")
            cur.execute("ALTER TABLE users ADD COLUMN username VARCHAR(50);")
            
            # Set default usernames based on role and id
            cur.execute("""
                UPDATE users 
                SET username = 'ADMIN' 
                WHERE email = 'admin@yadvi.com' OR phone = '9876543210'
            """)
            
            cur.execute("""
                UPDATE users 
                SET username = 'FE' || id 
                WHERE role_id IN (SELECT id FROM roles WHERE name = 'field_executive')
            """)
            
            cur.execute("""
                UPDATE users 
                SET username = 'SHOP' || id 
                WHERE role_id IN (SELECT id FROM roles WHERE name = 'shop_owner')
            """)
            
            conn.commit()
            print("Migration successful.")
        else:
            print("username column already exists.")
            
    except Exception as e:
        print(f"Migration failed: {e}")
        sys.exit(1)
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == '__main__':
    migrate_db()
