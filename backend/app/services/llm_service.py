import json
import os
from dotenv import load_dotenv
from openai import OpenAI
from app.core.config import settings
from app.schemas.resume import CandidateDataExtraction, MatchEvaluationResponse

# Explicitly load .env file from root/backend directory
load_dotenv()

class LLMService:
    def __init__(self):
        # Fetch key directly from environment or settings
        groq_key = os.getenv("GROQ_API_KEY") or getattr(settings, "GROQ_API_KEY", None)
        openai_key = os.getenv("OPENAI_API_KEY") or getattr(settings, "OPENAI_API_KEY", None)

        if groq_key:
            # Connect to Groq API
            self.client = OpenAI(
                base_url="https://api.groq.com/openai/v1",
                api_key=groq_key.strip(),
            )
            self.model = "llama-3.3-70b-versatile"
        elif openai_key and not openai_key.startswith("gsk_"):
            # Connect to OpenAI API
            self.client = OpenAI(api_key=openai_key.strip())
            self.model = getattr(settings, "LLM_MODEL", "gpt-4o-mini")
        else:
            self.client = None
            self.model = None

    def extract_structured_resume(self, raw_text: str) -> CandidateDataExtraction:
        """Parses raw resume text into structured fields using LLM."""
        if not self.client:
            return CandidateDataExtraction(
                candidate_name="Parsed Candidate",
                skills=["Python", "FastAPI", "SQL"],
                experience=raw_text[:400],
                education="Degree details from resume"
            )

        prompt = f"""
        Extract structured details from the following resume text.
        Return a valid JSON object with keys:
        - candidate_name (string or null)
        - skills (list of strings)
        - experience (string summary)
        - education (string summary)

        Resume Text:
        {raw_text}
        """

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"}
            )
            data = json.loads(response.choices[0].message.content)
            return CandidateDataExtraction(**data)
        except Exception:
            return CandidateDataExtraction(
                candidate_name="Candidate",
                skills=[],
                experience=raw_text,
                education=""
            )

    def evaluate_candidate_match(self, candidate_data: CandidateDataExtraction, job_description: str) -> MatchEvaluationResponse:
        """Compares candidate details with job description and outputs a match score and evaluation."""
        if not self.client:
            return MatchEvaluationResponse(
                match_score=8,
                justification="Mock Evaluation: Candidate possesses matching technical skills and experience for the job description."
            )

        prompt = f"""
        Compare the following resume with this job description and rate fit on 1-10 with justification.

        Job Description:
        {job_description}

        Candidate Resume Summary:
        - Candidate Name: {candidate_data.candidate_name}
        - Skills: {', '.join(candidate_data.skills)}
        - Experience: {candidate_data.experience}
        - Education: {candidate_data.education}

        Return raw JSON format:
        {{
            "match_score": <INTEGER BETWEEN 1 AND 10>,
            "justification": "<DETAILED RATIONALE EXPLAINING STRENGTHS AND GAPS>"
        }}
        """

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"}
            )
            data = json.loads(response.choices[0].message.content)
            return MatchEvaluationResponse(**data)
        except Exception as e:
            return MatchEvaluationResponse(
                match_score=5,
                justification=f"LLM Evaluation failed: {str(e)}"
            )