from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services.openai_service import generate_response
from .services.prompt_builder import (
    build_code_review_prompt, build_sql_prompt, build_api_prompt, 
    build_bug_fix_prompt, build_explain_prompt, build_converter_prompt, 
    build_onboarding_guide_prompt, build_error_analysis_prompt,
    build_requirement_analyzer_prompt, build_architecture_advisor_prompt,
    build_project_skeleton_prompt, build_smart_complete_prompt,
    build_refactoring_prompt, build_test_generator_prompt, build_security_advisor_prompt,
    build_tech_docs_prompt, build_cicd_prompt, build_data_transformer_prompt,
    build_performance_profiler_prompt, build_monitoring_alerts_prompt,
    build_cloud_cost_optimizer_prompt, build_version_control_advisor_prompt,
    build_code_snippets_prompt, build_knowledge_base_prompt,
    build_trend_watcher_prompt, build_ai_pair_programming_prompt
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


#---------------------error_analyzer------------------------------------

@api_view(['POST'])
def error_analyzer(request):
    error = request.data.get("error")
    language = request.data.get("language")
    framework = request.data.get("framework")
    database = request.data.get("database")

    if not error or not language:
        return Response({"error": "error and language required"}, status=400)

    prompt = build_error_analysis_prompt(error, language, framework, database)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------requirement_analyzer------------------------------------

@api_view(['POST'])
def requirement_analyzer(request):
    requirements = request.data.get("requirements")

    if not requirements:
        return Response({"error": "requirements required"}, status=400)

    prompt = build_requirement_analyzer_prompt(requirements)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------architecture_advisor------------------------------------

@api_view(['POST'])
def architecture_advisor(request):
    project_description = request.data.get("project_description")

    if not project_description:
        return Response({"error": "project_description required"}, status=400)

    prompt = build_architecture_advisor_prompt(project_description)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------project_skeleton------------------------------------

@api_view(['POST'])
def project_skeleton(request):
    project_type = request.data.get("project_type")
    language = request.data.get("language")
    framework = request.data.get("framework")

    if not project_type or not language or not framework:
        return Response({"error": "project_type, language, and framework required"}, status=400)

    prompt = build_project_skeleton_prompt(project_type, language, framework)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------smart_autocomplete------------------------------------

@api_view(['POST'])
def smart_autocomplete(request):
    code_context = request.data.get("code_context")
    cursor_position = request.data.get("cursor_position", "End of file")
    language = request.data.get("language")

    if not code_context or not language:
        return Response({"error": "code_context and language required"}, status=400)

    prompt = build_smart_complete_prompt(code_context, cursor_position, language)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)


#---------------------refactoring_assistant------------------------------------

@api_view(['POST'])
def refactoring_assistant(request):
    code = request.data.get("code")
    language = request.data.get("language")

    if not code or not language:
        return Response({"error": "code and language required"}, status=400)

    prompt = build_refactoring_prompt(code, language)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------test_generator------------------------------------

@api_view(['POST'])
def test_generator(request):
    code = request.data.get("code")
    language = request.data.get("language")
    framework = request.data.get("framework")
    test_framework = request.data.get("test_framework")

    if not code or not language:
        return Response({"error": "code and language required"}, status=400)

    prompt = build_test_generator_prompt(code, language, framework, test_framework)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------security_advisor------------------------------------

@api_view(['POST'])
def security_advisor(request):
    code = request.data.get("code")
    language = request.data.get("language")
    framework = request.data.get("framework")

    if not code or not language:
        return Response({"error": "code and language required"}, status=400)

    prompt = build_security_advisor_prompt(code, language, framework)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------tech_docs_assistant------------------------------------

@api_view(['POST'])
def tech_docs_assistant(request):
    context = request.data.get("context")
    doc_type = request.data.get("doc_type")
    language = request.data.get("language", "General")

    if not context or not doc_type:
        return Response({"error": "context and doc_type required"}, status=400)

    prompt = build_tech_docs_prompt(context, doc_type, language)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------cicd_assistant------------------------------------

@api_view(['POST'])
def cicd_assistant(request):
    project_info = request.data.get("project_info")
    cicd_provider = request.data.get("cicd_provider", "GitHub Actions")
    cloud_provider = request.data.get("cloud_provider", "AWS")

    if not project_info:
        return Response({"error": "project_info required"}, status=400)

    prompt = build_cicd_prompt(project_info, cicd_provider, cloud_provider)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------data_transformer------------------------------------

@api_view(['POST'])
def data_transformer(request):
    data_input = request.data.get("data_input")
    source_format = request.data.get("source_format", "JSON")
    target_format = request.data.get("target_format", "JSON")
    instructions = request.data.get("instructions", "Clean and normalize the data.")

    if not data_input:
        return Response({"error": "data_input required"}, status=400)

    prompt = build_data_transformer_prompt(data_input, source_format, target_format, instructions)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------performance_profiler------------------------------------

@api_view(['POST'])
def performance_profiler(request):
    code = request.data.get("code")
    language = request.data.get("language")
    focus_area = request.data.get("focus_area", "General")

    if not code or not language:
        return Response({"error": "code and language required"}, status=400)

    prompt = build_performance_profiler_prompt(code, language, focus_area)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------monitoring_alerts------------------------------------

@api_view(['POST'])
def monitoring_alerts(request):
    logs = request.data.get("logs")
    platform = request.data.get("platform", "Prometheus/Grafana")
    incident_type = request.data.get("incident_type", "General Outage")

    if not logs:
        return Response({"error": "logs/context required"}, status=400)

    prompt = build_monitoring_alerts_prompt(logs, platform, incident_type)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------cloud_cost_optimizer------------------------------------

@api_view(['POST'])
def cloud_cost_optimizer(request):
    infrastructure_info = request.data.get("infrastructure_info")
    cloud_provider = request.data.get("cloud_provider", "AWS")
    focus_area = request.data.get("focus_area", "Compute Rightsizing")

    if not infrastructure_info:
        return Response({"error": "infrastructure_info required"}, status=400)

    prompt = build_cloud_cost_optimizer_prompt(infrastructure_info, cloud_provider, focus_area)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------version_control_advisor------------------------------------

@api_view(['POST'])
def version_control_advisor(request):
    context = request.data.get("context")
    task_type = request.data.get("task_type", "General Git Help")
    git_platform = request.data.get("git_platform", "GitHub")

    if not context:
        return Response({"error": "context required"}, status=400)

    prompt = build_version_control_advisor_prompt(context, task_type, git_platform)
    result = generate_response(prompt)

    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}

    return Response(parsed_result)

#---------------------code_snippets------------------------------------

@api_view(['POST'])
def code_snippets(request):
    description = request.data.get("description")
    language = request.data.get("language", "javascript")
    snippet_type = request.data.get("snippet_type", "Utility Function")
    if not description:
        return Response({"error": "description required"}, status=400)
    prompt = build_code_snippets_prompt(description, language, snippet_type)
    result = generate_response(prompt)
    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}
    return Response(parsed_result)

#---------------------knowledge_base------------------------------------

@api_view(['POST'])
def knowledge_base(request):
    question = request.data.get("question")
    domain = request.data.get("domain", "Software Engineering")
    experience_level = request.data.get("experience_level", "Mid-level")
    if not question:
        return Response({"error": "question required"}, status=400)
    prompt = build_knowledge_base_prompt(question, domain, experience_level)
    result = generate_response(prompt)
    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}
    return Response(parsed_result)

#---------------------trend_watcher------------------------------------

@api_view(['POST'])
def trend_watcher(request):
    domain = request.data.get("domain", "Software Engineering")
    focus_area = request.data.get("focus_area", "AI & Machine Learning")
    prompt = build_trend_watcher_prompt(domain, focus_area)
    result = generate_response(prompt)
    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}
    return Response(parsed_result)

#---------------------ai_pair_programming------------------------------------

@api_view(['POST'])
def ai_pair_programming(request):
    code = request.data.get("code", "")
    task_description = request.data.get("task_description")
    language = request.data.get("language", "javascript")
    if not task_description:
        return Response({"error": "task_description required"}, status=400)
    prompt = build_ai_pair_programming_prompt(code, task_description, language)
    result = generate_response(prompt)
    try:
        parsed_result = json.loads(result)
    except:
        parsed_result = {"raw": result}
    return Response(parsed_result)