from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services.openai_service import generate_response
from .services.prompt_builder import (
    build_code_review_prompt, build_sql_prompt, build_api_prompt, 
    build_bug_fix_prompt, build_explain_prompt, build_converter_prompt, 
    build_onboarding_guide_prompt
)


import json


#-------------code_review-----------------------------------------------

@api_view(['POST'])
def code_review(request):
    code = request.data.get("code")
    language = request.data.get("language")
    framework = request.data.get("framework")

    if not code or not language:
        return Response({"error": "code and language required"}, status=400)

    prompt = build_code_review_prompt(code, language, framework)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)



#---------------------sql_generator------------------------------------

@api_view(['POST'])
def sql_generator(request):
    query = request.data.get("query")
    db = request.data.get("db")

    if not query or not db:
        return Response({"error": "query and db required"}, status=400)

    prompt = build_sql_prompt(query, db)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)


#---------------------api_generator------------------------------------

@api_view(['POST'])
def api_generator(request):
    description = request.data.get("description")
    language = request.data.get("language")
    framework = request.data.get("framework")
    database = request.data.get("database")

    if not description or not language or not framework or not database:
        return Response({"error": "description, language, framework and database required"}, status=400)

    prompt = build_api_prompt(description, language, framework, database)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)


#---------------------bug_fixer------------------------------------

@api_view(['POST'])
def bug_fixer(request):
    code = request.data.get("code")
    language = request.data.get("language")
    framework = request.data.get("framework")

    if not code or not language:
        return Response({"error": "code and language required"}, status=400)

    prompt = build_bug_fix_prompt(code, language, framework)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)


#---------------------code_explainer------------------------------------

@api_view(['POST'])
def code_explainer(request):
    code = request.data.get("code")
    language = request.data.get("language")
    framework = request.data.get("framework")

    if not code or not language:
        return Response({"error": "code and language required"}, status=400)

    prompt = build_explain_prompt(code, language, framework)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)


#---------------------code_converter------------------------------------

@api_view(['POST'])
def code_converter(request):
    code = request.data.get("code")
    source_lang = request.data.get("source_lang")
    target_lang = request.data.get("target_lang")

    if not code or not source_lang or not target_lang:
        return Response({"error": "missing fields"}, status=400)

    prompt = build_converter_prompt(code, source_lang, target_lang)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)


#---------------------tech_onboarding------------------------------------

@api_view(['POST'])
def tech_onboarding(request):
    goal = request.data.get("goal")
    language = request.data.get("language")
    framework = request.data.get("framework")
    database = request.data.get("database")

    if not goal or not language or not framework or not database:
        return Response({"error": "missing fields"}, status=400)

    prompt = build_onboarding_guide_prompt(goal, language, framework, database)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)