# Development Rules & Guidelines

## Code Quality Standards
* Ensure clean, modular, and maintainable code structure throughout the project.
* Every function must have clear docstrings and error-handling wrappers.

## LLM & Prompting Rules
* Standardize prompt formats for evaluation tasks.
* **Base Evaluation Prompt**: "Compare the following resume with this job description and rate fit on 1-10 with justification."
* Always require structured outputs (e.g., JSON) from LLM responses to ensure reliable parsing.

## Repository Guidelines
* Maintain consistent git commits with descriptive commit messages.
* Do not commit sensitive API keys or `.env` configuration files.