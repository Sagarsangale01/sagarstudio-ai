import os
import sys
import django
import json

sys.path.append(r"d:\01 AI PROJECTS\ai_dev_assistant\backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ai_dev_assistant.settings")
django.setup()

from core.services.prompt_builder import build_refactoring_prompt
from core.services.openai_service import generate_response

prompt = build_refactoring_prompt("function test() { console.log('hello'); }", "javascript")
result = generate_response(prompt)
print("RAW RESULT START")
print(result)
print("RAW RESULT END")

try:
    parsed = json.loads(result)
    with open('out.json', 'w') as f:
        json.dump(parsed, f, indent=2)
except Exception as e:
    print("PARSE ERROR:", e)
