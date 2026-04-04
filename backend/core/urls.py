from django.urls import path
from .views import code_review, sql_generator, api_generator, bug_fixer,code_explainer, code_converter, tech_onboarding, error_analyzer

urlpatterns = [
    path('code-review/', code_review),
    path('sql-generator/', sql_generator),
    path('api-generator/', api_generator),
    path('bug-fix/', bug_fixer),
    path('explain-code/', code_explainer),
    path('convert-code/', code_converter),
    path('tech-onboarding/', tech_onboarding),
    path('error-analyzer/', error_analyzer),
]
