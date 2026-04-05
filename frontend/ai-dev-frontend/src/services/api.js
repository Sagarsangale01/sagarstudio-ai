import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const codeReview = (data) => API.post('code-review/', data);
export const sqlGenerator = (data) => API.post('sql-generator/', data);
export const apiGenerator = (data) => API.post('api-generator/', data);
export const bugFixer = (data) => API.post('bug-fix/', data);
export const explainCode = (data) => API.post('explain-code/', data);
export const convertCode = (data) => API.post('convert-code/', data);
export const techOnboarding = (data) => API.post('tech-onboarding/', data);
export const errorAnalyzer = (data) => API.post('error-analyzer/', data);
export const requirementAnalyzer = (data) => API.post('requirement-analyzer/', data);
export const architectureAdvisor = (data) => API.post('architecture-advisor/', data);
export const projectSkeleton = (data) => API.post('project-skeleton/', data);
export const smartAutocomplete = (data) => API.post('smart-autocomplete/', data);
export const refactoringAssistant = (data) => API.post('refactoring-assistant/', data);
export const testGenerator = (data) => API.post('test-generator/', data);
export const securityAdvisor = (data) => API.post('security-advisor/', data);
export const techDocsAssistant = (data) => API.post('tech-docs/', data);
export const cicdAssistant = (data) => API.post('cicd-assistant/', data);
export const dataTransformer = (data) => API.post('data-transformer/', data);
export const performanceProfiler = (data) => API.post('performance-profiler/', data);
export const monitoringAlerts = (data) => API.post('monitoring-alerts/', data);
export const cloudCostOptimizer = (data) => API.post('cloud-cost-optimizer/', data);
export const versionControlAdvisor = (data) => API.post('version-control-advisor/', data);
export const codeSnippets = (data) => API.post('code-snippets/', data);
export const knowledgeBase = (data) => API.post('knowledge-base/', data);
export const trendWatcher = (data) => API.post('trend-watcher/', data);
export const aiPairProgramming = (data) => API.post('ai-pair-programming/', data);
