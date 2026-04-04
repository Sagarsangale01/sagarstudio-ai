
#----------build_code_review_prompt------------------------------------------

def build_code_review_prompt(code, language, framework=None):
    framework_context = f" targeting the {framework} framework" if framework and framework != "None" else ""
    return f"""
You are a senior {language} software architect {framework_context}.

Perform a deep code review and return ONLY a valid JSON object.

Analysis Criteria:
1. Security vulnerabilities (SQL injection, XSS, insecure dependencies).
2. Performance bottlenecks and optimization suggestions.
3. Code quality, maintainability, and adherence to {language} best practices.
4. Framework-specific optimizations (if applicable).

Output Schema:
{{
  "issues": ["list of critical and minor issues found"],
  "improvements": ["step-by-step suggestions for better code"],
  "best_practices": ["relevant industry standards"],
  "complexity": "Provide Big O time and space complexity",
  "optimized_code": "The fully refactored and optimized version of the code"
}}

Code for Review:
{code}
"""

#------------------build_sql_prompt---------------------------------------

def build_sql_prompt(query, db):
    return f"""
You are an expert database engineer specialized in {db}.

Convert the following natural language into a highly optimized {db} SQL query.

Output Requirements:
1. Use production-ready SQL syntax.
2. Avoid SELECT *; explicitly name all columns.
3. Use proper indexing hints if applicable.
4. Implement proper joins and subqueries where performance is best.
5. Provide a detailed explanation of the logic used.

Output Schema:
{{
  "sql": "The formatted SQL query",
  "explanation": "Detailed explanation of the query and tables used",
  "optimization_tips": ["List of ways to speed up this specific query"]
}}

User Query:
{query}
"""

#------------------build_api_prompt---------------------------------------

def build_api_prompt(description, language, framework, database):
    return f"""
You are a senior backend architect.

Task: Generate a full Boilerplate API with the following tech stack:
Language: {language}
Framework: {framework}
Database: {database}

Requirements:
1. Modular Architecture: Use a clean, professional folder structure (e.g., Controllers, Models, Routes).
2. Security: Implement JWT, secure password hashing (Bcrypt/Argon), and CORS protection.
3. Database: Use optimal ORM/Query builder patterns (Sequelize, TypeORM, Mongoose, etc.).
4. Validation: Include input validation patterns.
5. Error Handling: Professional global error handling middleware.

Output Schema:
{{
  "models": "Modern model definitions",
  "controllers": "Full logic with professional error handling",
  "routes": "Protected and public API routes",
  "database_config": "Connection logic and environment setup",
  "auth": "Full JWT/Passport/Auth logic",
  "setup": "Step-by-step instructions (npm/yarn commands and .env variables)"
}}

Description: {description}

Return ONLY valid JSON. No conversational text.
"""

#------------------build_bug_fix_prompt---------------------------------------

def build_bug_fix_prompt(code, language, framework=None):
    framework_context = f" in the {framework} framework" if framework and framework != "None" else ""
    return f"""
You are an expert {language} developer. Your job is to debug and fix code{framework_context}.

Identify logical bugs, syntax errors, and edge cases.

Output Schema:
{{
  "issues": ["Found logical errors", "Syntax mistakes", "Security flaws"],
  "fixed_code": "The complete code block after being fixed",
  "explanation": "Brief explanation of why the change was necessary"
}}

Code to Fix:
{code}

Return ONLY valid JSON.
"""

#------------------build_explain_prompt---------------------------------------


def build_explain_prompt(code, language, framework=None):
    framework_context = f" within the context of {framework}" if framework and framework != "None" else ""
    return f"""
You are a technical educator specializing in {language}{framework_context}.

Explain this code clearly for both beginners and intermediate developers.

Output Schema:
{{
  "summary": "High-level purpose of the code",
  "line_by_line": [
    {{"Line/Section": "Explanation of logic"}}
  ],
  "complexity": "Big O Time & Space complexity",
  "use_cases": ["Real-world scenarios where this is used"]
}}

Code:
{code}

Return ONLY valid JSON.
"""


def build_converter_prompt(code, source_lang, target_lang):
    return f"""
You are an expert polyglot developer.

Convert code from {source_lang} to {target_lang}. Ensure parity in logic, performance, and naming conventions.

Output Schema:
{{
  "converted_code": "The perfectly converted code",
  "notes": ["Important differences between {source_lang} and {target_lang} for this snippet"]
}}

Original {source_lang} Code:
{code}

Return ONLY valid JSON.
"""


def build_onboarding_guide_prompt(goal, language, framework, database):

   framework_context = f" within the context of {framework}" if framework and framework != "None" else ""
   database_context = f" within the context of {database}" if database and database != "None" else ""
   
   return f"""
You are a senior polyglot mentor helping a developer migrate from JavaScript/Node.js to {language} using {framework_context} and {database_context}.

Goal: {goal}

Task: Provide a definitive, step-by-step implementation guide. 

Requirements for each step:
1. Conceptual Bridge: Explain why we do this in {language} compared to how it's done in JS.
2. The "How-To": Clear instructions for {framework} and {database}.
3. CODE BLOCK: Provide the exact code required for this step.

Output Schema:
{{
  "summary": "High-level architectural overview",
  "steps": [
    {{
      "title": "Step Name (e.g., Database Connection)",
      "description": "The 'Why' and 'How' explanation",
      "code": "The actual code snippet for this step"
    }}
  ],
  "complete_project_code": "A single consolidated code block for reference"
}}

Return ONLY valid JSON.
"""


def build_error_analysis_prompt(error, language, framework, database):
    framework_context = f" targeting the {framework} framework" if framework and framework != "None" else ""
    database_context = f" with {database} database" if database and database != "None" else ""
    
    return f"""
You are a senior {language} debugger and software architect{framework_context}{database_context}.

Task: Analyze the following error message and provide a comprehensive breakdown.

Analysis Requirements:
1. What is wrong: A clear, concise explanation of the error.
2. Why it's wrong: The root cause and underlying technical reason why this error occurred.
3. Step-by-Step Solution: A detailed, numbered list of steps to fix the issue, including code snippets if necessary.

Output Schema:
{{
  "what_is_wrong": "Brief summary of the error",
  "why_it_is_wrong": "Detailed root cause analysis",
  "solution_steps": [
    {{
      "step": "Step description",
      "action": "What to change/run",
      "code": "Optional code snippet or command"
    }}
  ],
  "prevention_tips": ["How to avoid this error in the future"]
}}

Error Message:
{error}

Return ONLY valid JSON.
"""