from flask import Flask, jsonify, request
from flask_cors import CORS
import bcrypt

import random
import json
from datetime import datetime

with open("reviews.json", "r") as f:
    reviews_data = json.load(f)
with open("flavors.json", "r") as f:
    flavors_data = json.load(f)

app = Flask(__name__)
CORS(app)

users = [
    {
        "id": 1,
        "username": "sweet alice",
        "email": "alice@example.com",
        "password_hash": "2b$12$examplehashedvalue",
        "cart": [
            {
                "flavorId": 2,
                "name": "Chocolate Bliss",
                "price": 5.49,
                "quantity": 2
            }
        ],
        "orders": [
            {
                "orderId": 1,
                "items": [
                    {
                        "flavorId": 1,
                        "name": "Vanilla Dream",
                        "price": 4.99,
                        "quantity": 1
                    }
                ],
                "total": 4.99,
                "timestamp": "2026-03-30 18:30:00"
            }
        ]
    }
]




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
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

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


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if not all([username, password]):
        return jsonify({
            "success": False,
            "message": "Username and password are required."
        })
    
    user_found = None
    for user in users:
        if user["username"] == username:
            user_found = user
            break

    if user_found is None:
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        })
    
    if bcrypt.checkpw(password.encode('utf-8'), user_found["password_hash"].encode('utf-8')):
        return jsonify({
            "success": True,
            "message": "Login successful.",
            "userId": user_found["id"],
            "username": user_found["username"]
        })
    else:
        return jsonify({
            "success": False,
            "message": "Invalid username or password."
        })

@app.route("/reviews", methods=["GET"])
def getReviews():
    reviews = reviews_data["reviews"]
    length = len(reviews)

    selected_reviews = [reviews[random.randrange(length)], reviews[random.randrange(length)]]
    return jsonify({
        "success": True,
        "message": "Reviews loaded.",
        "reviews": selected_reviews
    })

@app.route("/flavors", methods=["GET"])
def getFlavors():
    return jsonify({
        "success": True,
        "message": "Flavors loaded.",
        "flavors": flavors_data["flavors"]
    })




@app.route("/cart", methods=["GET"])
def getCart():
    user_id = request.args.get("userId")
    found_user = None

    for user in users:
        if user["id"] == int(user_id):
            found_user = user
            break

    if found_user:
        return jsonify({
            "success": True,
            "message": "Cart loaded.",
            "cart": found_user["cart"]
        })
    else:
        return jsonify({
            "success": False,
            "message": "User not found."
        })

@app.route("/cart", methods=["POST"])
def addToCart():
    data = request.get_json()

    user_id = data.get("userId")
    flavor_id = data.get("flavorId")

    found_user = None
    found_flavor = None

    for user in users:
        if user["id"] == int(user_id):
            found_user = user
            break
    
    if not found_user:
        return jsonify({
            "success": False,
            "message": "User not found."
        })
    
    for flavor in flavors_data["flavors"]:
        if flavor["id"] == flavor_id:
            found_flavor = flavor
            break

    if not found_flavor:
        return jsonify({
            "success": False,
            "message": "Flavor not found."
        })
    
    for item in found_user["cart"]:
        if item["flavorId"] == flavor_id:
            return jsonify({
                "success": False,
                "message": "Item already exists in cart. Please use 'PUT /cart' to update quantity instead."
            })

    found_user["cart"].append({
        "flavorId": flavor_id,
        "name": found_flavor["name"],
        "price": found_flavor["price"],
        "quantity": 1
    })

    return jsonify({
        "success": True,
        "message": "Flavor added to cart.",
        "cart": found_user["cart"]
    })

@app.route("/cart", methods=["PUT"])
def updateCartQuantity():
    data = request.get_json()

    user_id = data.get("userId")
    flavor_id = data.get("flavorId")
    quantity = data.get("quantity")

    found_user = None
    found_flavor = None

    if int(quantity) < 1:
        return jsonify({
            "success": False,
            "message": "Quantity must be 1 or above"
        })

    for user in users:
        if user["id"] == int(user_id):
            found_user = user
            break
    
    if not found_user:
        return jsonify({
            "success": False,
            "message": "User not found."
        })
    
    for flavor in found_user["cart"]:
        if flavor["flavorId"] == flavor_id:
            found_flavor = flavor
            break

    if not found_flavor:
        return jsonify({
            "success": False,
            "message": "Flavor does not exist in user's cart."
        })
    
    found_flavor["quantity"] = quantity

    return jsonify({
        "success": True,
        "message": "Cart updated successfully.",
        "cart": found_user["cart"]
    })

@app.route("/cart", methods=["DELETE"])
def deleteCartItem():
    data = request.get_json()

    user_id = data.get("userId")
    flavor_id = data.get("flavorId")

    found_user = None

    for user in users:
        if user["id"] == int(user_id):
            found_user = user
            break
    
    if not found_user:
        return jsonify({
            "success": False,
            "message": "User not found."
        })
    
    for i, item in enumerate(found_user["cart"]):
        if item["flavorId"] == flavor_id:
            del found_user["cart"][i]
            break

    return jsonify({
        "success": True,
        "message": "Flavor removed from cart.",
        "cart": found_user["cart"]
    })




@app.route("/orders", methods=["POST"])
def placeOrder():
    data = request.get_json()

    user_id = data.get("userId")

    found_user = None

    for user in users:
        if user["id"] == int(user_id):
            found_user = user
            break
    
    if not found_user:
        return jsonify({
            "success": False,
            "message": "User not found."
        })
    
    if found_user["cart"] == []:
        return jsonify({
            "success": False,
            "message": "Cannot place order with empty cart."
        })    
    
    #orderId, total, timestamp
    new_order = found_user["cart"].copy()
    found_user["cart"] = []

    total = 0
    for item in new_order:
        total += item["price"] * item["quantity"]

    new_order = {
        "orderId": len(found_user["orders"]) + 1,
        "items": new_order,
        "total": total,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    found_user["orders"].append(new_order)
    
    return jsonify({
        "success": True,
        "message": "Order placed successfully.",
        "orderId": new_order["orderId"]
    })

@app.route("/orders", methods=["GET"])
def getOrders():
    user_id = request.args.get("userId")
    found_user = None

    for user in users:
        if user["id"] == int(user_id):
            found_user = user
            break

    if found_user:
        return jsonify({
            "success": True,
            "message": "Order history loaded.",
            "orders": found_user["orders"]
        })
    else:
        return jsonify({
            "success": False,
            "message": "User not found."
        })