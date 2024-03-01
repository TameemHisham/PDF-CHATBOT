from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import torch


# Initialize Flask application
app = Flask(__name__)

# Configure SQLAlchemy database URI
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"

# Disable tracking modifications to the database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Allow requests from your React frontend URL
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Replace with your React frontend URL

# Initialize SQLAlchemy with the Flask app
db = SQLAlchemy(app)
