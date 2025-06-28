# Personal Privacy Dashboard

**Personal Privacy Dashboard** is a comprehensive AI-powered learning platform that helps users understand and apply privacy concepts through interactive quizzes, personalized project suggestions, and intelligent content analysis. Built with modern web technologies, it provides a secure and engaging environment for privacy education.

---

## Project Overview

This platform addresses the growing need for privacy education by offering:

- **Interactive Learning**: AI-generated quizzes based on user input concepts
- **Personalized Projects**: Tailored project suggestions using semantic analysis
- **Multi-Modal Input**: Support for both text concepts and video transcript analysis
- **Skill Assessment**: Dynamic difficulty adjustment based on user performance
- **Secure Authentication**: Complete user management with email verification

Whether you're a privacy professional, student, or enthusiast, this dashboard empowers you to learn privacy concepts through hands-on practice and assessment.

---

## Architecture

### Frontend (React + Vite)

- **UI Framework**: React 19 with modern hooks and context
- **Styling**: Tailwind CSS with custom components
- **Routing**: React Router v7 with protected routes
- **State Management**: Context API for authentication
- **Animations**: Framer Motion for smooth interactions

### Backend (Node.js + Express)

- **Server**: Express.js with ES modules
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Email**: Nodemailer for verification emails
- **AI Integration**: Google Gemini API for content generation

### AI Services (Python + Flask)

- **Semantic Analysis**: Sentence transformers for project matching
- **Text Processing**: TextBlob for text correction
- **Data Processing**: Pandas for Excel data handling
- **ML Models**: Pre-trained embeddings for similarity matching

---

## Key Features

### Authentication System

- User registration with email verification
- Secure login with JWT tokens
- Password reset functionality
- Protected route management

### AI-Powered Learning

- **Concept Analysis**: Extract keywords and summaries from user input
- **Quiz Generation**: Create personalized quizzes with multiple question types
- **Answer Evaluation**: Intelligent assessment with detailed feedback
- **Project Suggestions**: Semantic matching for relevant project ideas

### Interactive Assessment

- Multiple Choice Questions to test theoretical knowledge
- Fill-in-the-Blanks to assess understanding of key concepts
- Real-world Scenarios for practical application
- Dynamic Scoring and adaptive difficulty based on performance

### Project Recommendations

- Semantic Matching to find projects based on user interests
- Category Filtering across Software, Hardware, and Research
- Difficulty Levels from Beginner to Advanced
- Personalized Results based on the user’s learning level

---

## Installation Guide

### Prerequisites

- Node.js v18+
- Python 3.10+
- MongoDB instance
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Personal-Privacy-Dashboard

```

### 2. Backend Setup

```bash
cd backend
npm insta

```

Create a `.env` file:

```json
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_KEY2=your_secondary_gemini_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Python Backend Setup

```bash
cd ../python\ backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt

```

### 5. Start All Services

**Terminal 1 - Python AI Service**

```bash
cd python\ backend
python app.py

```

**Terminal 2 - Node.js Backend**

```bash
cd backend
npm start
```

**Terminal 3 - React Frontend**

```bash
cd frontend
npm run dev
```

Access the application at: `http://localhost:5173`

---

## Usage Examples

### Learning Flow

1. Register/Login – Create account with email verification
2. Input Concept – Enter privacy topic or upload video transcript
3. Take Quiz – Complete AI-generated assessment
4. Get Projects – Receive personalized project suggestions
5. Track Progress – Monitor learning journey in dashboard

### Sample Input

```
Concept: "Data Privacy in IoT"
Domains: ["Software", "Hardware"]

```

### Sample Output

```json

{
  "level": "Intermediate",
  "projects": [
    {
      "title": "IoT Privacy Monitor",
      "description": "Build a system to detect privacy violations...",
      "category": "Hardware",
      "difficulty": "Intermediate"
    }
  ]
}

```

---

## API Endpoints

### Authentication

- `POST /api/auth/register` – User registration
- `POST /api/auth/login` – User login
- `POST /api/auth/verify-email` – Email verification
- `POST /api/auth/reset-password` – Password reset

### AI Services

- `POST /api/chatbot/analyze-input` – Analyze user concepts
- `POST /api/chatbot/generate-quiz` – Create personalized quizzes
- `POST /api/chatbot/evaluate-answers` – Assess quiz responses
- `POST /api/chatbot/suggest-projects` – Get project recommendations

### Python AI Service

- `POST /suggest` – Semantic project matching

---

## UI Components

- Responsive Design using Tailwind CSS
- Dark Theme interface
- Loading States with animations and feedback
- Toast Notifications for alerts and messages
- Protected Routes with authentication guards

---

## Security Features

- JWT Authentication
- Password Hashing with bcrypt
- Email Verification
- CORS Protection
- Input Validation

---

## Development

### Code Structure

```
bash
├── backend/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API endpoints
│   ├── middlewares/     # Authentication & validation
│   └── utils/           # Helper functions
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route components
│   │   ├── services/    # API calls
│   │   └── context/     # State management
└── python backend/      # AI services

```

### Environment Variables

Create appropriate `.env` files in each service directory with the required configuration.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow ESLint configuration
- Write meaningful commit messages
- Test all features before submitting
- Update documentation for new features

---