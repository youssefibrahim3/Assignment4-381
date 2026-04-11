from flask import Flask, jsonify, request
from flask_cors import CORS
import bcrypt

app = Flask(__name__)
CORS(app)

users = []

@app.route("/signup",methods=["POST"])
def createUser():
    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not all([username, email, password]):
        return jsonify({
            "success": False,
            "message": "A field is missing."
            })

    for user in users:
        if user["username"] == username or user["email"] == email:
            return jsonify({
                "success": False,
                "message": "A user with that username or email already exists."
                })

    #username validation
    if not username or len(username) < 3 or len(username) > 20:
        return jsonify({
            "success": False,
            "message": "Username must be between 3 and 20 characters."
            })
    
    if not username[0].isalpha():
        return jsonify({
            "success": False,
            "message": "Username must begin with a letter."
            })

    for ch in username:
        if not (ch.isalnum() or ch == '_' or ch == '-'):
            return jsonify({
                "success": False,
                "message": "Username may contain letters, numbers, underscores and hyphens only."
                })
    
    #email validation
    if '@' not in email:
        return jsonify({
            "success": False,
            "message": "Invalid email address."
            })

    #password validation
    if len(password) < 8:
        return jsonify({
            "success": False,
            "message": "Password must be at least 8 characters long."
            })

    has_upper = False
    has_lower = False
    has_digit = False
    has_special = False

    for ch in password:
        if ch.isupper():
            has_upper = True
        elif ch.islower():
            has_lower = True
        elif ch.isdigit():
            has_digit = True
        else:
            has_special = True

    if not (has_upper and has_lower and has_digit and has_special):
        return jsonify({
            "success": False,
            "message": "Password must contain uppercase, lowercase, number, and special characters."
        })

    #hashing
    password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    new_user = {
        "id": len(users) + 1,
        "username": username,
        "email": email,
        "password_hash": password_hash,
        "cart": [],
        "orders": []
    }

    users.append(new_user)

    return jsonify({
        "success": True,
        "message": "Registration successful."
    })
