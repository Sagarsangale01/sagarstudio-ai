# Project Structure

## Overview
The repository is split into two main directories: `frontend` (React client) and `backend` (Django server).

```text
ai_dev_assistant/
├── backend/                  # Django Python Backend
│   ├── ai_dev_assistant/     # Project Configuration (settings.py, urls.py)
│   ├── core/                 # Main Application Logic
│   │   ├── services/         # Business Logic Services
│   │   │   ├── openai_service.py   # OpenAI API Integration
│   │   │   └── prompt_builder.py   # AI Instruction Logic
│   │   ├── urls.py           # API Route Definitions
│   │   └── views.py          # Request Handlers
│   ├── manage.py             # CLI Entry Point
│   └── .env                  # API Keys & Secrets
│
└── frontend/                 # React Frontend
    └── ai-dev-frontend/
        ├── public/           # Static Assets
        └── src/
            ├── components/   # Shared UI Components (Sidebar)
            ├── pages/        # Main Tool Modules (CodeReview, BugFixer, etc.)
            ├── services/     # API Integration (Axios)
            ├── utils/        # Constants (LANGUAGES, FRAMEWORKS)
            ├── App.js        # Main Dashboard Orchestrator
            ├── index.css     # Global Glassmorphism Styles
            └── index.js      # Entry Point
```

## Key File Descriptions

### Backend Core
- **`views.py`**: Definites the API endpoints. It gathers data from the request (code, language, framework) and delegates to the services.
- **`prompt_builder.py`**: Contains the "brain" of the AI integration. Custom multi-line strings that define the expert personas and output schemas.
- **`openai_service.py`**: Manages the connection to GPT-4o, setting temperatures and response formats.

### Frontend src
- **`App.js`**: Manages the global `page` state and renders the appropriate page component.
- **`pages/*.js`**: Each file represents a full dashboard tool. They follow a consistent pattern: Input Area (Monaco) -> API Call -> Result Area (Steps/Code).
- **`index.css`**: The design system. Contains the glassmorphism blurring effects, gradient backgrounds, and custom scrollbars.
