from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
from sentence_transformers import SentenceTransformer, util
from textblob import TextBlob
import torch

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# Load Excel data
df = pd.read_excel("SIH_1.xlsx")

# Combine text for embedding
# Use safe access for 'Technology Bucket' column
tech_col = (df['Technology Bucket'] if 'Technology Bucket' in df.columns else pd.Series([''] * len(df))).fillna('')
df['CombinedText'] = (
    df['Title'].fillna('') + '. ' +
    df['Description'].fillna('') + '. ' +
    tech_col
)

# Load model and encode projects
model = SentenceTransformer('all-MiniLM-L6-v2')
project_embeddings = model.encode(df['CombinedText'].tolist(), convert_to_tensor=True)

# Helpers
def correct_text(text):
    return str(TextBlob(text).correct())

def extract_keywords(text):
    return [word.lower() for word in text.split() if len(word) > 3]

# API Route
@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.get_json()
    user_prompt = data.get("prompt", "")

    if not user_prompt.strip():
        return jsonify({"error": "Prompt cannot be empty"}), 400

    corrected = correct_text(user_prompt)
    keywords = extract_keywords(corrected)
    query_embedding = model.encode(corrected, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(query_embedding, project_embeddings)[0]

    min_similarity_threshold = 0.30
    top_scores, top_indices = scores.topk(len(df))
    results = []

    for idx, score in zip(top_indices.tolist(), top_scores.tolist()):
        if score < min_similarity_threshold:
            continue

        category_match = True
        if "software" in corrected.lower():
            category_match = df.loc[idx, 'Category'].lower() == "software"
        elif "hardware" in corrected.lower():
            category_match = df.loc[idx, 'Category'].lower() == "hardware"

        if not category_match:
            continue

        title_keywords = df.loc[idx, 'Title'].lower().split()
        tech_keywords = str((df['Technology Bucket'] if 'Technology Bucket' in df.columns else pd.Series([''] * len(df))).loc[idx]).lower().split()
        matched_keywords = list(set(title_keywords + tech_keywords).intersection(set(keywords)))

        results.append({
            "Title": df.loc[idx, 'Title'],
            "Description": df.loc[idx, 'Description'],
            "Domain": df.loc[idx, 'Category'],
            "Technology": (df['Technology Bucket'] if 'Technology Bucket' in df.columns else pd.Series([''] * len(df))).loc[idx],
            "Similarity": round(float(score), 2),
            "MatchedKeywords": matched_keywords if matched_keywords else None
        })

        if len(results) >= 5:
            break

    if not results:
        return jsonify({"message": "No sufficiently relevant project found."}), 200

    return jsonify({
        "corrected_prompt": corrected,
        "suggestions": results
    })


if __name__ == '__main__':
    app.run(debug=True, port =8000)
