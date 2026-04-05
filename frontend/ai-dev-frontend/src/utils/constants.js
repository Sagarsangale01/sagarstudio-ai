// ─── Shared Dropdown Constants ───────────────────────────────────────────────
// All MenuItem values used across the app are managed here.
// Usage: import { LANGUAGES, TEST_FRAMEWORKS, ... } from '../utils/constants';
// Then: {LANGUAGES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}

// ── Programming Languages ────────────────────────────────────────────────────
export const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'bash', label: 'Bash / Shell' },
  { value: 'sql', label: 'SQL' },
];

// ── Project Types ──────────────────────────────────────────────────────────────
export const PROJECT_TYPES = [
  { value: 'Web Application (Fullstack)', label: 'Web Application (Fullstack)' },
  { value: 'REST API', label: 'REST API' },
  { value: 'GraphQL API', label: 'GraphQL API' },
  { value: 'Microservice', label: 'Microservice' },
  { value: 'CLI Tool', label: 'CLI Tool' },
  { value: 'Mobile App', label: 'Mobile App' },
];

// ── Languages shown in Code Editors (Monaco language IDs) ────────────────────
export const EDITOR_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  { value: 'General', label: 'Framework-Agnostic' },
];

// ── Application Frameworks ────────────────────────────────────────────────────
export const FRAMEWORKS = [
  { value: 'None', label: 'None' },
  { value: 'React', label: 'React' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Vue', label: 'Vue.js' },
  { value: 'Next.js', label: 'Next.js' },
  { value: 'Express', label: 'Express' },
  { value: 'Django', label: 'Django' },
  { value: 'Flask', label: 'Flask' },
  { value: 'FastAPI', label: 'FastAPI' },
  { value: 'Spring Boot', label: 'Spring Boot' },
  { value: 'NestJS', label: 'NestJS' },
  { value: 'Laravel', label: 'Laravel' },
  { value: 'ASP.NET Core', label: 'ASP.NET Core' },
  { value: 'Gin', label: 'Gin (Go)' },
];

// ── Databases ─────────────────────────────────────────────────────────────────
export const DATABASES = [
  { value: 'None', label: 'None' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'SQL Server', label: 'SQL Server' },
  { value: 'Oracle', label: 'Oracle' },
  { value: 'SQLite', label: 'SQLite' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'Redis', label: 'Redis' },
  { value: 'DynamoDB', label: 'DynamoDB' },
];

// ── Test Frameworks ────────────────────────────────────────────────────────────
export const TEST_FRAMEWORKS = [
  { value: 'None', label: 'None / Default' },
  { value: 'Jest', label: 'Jest' },
  { value: 'Mocha', label: 'Mocha' },
  { value: 'PyTest', label: 'PyTest' },
  { value: 'JUnit', label: 'JUnit' },
  { value: 'Go Test', label: 'Go Test' },
  { value: 'Cypress', label: 'Cypress' },
  { value: 'Vitest', label: 'Vitest' },
];

// ── Cloud Providers ────────────────────────────────────────────────────────────
export const CLOUD_PROVIDERS = [
  { value: 'AWS', label: 'AWS' },
  { value: 'Azure', label: 'Microsoft Azure' },
  { value: 'Google Cloud Platform (GCP)', label: 'GCP' },
  { value: 'Vercel', label: 'Vercel' },
  { value: 'Heroku', label: 'Heroku' },
  { value: 'DigitalOcean', label: 'DigitalOcean' },
];

// ── CI/CD Providers ────────────────────────────────────────────────────────────
export const CICD_PROVIDERS = [
  { value: 'GitHub Actions', label: 'GitHub Actions' },
  { value: 'GitLab CI', label: 'GitLab CI' },
  { value: 'Bitbucket Pipelines', label: 'Bitbucket Pipelines' },
  { value: 'Jenkins', label: 'Jenkins' },
  { value: 'CircleCI', label: 'CircleCI' },
];

// ── Monitoring Platforms ───────────────────────────────────────────────────────
export const MONITORING_PLATFORMS = [
  { value: 'Prometheus / Grafana', label: 'Prometheus / Grafana' },
  { value: 'Datadog (JSON)', label: 'Datadog (JSON config)' },
  { value: 'AWS CloudWatch', label: 'AWS CloudWatch' },
  { value: 'New Relic', label: 'New Relic' },
  { value: 'PagerDuty (Terraform)', label: 'PagerDuty (Terraform)' },
];

// ── Git Platforms ──────────────────────────────────────────────────────────────
export const GIT_PLATFORMS = [
  { value: 'GitHub', label: 'GitHub' },
  { value: 'GitLab', label: 'GitLab' },
  { value: 'Bitbucket', label: 'Bitbucket' },
  { value: 'Azure DevOps', label: 'Azure DevOps' },
];

// ── Git Task Types ─────────────────────────────────────────────────────────────
export const GIT_TASK_TYPES = [
  { value: 'Resolve Merge Conflict', label: 'Resolve Merge Conflict' },
  { value: 'Design Git Branching Strategy', label: 'Design Branching Strategy' },
  { value: 'Undo / Revert Changes', label: 'Undo / Revert Changes' },
  { value: 'Squash & Clean Up Commits', label: 'Squash & Clean Commits' },
  { value: 'Set Up Branch Protection Rules', label: 'Branch Protection Rules' },
  { value: 'Implement Conventional Commits', label: 'Conventional Commits' },
  { value: 'Cherry-Pick Changes', label: 'Cherry-Pick Changes' },
];

// ── Data Formats ───────────────────────────────────────────────────────────────
export const DATA_SOURCE_FORMATS = [
  { value: 'JSON', label: 'JSON' },
  { value: 'XML', label: 'XML' },
  { value: 'YAML', label: 'YAML' },
  { value: 'CSV', label: 'CSV' },
  { value: 'SQL', label: 'SQL' },
  { value: 'GraphQL', label: 'GraphQL' },
  { value: 'Text', label: 'Plain Text' },
];

export const DATA_TARGET_FORMATS = [
  { value: 'JSON', label: 'JSON' },
  { value: 'XML', label: 'XML' },
  { value: 'YAML', label: 'YAML' },
  { value: 'CSV', label: 'CSV' },
  { value: 'SQL', label: 'SQL' },
  { value: 'Typescript Interface', label: 'TS Interface' },
  { value: 'Mongoose Schema', label: 'Mongoose Schema' },
];

// ── Performance Focus Areas ────────────────────────────────────────────────────
export const PERFORMANCE_FOCUS_AREAS = [
  { value: 'General', label: 'General Profiling' },
  { value: 'Time Complexity (CPU)', label: 'Time Complexity (CPU)' },
  { value: 'Space Complexity (Memory)', label: 'Space Complexity (Memory)' },
  { value: 'Database Queries', label: 'Database Queries' },
  { value: 'Rendering/DOM', label: 'Rendering / DOM' },
];

// ── Cloud Cost Focus Areas ─────────────────────────────────────────────────────
export const CLOUD_COST_FOCUS_AREAS = [
  { value: 'Compute Rightsizing', label: 'Compute Rightsizing' },
  { value: 'Database Optimization', label: 'Database Optimization' },
  { value: 'Data Transfer / Networking', label: 'Data Transfer / Networking' },
  { value: 'Storage Optimization', label: 'Storage Optimization' },
  { value: 'General FinOps', label: 'General FinOps' },
];

// ── Tech Docs Types ────────────────────────────────────────────────────────────
export const DOC_TYPES = [
  { value: 'README.md', label: 'README.md' },
  { value: 'API Documentation', label: 'API Documentation' },
  { value: 'Onboarding Guide', label: 'Onboarding Guide' },
  { value: 'Changelog', label: 'Changelog' },
  { value: 'Architecture Decision Record (ADR)', label: 'ADR' },
];

// ── Code Snippet Types ─────────────────────────────────────────────────────────
export const SNIPPET_TYPES = [
  { value: 'Utility Function', label: 'Utility Function' },
  { value: 'Design Pattern', label: 'Design Pattern' },
  { value: 'API Integration', label: 'API Integration' },
  { value: 'Data Structure', label: 'Data Structure' },
  { value: 'Algorithm', label: 'Algorithm' },
  { value: 'Authentication Logic', label: 'Authentication Logic' },
  { value: 'Database Query', label: 'Database Query' },
];

// ── Knowledge Base Domains ─────────────────────────────────────────────────────
export const KB_DOMAINS = [
  { value: 'Software Engineering', label: 'Software Engineering' },
  { value: 'Frontend Development', label: 'Frontend Development' },
  { value: 'Backend Development', label: 'Backend Development' },
  { value: 'DevOps & Cloud', label: 'DevOps & Cloud' },
  { value: 'Machine Learning / AI', label: 'Machine Learning / AI' },
  { value: 'Database Engineering', label: 'Database Engineering' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'System Design', label: 'System Design' },
];

// ── Experience Levels ──────────────────────────────────────────────────────────
export const EXPERIENCE_LEVELS = [
  { value: 'Junior', label: 'Junior' },
  { value: 'Mid-level', label: 'Mid-level' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Principal', label: 'Principal / Lead' },
];

// ── Trend Watcher Domains ──────────────────────────────────────────────────────
export const TREND_DOMAINS = [
  { value: 'Full-Stack Web Development', label: 'Full-Stack Web Development' },
  { value: 'Cloud & DevOps', label: 'Cloud & DevOps' },
  { value: 'Mobile Development', label: 'Mobile Development' },
  { value: 'Machine Learning & AI', label: 'Machine Learning & AI' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Data Engineering', label: 'Data Engineering' },
  { value: 'Blockchain & Web3', label: 'Blockchain & Web3' },
];

// ── Trend Watcher Focus Areas ──────────────────────────────────────────────────
export const TREND_FOCUS_AREAS = [
  { value: 'AI & Machine Learning Integration', label: 'AI & Machine Learning Integration' },
  { value: 'Developer Tooling & DX', label: 'Developer Tooling & DX' },
  { value: 'Edge Computing & Serverless', label: 'Edge Computing & Serverless' },
  { value: 'Security & Zero Trust', label: 'Security & Zero Trust' },
  { value: 'Database & Data Infrastructure', label: 'Database & Data Infrastructure' },
  { value: 'UI/UX & Design Systems', label: 'UI/UX & Design Systems' },
];
