from django.urls import path
from .views import (
    code_review, sql_generator, api_generator, bug_fixer, code_explainer, code_converter,
    tech_onboarding, error_analyzer, requirement_analyzer, architecture_advisor,
    project_skeleton, smart_autocomplete, refactoring_assistant, test_generator,
    security_advisor, tech_docs_assistant, cicd_assistant, data_transformer,
    performance_profiler, monitoring_alerts, cloud_cost_optimizer, version_control_advisor,
    code_snippets, knowledge_base, trend_watcher, ai_pair_programming
)

urlpatterns = [
    path('code-review/', code_review),
    path('sql-generator/', sql_generator),
    path('api-generator/', api_generator),
    path('bug-fix/', bug_fixer),
    path('explain-code/', code_explainer),
    path('convert-code/', code_converter),
    path('tech-onboarding/', tech_onboarding),
    path('error-analyzer/', error_analyzer),
    path('requirement-analyzer/', requirement_analyzer),
    path('architecture-advisor/', architecture_advisor),
    path('project-skeleton/', project_skeleton),
    path('smart-autocomplete/', smart_autocomplete),
    path('refactoring-assistant/', refactoring_assistant),
    path('test-generator/', test_generator),
    path('security-advisor/', security_advisor),
    path('tech-docs/', tech_docs_assistant),
    path('cicd-assistant/', cicd_assistant),
    path('data-transformer/', data_transformer),
    path('performance-profiler/', performance_profiler),
    path('monitoring-alerts/', monitoring_alerts),
    path('cloud-cost-optimizer/', cloud_cost_optimizer),
    path('version-control-advisor/', version_control_advisor),
    path('code-snippets/', code_snippets),
    path('knowledge-base/', knowledge_base),
    path('trend-watcher/', trend_watcher),
    path('ai-pair-programming/', ai_pair_programming),
]
