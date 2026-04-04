# Code Flow Guide: Request Life Cycle

This guide explains how data travels through the AI Dev Assistant when a developer interacts with a module.

## 1. User Interaction (Frontend)
- The user selects a technology (e.g., Language: Go, Framework: Gin).
- The user enters source code or a prompt into the **Monaco Editor**.
- The user clicks a "Generate" or "Analyze" button.

## 2. State & API Call (Frontend)
- The page component (e.g., `CodeReview.js`) sets `loading(true)` and calls the appropriate service from `src/services/api.js`.
- An Axios POST request is dispatched to the Django backend with the payload: `{ code, language, framework }`.

## 3. Request Routing (Backend)
- Django's `urls.py` directs the request to a specific view function in `views.py`.
- The view validates the incoming data and extracts parameters.

## 4. Prompt Engineering (Backend Service)
- The view calls a specialized function in `prompt_builder.py`.
- **Context Injection:** The prompt builder takes the user's code and wraps it in a carefully crafted "System Prompt" that defines the AI's persona, constraints, and the required **JSON schema**.

## 5. LLM Inference (OpenAI Service)
- The `openai_service.py` sends the combined prompt to the OpenAI **GPT-4o** API.
- Parameters used:
    - `response_format: { "type": "json_object" }` (Guarantees JSON)
    - `temperature: 0.3` (Ensures consistency)

## 6. Response & Parsing (Backend to Frontend)
- The AI returns a JSON string.
- The Django view parses the string into a Python Dictionary and returns it as a standard JSON response to the React app.

## 7. Dynamic UI Update (Frontend Rendering)
- The React component receives the data.
- **Layout Shift:** The input panel shrinks to 50% width.
- **Conditional Rendering:** The result panel (6/6 grid) appears, rendering the AI insights using custom components (Accordions, Steppers, or secondary Monaco editors).
- `loading(false)` is set, and the UI becomes interactive again.
