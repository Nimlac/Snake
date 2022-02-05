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
_name= form.getvalue('name')
_score = form.getvalue('score')
if _score != 0:
    cursor.execute(("INSERT INTO highscore (name, score)VALUES (%s, %s)"),(_name,_score))    
cursor.execute("SELECT name, score FROM highscore ORDER BY score desc LIMIT 7")
a=[]
for (name,score) in cursor:
    a.append((name,score))


cursor.execute("SELECT max(score) FROM highscore where name = %s group by name",(_name,))
for score in cursor:
    sc=score

cursor.execute("select count(*) + 1 as place from highscore where name<>%s and score > (select max(score) from highscore where name = %s group by name)",(_name,_name))
for place in cursor:
    pos=place

print("Content-type: application/json\n")
print(json.dumps({"scores":a, "best":(sc,pos)}))

cursor.close()
cnx.commit()
cnx.close()
