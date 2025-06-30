# AI-powered Personalized Project Generator


## Problem Statement

Students often feel motivated after learning a new concept but struggle to decide what to build or how to start. This leads to missed opportunities for hands-on learning and skill development.

---

## Features

- Concept-wise AI-generated quizzes to identify current skill level
- Personalized DIY project suggestions across domains (Coding, Research, Hardware, etc.)
- Project idea generation from user input (concepts, transcripts)
- Step-by-step project hints instead of full solutions
- AI-powered chatbot mentor to assist when stuck
- GitHub/blog resource recommender based on user project
- NLP-based real-world project generator (via NPM package)

---

## Key Functionalities

### 1. User Input System

- Inputs: Topic name, concept, or video transcript
- Optional: Voice input or YouTube link (future scope)
- Selectable options: Skill level (Beginner to Advanced), Domain (Coding, Hardware, Research, Design, Mixed)

### 2. Skill Level Detection

- Auto-generated multiple-choice quizzes
- Adaptive scoring and level detection

### 3. Project Idea Generation

- Uses Gemini or GPT API to generate 3 personalized project ideas with:
    - Title, Description, Tags (e.g., Internship-ready, Portfolio)
    - Step-by-step hint guide
    - Domain filtering
    - GitHub/blog/article suggestion
    - Public build tips

### 4. Chat-based AI Assistant

- Virtual mentor with guidance on concepts, debugging, and learning paths

### 5. Real-World Project Generator (NLP)

- Based on government-identified challenges using semantic analysis

### 6. Resource Recommender

- GitHub/blog suggestions based on project
- Optional GitHub API integration for live data

---

## Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express, MongoDB |
| AI | Gemini API, OpenRouter, Python NLP |
| Hosting | Vercel (frontend), Render/Fly.io |
| Extras | GitHub API, YouTube Transcript API |

---

## Setup Instructions

### Prerequisites

- Node.js v18+
- Python 3.10+
- MongoDB Atlas or local instance
- Gemini API Key

### Clone the Repository

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file with the following:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

### Python AI Service

```bash
cd ../python\\ backend
python -m venv venv
# Activate environment
venv\\Scripts\\activate  # Windows
# or
source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
python app.py

```

## Access the App

Visit: `http://localhost:5173`

---

## API Endpoints

### Auth

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/verify-email`
- POST `/api/auth/reset-password`

### AI Services

- POST `/api/chatbot/analyze-input`
- POST `/api/chatbot/generate-quiz`
- POST `/api/chatbot/evaluate-answers`
- POST `/api/chatbot/suggest-projects`

### Python Service

- POST `/suggest`

## UI Highlights

- Chat interface with feedback animations
- Protected routes with auth guard
- Dark mode styling
- Responsive layout

## Security Features

- JWT Authentication
- Password hashing with bcrypt
- Email verification
- Input validation and CORS protection

## Folder Structure

```
Always show details
Copy├── backend/
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   ├── middlewares/
│   └── utils/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── context/
└── python backend/

```

## Development Guidelines

- Follow ESLint rules for consistency
- Write clear commits and test features locally
- Document new additions

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request