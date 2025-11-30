from flask import Flask, request, jsonify, render_template
import json
import os
from datetime import datetime

# --- CONFIGURATION ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Data File Path: Data stored in /mysite/backend/reflections.json
DATA_DIR = os.path.join(BASE_DIR, "backend")
DATA_FILE = os.path.join(DATA_DIR, "reflections.json")

# Initialize Flask App (defaults to 'static' and 'templates')
app = Flask(__name__)

# --- JSON HELPER FUNCTIONS ---

def load_reflections():
    """Reads reflections from reflections.json. Returns an empty list if file doesn't exist."""
    # Ensure directory exists before reading/writing
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r") as f:
                file_content = f.read().strip()
                # Return empty list if file content is empty
                return json.loads(file_content) if file_content else []
        except json.JSONDecodeError:
            print("Warning: JSON Decode Error, file content may be corrupted.")
            return []
    return []

def save_reflections(reflections):
    """Saves reflections back into reflections.json."""
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump(reflections, f, indent=4)

# --- FLASK ROUTES (FIXED) ---

# Homepage Route
@app.route("/")
def index():
    """Serves the main index.html file."""
    return render_template("index.html")

# Journal Route
@app.route("/journal")
def journal():
    """Serves the journal.html file."""
    return render_template("journal.html")

# About Route
@app.route("/about")
def about():
    """Serves the about.html file."""
    return render_template("about.html")

# Projects Route
@app.route("/projects")
def projects():
    """Serves the projects.html file."""
    return render_template("projects.html")

# --- API ROUTES ---

# API GET Route: Returns all reflections
@app.route("/api/reflections", methods=["GET"])
def get_reflections():
    reflections = load_reflections()
    return jsonify(reflections)

# API POST Route: Receives new reflections and saves them
@app.route("/api/reflections", methods=["POST"])
def add_reflection():
    data = request.get_json()

    new_reflection = {
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "name": data.get("name", "Anonymous"),
        "reflection": data["reflection"]
    }

    reflections = load_reflections()
    reflections.append(new_reflection)
    save_reflections(reflections)

    return jsonify(new_reflection), 201

# API DELETE Route: Deletes the most recent reflection
@app.route("/api/reflections/delete", methods=["DELETE"])
def delete_reflection():
    reflections = load_reflections()

    if not reflections:
        return jsonify({"message": "No reflections to delete."}), 404

    deleted_reflection = reflections.pop()
    save_reflections(reflections)

    return jsonify({
        "message": "Successfully deleted the most recent reflection.",
        "deleted": deleted_reflection
    }), 200

if __name__ == "__main__":
    app.run(debug=True)