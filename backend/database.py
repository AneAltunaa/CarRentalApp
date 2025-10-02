import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# #creating database
# def init_db():
#     conn = sqlite3.connect("app.db")
#     c = conn.cursor()
    
#     c.execute("""CREATE TABLE IF NOT EXISTS User (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         email TEXT NOT NULL UNIQUE,
#         password TEXT NOT NULL,
#         name TEXT NOT NULL,
#         surname TEXT NOT NULL,
#         dateOfBirth TEXT NOT NULL,
#         cpr TEXT NOT NULL UNIQUE,
#         isWorker INTEGER NOT NULL DEFAULT 0
#     )""")

#     c.execute("""CREATE TABLE IF NOT EXISTS CarList (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         name TEXT,
#         price TEXT,
#         image TEXT,
#         engine TEXT,
#         power TEXT,
#         transmission TEXT,
#         model TEXT,
#         year TEXT,
#         isAvailable INTEGER NOT NULL DEFAULT 1
#     )""")

#     c.execute("""CREATE TABLE IF NOT EXISTS RentalHistory (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         startDate TEXT DEFAULT (CURRENT_TIMESTAMP),
#         endDate TEXT,
#         UserId INTEGER,
#         CarId INTEGER,
#         FOREIGN KEY (UserId) REFERENCES User(id),
#         FOREIGN KEY (CarId) REFERENCES CarList(id)
#     )""")

#     #test user
#     try:
#         c.execute(
#             "INSERT INTO User (email, password, name, surname, dateOfBirth, cpr, isWorker) VALUES (?, ?, ?, ?, ?, ?, ?)",
#             ("test@example.com", "password123", "John", "Doe", "2000-01-01", "123456-7890", 0)
#         )
#     except sqlite3.IntegrityError:
#         pass
#
#     conn.commit()
#     conn.close()

# init_db()



#login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = sqlite3.connect("app.db")
    c = conn.cursor()
    c.execute("SELECT id, password FROM User WHERE email = ?", (username,))
    row = c.fetchone()
    conn.close()

    if row and row[1] == password:
        id = row[0]
        return jsonify({"success": True, "user": {"id":id,"email": username}})
    return jsonify({"success": False})

#updatePassword
@app.route("/updatePassword", methods=["POST"])
def updatePassword():
    data = request.json
    username = data.get("username")
    new_password = data.get("password")

    if not username or not new_password:
        return jsonify({"success": False, "message": "Missing username or password"}), 400
    
    conn = sqlite3.connect("app.db")
    c = conn.cursor()
    c.execute("SELECT id FROM User WHERE email = ?", (username,))
    row = c.fetchone()
    
    if row:
        c.execute("UPDATE User SET password = ? WHERE email = ?", (new_password, username,))
        conn.commit()
        conn.close()
        return jsonify({"success": True})
    
    return jsonify({"success": False})

#register
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    name = data.get("name")
    surname = data.get("surname")
    dateOfBirth = data.get("dateOfBirth")
    cpr = data.get("cpr")

    if not username or not password or not name or not surname or not dateOfBirth or not cpr:
        return jsonify({"success": False, "message": "Missing data"}), 400

    conn = sqlite3.connect("app.db")
    c = conn.cursor()

    #see if the user exists in DB
    c.execute("SELECT id FROM User WHERE email = ?", (username,))
    if c.fetchone():
        conn.close()
        return jsonify({"success": False, "message": "User already exists"}), 400
    
    c.execute("INSERT INTO User (email, password, name, surname, dateOfBirth, cpr) VALUES (?,?,?,?,?,?)",
        (username, password, name, surname, dateOfBirth, cpr) )
    conn.commit()
    conn.close()

    return jsonify({"success": True})

#user profile
@app.route("/userprofile", methods=["GET"])
def get_user_profile():
    data = request.json
    username = data.get("username")

    conn = sqlite3.connect("app.db")
    c = conn.cursor()
    c.execute("SELECT email, name, surname, dateOfBirth, cpr FROM User WHERE email = ?", (username,))
    row = c.fetchone()
    conn.close()

    if row:
        user = {
            "email": row[0],
            "name": row[1],
            "surname": row[2],
            "dateOfBirth": row[3],
            "cpr": row[4]
        }

    return jsonify(user)

#car list
@app.route("/cars", methods=["GET"])
def get_available_cars():
    conn = sqlite3.connect("app.db")
    c = conn.cursor()
    c.execute("SELECT id, name, price, image, engine, power, transmission, model, year FROM CarList WHERE isAvailable = 1")
    cars = c.fetchall()
    conn.close()

    cars_list = []
    for car in cars:
        cars_list.append({
            "id": car[0],
            "name": car[1],
            "price": car[2],
            "image": car[3],
            "engine": car[4],
            "power": car[5],
            "transmission": car[6],
            "model": car[7],
            "year": car[8]
        })


    return jsonify(cars_list)

#rent car
@app.route("/rent", methods=["POST"])
def rent_car():
    data = request.json
    start_date = data.get("startDate")
    end_date = data.get("endDate")
    user_id = data.get("userId")
    car_id = data.get("carId")

    if not all([start_date, end_date, user_id, car_id]):
        return jsonify({"success": False, "message": "Missing data"}), 400

    conn = sqlite3.connect("app.db")
    c = conn.cursor()
    try:
        c.execute(
            "INSERT INTO RentalHistory (startDate, endDate, UserId, CarId) VALUES (?, ?, ?, ?)",
            (start_date, end_date, user_id, car_id)
        )
        c.execute("UPDATE CarList SET isAvailable = 0 WHERE id = ?", (car_id,))
        conn.commit()
        return jsonify({"success": True, "message": "Rental confirmed"})
    except Exception as e:
        print("DB error:", e)
        return jsonify({"success": False, "message": "Database error"}), 500
    finally:
        conn.close()

if __name__ == "__main__":
    app.run(port=5000, debug=True)
