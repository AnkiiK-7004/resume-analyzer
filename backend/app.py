from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
import os
from resume_analyzer import analyze_resume

app = Flask(__name__)
CORS(app, origins="*")  # not just CORS(app)


@app.route("/", methods=["GET"])
def home():
    return "✅ Resume Analyzer backend is running!"

@app.route("/analyze", methods=["POST"])
def analyze():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]
    text = extract_text_from_pdf(file)
    result = analyze_resume(text)

    return jsonify(result)

def extract_text_from_pdf(file):
    pdf_doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in pdf_doc:
        text += page.get_text()
    return text

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
