from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.resume import CandidateEvaluation
from app.schemas.resume import CandidateEvaluationResponse
from app.services.parser import ResumeParserService
from app.services.llm_service import LLMService

router = APIRouter()
llm_service = LLMService()

@router.post("/evaluate", response_model=CandidateEvaluationResponse)
async def evaluate_resume(
    job_description: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload a resume PDF along with a job description.
    Parses PDF, computes LLM match score (1-10) with justification,
    and stores evaluation details in the database.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    # 1. Extract raw text from PDF
    raw_text = ResumeParserService.extract_text_from_pdf(file)

    # 2. Extract structured data via LLM
    extracted_data = llm_service.extract_structured_resume(raw_text)

    # 3. Compute match score and justification
    evaluation = llm_service.evaluate_candidate_match(extracted_data, job_description)

    # 4. Save record to Database
    db_candidate = CandidateEvaluation(
        candidate_name=extracted_data.candidate_name,
        filename=file.filename,
        skills=extracted_data.skills,
        experience=extracted_data.experience,
        education=extracted_data.education,
        job_description=job_description,
        match_score=evaluation.match_score,
        justification=evaluation.justification
    )
    
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)

    return db_candidate

@router.get("/candidates", response_model=List[CandidateEvaluationResponse])
def list_candidates(db: Session = Depends(get_db)):
    """Retrieve all shortlisted candidates ordered by match score."""
    return db.query(CandidateEvaluation).order_by(CandidateEvaluation.match_score.desc()).all()