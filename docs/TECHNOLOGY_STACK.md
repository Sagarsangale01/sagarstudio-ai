# Technology Stack

The AI Dev Assistant is built using a modern, scalable, and responsive tech stack designed for high availability and low latency.

## Frontend
- **Language:** JavaScript (ES6+)
- **Framework:** [React 19](https://reactjs.org/)
- **UI Library:** [Material UI (MUI) v7+](https://mui.com/)
- **Design System:** Custom **Glassmorphism** styling with Vanilla CSS
- **Code Editor:** [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) (VS Code's engine)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **State Management:** React Hooks (useState/useEffect)

## Backend
- **Language:** [Python 3.x](https://www.python.org/)
- **Framework:** [Django 5.x](https://www.djangoproject.com/)
- **REST API:** [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
- **AI Integration:** [OpenAI SDK](https://github.com/openai/openai-python)
- **Networking:** [Django-CORS-Headers](https://pypi.org/project/django-cors-headers/)

## AI & Intelligence
- **Primary Model:** OpenAI **GPT-4o** (omni)
- **Temperature Configuration:** 0.2 - 0.3 (optimized for code accuracy vs. creativity)
- **Inference Engine:** High-reliability JSON Object formatting

## Infrastructure (Local Development)
- **Frontend Server:** Node.js / React Scripts
- **Backend Server:** Django WSGI/ASGI (Manage.py)
- **Database:** SQLite (Default for metadata tracking)
