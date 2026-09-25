import sqlite3
conn = sqlite3.connect('yadvi_seeds.db')
cur = conn.cursor()

# Fix Field Executives
cur.execute("UPDATE users SET username='FE001' WHERE phone='9848011223'")
cur.execute("UPDATE users SET username='FE002' WHERE phone='9848099001'")
cur.execute("UPDATE users SET username='FE003' WHERE phone='9848077002'")

# Fix Shop Owners
cur.execute("UPDATE users SET username='SHOP001' WHERE phone='9848023456'")
cur.execute("UPDATE users SET username='SHOP002' WHERE phone='9848033301'")
cur.execute("UPDATE users SET username='SHOP003' WHERE phone='9848044402'")

conn.commit()
conn.close()
print("Updated usernames successfully")
