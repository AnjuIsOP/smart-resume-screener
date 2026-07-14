import io
from pypdf import PdfReader
from fastapi import UploadFile, HTTPException
from app.schemas.resume import CandidateDataExtraction

class ResumeParserService:
    @staticmethod
    def extract_text_from_pdf(file: UploadFile) -> str:
        """Extract raw text content from an uploaded PDF file."""
        try:
            pdf_bytes = file.file.read()
            pdf_file = io.BytesIO(pdf_bytes)
            reader = PdfReader(pdf_file)
            
            extracted_text = ""
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    extracted_text += text + "\n"
            
            if not extracted_text.strip():
                raise HTTPException(status_code=400, detail="Unable to extract text from the provided PDF file.")
                
            return extracted_text.strip()
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to process PDF file: {str(e)}")

    @staticmethod
    def fallback_parse_resume(raw_text: str) -> CandidateDataExtraction:
        """
        Simple heuristic fallback to structure extracted resume text 
        before or alongside LLM extraction.
        """
        lines = [line.strip() for line in raw_text.split("\n") if line.strip()]
        candidate_name = lines[0] if lines else "Unknown Candidate"

        return CandidateDataExtraction(
            candidate_name=candidate_name,
            skills=[],
            experience=raw_text,
            education=None
        )