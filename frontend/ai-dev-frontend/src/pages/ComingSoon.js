import { Box, Typography, Paper, Chip } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const moduleInfo = {
  'Requirement Analyzer': {
    description: 'Convert project specs into actionable tasks, wireframes, or schema suggestions.',
    category: 'Planning & Design',
    color: '#a78bfa',
    features: ['Parse natural language requirements', 'Generate task breakdowns & user stories', 'Suggest database schemas from specs', 'Create wireframe recommendations']
  },
  'Architecture Advisor': {
    description: 'Suggest scalable, maintainable system designs, tech stacks, and architecture patterns.',
    category: 'Planning & Design',
    color: '#a78bfa',
    features: ['System design recommendations', 'Tech stack comparison', 'Microservices vs monolith analysis', 'Design pattern suggestions']
  },
  'Project Skeleton': {
    description: 'Generate boilerplate projects with folder structure, CI/CD setup, and config files.',
    category: 'Planning & Design',
    color: '#a78bfa',
    features: ['Full project scaffolding', 'CI/CD pipeline templates', 'Docker & container configs', 'Environment setup automation']
  },
  'Smart Code Completion': {
    description: 'Context-aware autocompletion that understands your entire codebase, not just line suggestions.',
    category: 'Development Assistance',
    color: '#60a5fa',
    features: ['Multi-line intelligent completion', 'Cross-file context awareness', 'Framework-specific suggestions', 'Import auto-resolution']
  },
  'Refactoring Assistant': {
    description: 'Identify inefficiencies, dead code, or patterns that can be improved for cleaner architecture.',
    category: 'Development Assistance',
    color: '#60a5fa',
    features: ['Dead code detection', 'Design pattern refactoring', 'Performance optimization hints', 'Code smell identification']
  },
  'Code Snippets': {
    description: 'Suggest reusable components or code snippets from past projects and community repositories.',
    category: 'Development Assistance',
    color: '#60a5fa',
    features: ['Searchable snippet library', 'Framework-specific templates', 'Custom snippet storage', 'Team snippet sharing']
  },
  'Test Generator': {
    description: 'Auto-generate unit and integration tests with coverage suggestions and edge case detection.',
    category: 'Development Assistance',
    color: '#60a5fa',
    features: ['Unit test generation', 'Integration test scaffolding', 'Code coverage analysis', 'Edge case identification']
  },
  'Performance Profiler': {
    description: 'Identify bottlenecks in code or database queries and suggest optimizations.',
    category: 'Debugging & QA',
    color: '#f87171',
    features: ['Algorithm complexity analysis', 'Database query optimization', 'Memory leak detection', 'Load testing recommendations']
  },
  'Security Advisor': {
    description: 'Scan for common vulnerabilities, insecure dependencies, or API misuse.',
    category: 'Debugging & QA',
    color: '#f87171',
    features: ['OWASP vulnerability scanning', 'Dependency audit', 'API security best practices', 'Auth flow validation']
  },
  'Data Transformer': {
    description: 'Convert between data formats, clean datasets, and generate sample test data.',
    category: 'Data & API Handling',
    color: '#34d399',
    features: ['JSON/XML/CSV conversion', 'Data cleaning & normalization', 'Mock data generation', 'Schema validation']
  },
  'Tech Docs Assistant': {
    description: 'Generate README, API docs, or onboarding guides automatically from your codebase.',
    category: 'Collaboration & Docs',
    color: '#fb923c',
    features: ['Auto-generate README.md', 'API documentation from code', 'Onboarding guide creation', 'Changelog generation']
  },
  'Version Control Advisor': {
    description: 'Suggest commits, branch strategies, and PR improvements for better collaboration.',
    category: 'Collaboration & Docs',
    color: '#fb923c',
    features: ['Commit message generation', 'Branch strategy advice', 'PR review suggestions', 'Git workflow optimization']
  },
  'CI/CD Assistant': {
    description: 'Suggest pipelines, integrate tests, and auto-deploy to AWS/Azure/GCP.',
    category: 'Deployment & Monitoring',
    color: '#22d3ee',
    features: ['Pipeline template generation', 'Multi-cloud deployment configs', 'Automated test integration', 'Rollback strategy planning']
  },
  'Monitoring & Alerts': {
    description: 'Generate dashboards for logs, metrics, or application health monitoring.',
    category: 'Deployment & Monitoring',
    color: '#22d3ee',
    features: ['Dashboard configuration', 'Alert rule generation', 'Log aggregation setup', 'Health check endpoints']
  },
  'Cloud Cost Optimizer': {
    description: 'Suggest efficient cloud usage and resource management to reduce infrastructure costs.',
    category: 'Deployment & Monitoring',
    color: '#22d3ee',
    features: ['Resource rightsizing', 'Reserved instance planning', 'Cost anomaly detection', 'Multi-cloud cost comparison']
  },
  'Knowledge Base': {
    description: 'Intelligent suggestions from internal documentation and frequently asked questions.',
    category: 'Learning & Growth',
    color: '#fbbf24',
    features: ['Internal docs search', 'FAQ auto-generation', 'Context-aware suggestions', 'Team knowledge sharing']
  },
  'Trend Watcher': {
    description: 'Suggest libraries, frameworks, or practices trending in the developer community.',
    category: 'Learning & Growth',
    color: '#fbbf24',
    features: ['Trending library alerts', 'Framework comparison', 'Community best practices', 'Migration path suggestions']
  },
  'ChatOps Interface': {
    description: 'Integrate with Slack, Teams, or Discord for interactive developer support.',
    category: 'Advanced Integrations',
    color: '#f472b6',
    features: ['Slack bot integration', 'Teams connector', 'Discord bot support', 'Command-based interactions']
  },
  'IDE Plugin': {
    description: 'Provide real-time assistance inside VS Code, JetBrains, or other IDEs.',
    category: 'Advanced Integrations',
    color: '#f472b6',
    features: ['VS Code extension', 'JetBrains plugin', 'Real-time inline suggestions', 'Context-aware help panel']
  },
  'AI Pair Programming': {
    description: 'Real-time pair coding with explanation, suggestions, and collaborative development.',
    category: 'Advanced Integrations',
    color: '#f472b6',
    features: ['Live code collaboration', 'Real-time suggestions', 'Voice-enabled coding', 'Session recording & playback']
  }
};

export default function ComingSoon({ moduleName }) {
  const info = moduleInfo[moduleName] || {
    description: 'This module is currently under development.',
    category: 'General',
    color: '#6366f1',
    features: []
  };

  return (
    <Box className="animate-fade-in" sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      pt: 4, width: '100%'
    }}>
      <Box sx={{ maxWidth: 700, width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>

        {/* Header Card */}
        <Box className="glass-panel" sx={{
          p: 4, textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow Effect */}
          <Box sx={{
            position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
            width: 300, height: 300, borderRadius: '50%',
            background: `radial-gradient(circle, ${info.color}20 0%, transparent 70%)`,
            pointerEvents: 'none'
          }} />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Chip
              label={info.category}
              size="small"
              sx={{
                mb: 2, bgcolor: `${info.color}20`, color: info.color,
                fontWeight: 600, fontSize: '0.7rem', border: `1px solid ${info.color}40`
              }}
            />

            <Box sx={{
              width: 72, height: 72, borderRadius: '20px', mx: 'auto', mb: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `linear-gradient(135deg, ${info.color}30, ${info.color}10)`,
              border: `1px solid ${info.color}40`,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { boxShadow: `0 0 0 0 ${info.color}30` },
                '50%': { boxShadow: `0 0 20px 8px ${info.color}15` },
              }
            }}>
              <RocketLaunchIcon sx={{ fontSize: 32, color: info.color }} />
            </Box>

            <Typography variant="h4" sx={{
              fontWeight: 700, mb: 1.5,
              background: `linear-gradient(135deg, #fff, ${info.color})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              {moduleName}
            </Typography>

            <Typography variant="body1" sx={{ color: 'var(--text-secondary)', maxWidth: 500, mx: 'auto', lineHeight: 1.7 }}>
              {info.description}
            </Typography>

            <Chip
              label="Under Development"
              size="small"
              sx={{
                mt: 3, bgcolor: 'rgba(251,191,36,0.1)', color: '#fbbf24',
                fontWeight: 600, fontSize: '0.7rem', border: '1px solid rgba(251,191,36,0.3)',
                animation: 'glow 2s ease-in-out infinite alternate',
                '@keyframes glow': {
                  '0%': { boxShadow: '0 0 4px rgba(251,191,36,0.2)' },
                  '100%': { boxShadow: '0 0 12px rgba(251,191,36,0.4)' },
                }
              }}
            />
          </Box>
        </Box>

        {/* Features Card */}
        {info.features && info.features.length > 0 && (
          <Box className="glass-panel" sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              Planned Features
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
              {info.features.map((feature, idx) => (
                <Paper key={idx} elevation={0} sx={{
                  p: 1.5, display: 'flex', alignItems: 'center', gap: 1.5,
                  bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)',
                  borderRadius: '10px', transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', transform: 'translateY(-1px)' }
                }}>
                  <CheckCircleOutlineIcon sx={{ fontSize: 18, color: `${info.color}80` }} />
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    {feature}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
