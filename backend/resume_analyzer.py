import spacy
import re
from collections import defaultdict
from textblob import TextBlob

nlp = spacy.load("en_core_web_sm")

def grammar_score(text):
    blob = TextBlob(text)
    corrected = blob.correct()
    if text == str(corrected):
        return 10, 0
    else:
        errors = sum(1 for a, b in zip(text.split(), str(corrected).split()) if a != b)
        if errors < 5:
            return 8, errors
        elif errors < 10:
            return 6, errors
        else:
            return 4, errors

def analyze_resume(text):
    lower_text = text.lower()

    sections = {
        "skills": ["skills", "technical skills"],
        "projects": ["projects", "project experience"],
        "certifications": ["certifications", "courses"],
        "education": ["education", "qualification"],
        "experience": ["experience", "internship", "work history"],
        "achievements": ["achievements", "awards"]
    }

    fullstack_keywords = [
        "html", "css", "javascript", "react", "node", "express", "python", "flask", "django",
        "sql", "mongodb", "firebase", "git", "docker", "aws", "api", "rest", "web development"
    ]

    scores = defaultdict(int)
    suggestions = []

    skill_score = sum(1 for kw in fullstack_keywords if kw in lower_text)
    scores['skills'] = min(skill_score * 2, 20)
    if scores['skills'] < 10:
        suggestions.append("Add more relevant full-stack technologies in skills section.")

    for section, keywords in sections.items():
        if any(kw in lower_text for kw in keywords):
            scores[section] = 10 if section in ['projects', 'certifications'] else 5
        else:
            suggestions.append(f"Consider adding a clear '{section.capitalize()}' section.")

    if re.search(r'\n\s*[A-Z ]{4,}\n', text):
        scores['formatting'] = 10
    else:
        scores['formatting'] = 5
        suggestions.append("Use consistent formatting and clear section headers.")

    grammar, errors = grammar_score(text)
    scores['grammar'] = grammar
    if errors > 0:
        suggestions.append(f"Spelling or grammar issues detected: approx. {errors} errors. Fix to improve quality.")

    total_score = sum(scores.values())
    if total_score > 100:
        total_score = 100

    return {
        "score": total_score,
        "sections": dict(scores),
        "suggestions": suggestions
    }
