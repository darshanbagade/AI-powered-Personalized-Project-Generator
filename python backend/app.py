# app.py
# Create venv (only once)
# python -m venv venv

# Activate venv (Windows)
# venv\Scripts\activate

# pip install flask flask-cors sentence-transformers textblob pandas openpyxl

from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sentence_transformers import SentenceTransformer, util
from textblob import TextBlob

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"]) # allow calls from React frontend

# Load model and data once at startup
df = pd.read_excel("SIH_1.xlsx")
model = SentenceTransformer('all-MiniLM-L6-v2')
descriptions = df['Description'].tolist()
project_embeddings = model.encode(descriptions, convert_to_tensor=True)

# Text correction
def correct_text(text):
    return str(TextBlob(text).correct())

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.json
    user_prompt = data.get("prompt", "")

    corrected = correct_text(user_prompt)

    # Check for category filter
    filter_category = None
    if "software" in corrected.lower():
        filter_category = "Software"
    elif "hardware" in corrected.lower():
        filter_category = "Hardware"

    # Encode and compare
    query_embedding = model.encode(corrected, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(query_embedding, project_embeddings)[0]
    top_scores, top_indices = scores.topk(len(df))

    suggestions = []
    shown = 0
    for idx in top_indices.tolist():
        if filter_category and df.loc[idx, 'Category'].lower() != filter_category.lower():
            continue

        suggestions.append({
            "title": df.loc[idx, 'Title'],
            "description": df.loc[idx, 'Description'],
            "category": df.loc[idx, 'Category']
        })

        shown += 1
        if shown == 3:
            break

    if shown == 0:
        return jsonify({"corrected": corrected, "suggestions": [], "message": "No match found."})

    return jsonify({"corrected": corrected, "suggestions": suggestions})

if __name__ == "__main__":
    app.run(debug=True, port=8000)

