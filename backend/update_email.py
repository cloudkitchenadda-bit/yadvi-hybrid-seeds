import sqlite3
conn = sqlite3.connect('yadvi_seeds.db')
cur = conn.cursor()
cur.execute("UPDATE users SET email='rameshbade3798@gmail.com' WHERE username='ADMIN'")
conn.commit()
conn.close()
print("Updated email successfully")
