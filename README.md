Copy **everything inside the code box below** (from `# Smart Resume Screener 🚀` down to the very end) and paste it into your `README.md` file!

```markdown
# Smart Resume Screener 🚀

An AI-powered web application that parses candidate resumes (PDFs) and evaluates their semantic fit against target job descriptions using high-speed LLMs.

---

## ✨ Features

- **Automated Resume Parsing:** Extracts structured details including candidate name, key skills, relevant experience, and education summaries.
- **AI Match Scoring:** Generates an accurate 1–10 match rating based on semantic alignment with the job description.
- **Detailed Evaluation Justification:** Provides clear rationale explaining candidate strengths and skill gaps.
- **Candidate Leaderboard:** Automatically saves evaluations to a local database for easy side-by-side comparison.
- **Fast & Scalable LLM Integration:** Powered by Groq (Llama 3.3 70B) for instant evaluations with minimal latency.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Python / FastAPI
- **LLM Provider:** Groq API (`llama-3.3-70b-versatile`) / OpenAI SDK
- **Database:** SQLite with SQLAlchemy ORM
- **Environment Management:** `python-dotenv`

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Modern CSS / Tailwind CSS

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Groq API Key (Free at [console.groq.com](https://console.groq.com))

---

### 1️⃣ Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend

```

2. Create and activate a Python virtual environment:
```bash
python -m venv venv

# On Windows PowerShell:
.\venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

```


3. Install backend dependencies:
```bash
pip install -r requirements.txt

```


4. Create a `.env` file in the `backend/` folder:
```env
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=sqlite:///./sql_app.db

```


5. Start the backend server:
```bash
uvicorn app.main:app --reload

```


The backend server will run at `http://127.0.0.1:8000`.

---

### 2️⃣ Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend

```


2. Install frontend dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```


The application will be accessible at `http://localhost:5173`.

---

## 🧪 Usage Instructions

1. Open your browser and navigate to `http://localhost:5173`.
2. Paste a target Job Description into the text area.
3. Upload a candidate resume (PDF format).
4. Click **Evaluate Candidate Fit**.
5. View the extracted candidate skills, match rating, and detailed LLM evaluation.
6. Click on the **Leaderboard** tab to review all previously evaluated candidates.

```

```