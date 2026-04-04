# Getting Started

Follow these steps to set up and run the AI Dev Assistant on your local machine.

## Prerequisites
- [Node.js 18+](https://nodejs.org/)
- [Python 3.10+](https://www.python.org/)
- OpenAI API Key

---

## 1. Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   *Note: Ensure `django`, `django-cors-headers`, `djangorestframework`, and `openai` are installed.*

4. Configure environment variables:
   Create a `.env` file in the `backend/` root:
   ```env
   OPENAI_API_KEY=your_actual_key_here
   ```

5. Run migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
   The backend will start at `http://127.0.0.1:8000/`.

---

## 2. Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend/ai-dev-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will open automatically at `http://localhost:3000/`.

---

## Troubleshooting

- **CORS Errors:** Ensure `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` are correctly set in `backend/ai_dev_assistant/settings.py`.
- **API Key:** If you get a 500 error, verify your OpenAI API key in the `.env` file and check if you have sufficient credits.
- **ReferenceErrors:** If the dashboard fails to render, ensure all npm packages are correctly installed via `npm install`.
