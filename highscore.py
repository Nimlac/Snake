#!/usr/bin/env python3.7

import mysql.connector
from mysql.connector import cursor
import cgi, cgitb
import json

form = cgi.FieldStorage()

with open("snakedata.txt") as file:
    uname = file.readline().strip("\n")
    pw =file.readline().strip("\n")
    host = file.readline().strip("\n")
cnx = mysql.connector.connect(user=uname, password=pw, host=host, database='calvin') 
cursor=cnx.cursor(buffered=True)
cursor.execute(("INSERT INTO highscore ""(name, score)""VALUES (%s, %s)"),(form.getvalue('name'),form.getvalue('score')))    
cursor.execute("SELECT name, score FROM highscore ORDER BY score desc LIMIT 5")
a=[]
for (name,score) in cursor:
    a.append((name,score))
print("Content-type: application/json\n")
print(json.dumps(a))

cursor.close()
cnx.commit()
cnx.close()
