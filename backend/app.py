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

    #username validation
    if len(username) < 3 or len(username) > 20:
        return "ERROR: Username must be between 3 and 20 characters."
    
    
    #email validation

    #password validation