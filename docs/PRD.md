# Product Requirement Document (PRD) - Smart Resume Screener

## 1. Objective
* Intelligently parse resumes, extract structured candidate skills, and match them with specific job descriptions.

## 2. Scope of Work
* **Input Capabilities**: Accept resumes in PDF/Text format alongside a target job description.
* **Data Extraction**: Extract structured data including skills, work experience, and education history.
* **Match Scoring**: Utilize Large Language Models (LLMs) to calculate semantic candidate fit scores.
* **Results Display**: Display shortlisted candidates along with detailed qualitative justification.

## 3. Key Technical Requirements
* **Backend API**: Built using Node.js, Python, or Java.
* **Database**: Persistent storage for parsed resumes and matching results.
* **Frontend (Optional)**: Dashboard to upload inputs and review candidate matches.

## 4. Deliverables
* GitHub repository containing clear, incremental commits.
* Complete `README.md` documenting system architecture and used LLM prompts.
* A 2–3 minute demonstration video showcasing project functionality.

## 5. Evaluation Criteria
* Code quality and project structure.
* Accuracy of data extraction.
* Quality of LLM prompts and output clarity.