from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from datetime import datetime
from app.core.database import Base

class CandidateEvaluation(Base):
    __tablename__ = "candidate_evaluations"

    # Fixed: Changed primary_index=True to primary_key=True
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    candidate_name = Column(String(255), nullable=True)
    filename = Column(String(255), nullable=False)
    
    # Parsed structured data
    skills = Column(JSON, nullable=True)          # List of extracted skills
    experience = Column(Text, nullable=True)      # Extracted work experience
    education = Column(Text, nullable=True)       # Extracted education history
    
    # Target Job Description & Evaluation Output
    job_description = Column(Text, nullable=False)
    match_score = Column(Integer, nullable=True)  # 1-10 Score
    justification = Column(Text, nullable=True)    # LLM reasoning
    
    created_at = Column(DateTime, default=datetime.utcnow)