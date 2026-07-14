from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class CandidateDataExtraction(BaseModel):
    candidate_name: Optional[str] = None
    skills: List[str] = []
    experience: Optional[str] = None
    education: Optional[str] = None

class MatchEvaluationResponse(BaseModel):
    match_score: int = Field(..., ge=1, le=10, description="Match score rating between 1 and 10")
    justification: str

class CandidateEvaluationCreate(BaseModel):
    job_description: str

class CandidateEvaluationResponse(BaseModel):
    id: int
    filename: str
    candidate_name: Optional[str] = None
    skills: List[str] = []
    experience: Optional[str] = None
    education: Optional[str] = None
    job_description: str
    match_score: Optional[int] = None
    justification: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True  # Indented INSIDE CandidateEvaluationResponse