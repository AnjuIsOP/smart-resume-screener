# Architecture Specification

## System Architecture Overview
The system processes uploaded PDF or raw text resumes and job descriptions through an automated backend pipeline.

┌──────────────────┐     ┌──────────────────┐     ┌──────────────────────┐
│  Upload Input    │────>│ Data Extraction  │────>│   Database Storage   │
│  (Resume + JD)   │     │ (Skills/Edu/Exp) │     │  (Parsed Resumes)    │
└──────────────────┘     └──────────────────┘     └──────────────────────┘
│
▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────────┐
│  Output Results  │<────│   Match Score    │<────│     LLM Service      │
│ (Score + Reason) │     │ & Justification  │     │ (Semantic Matching)  │
└──────────────────┘     └──────────────────┘     └──────────────────────┘

## System Components
1. **Backend API**: Manages endpoints for document upload, data parsing, and scoring pipeline execution.
2. **Parsing Module**: Extracts raw text from PDF files and converts unstructured text into JSON (skills, experience, education).
3. **Database**: Stores parsed candidate records and job description match scores.
4. **LLM Service Layer**: Executes semantic matching calls and prompts to rate candidate fit.