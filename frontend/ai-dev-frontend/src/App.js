import { useState } from 'react';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import CodeReview from './pages/CodeReview';
import SqlGenerator from './pages/SqlGenerator';
import ApiGenerator from './pages/ApiGenerator';
import BugFixer from './pages/BugFixer';
import CodeExplainer from './pages/CodeExplainer';
import CodeConverter from './pages/CodeConverter';
import NewTechGuide from './pages/NewTechGuide';
import ErrorAnalyzer from './pages/ErrorAnalyzer';
import RequirementAnalyzer from './pages/RequirementAnalyzer';
import ArchitectureAdvisor from './pages/ArchitectureAdvisor';
import ProjectSkeleton from './pages/ProjectSkeleton';
import SmartCodeCompletion from './pages/SmartCodeCompletion';
import RefactoringAssistant from './pages/RefactoringAssistant';
import TestGenerator from './pages/TestGenerator';
import SecurityAdvisor from './pages/SecurityAdvisor';
import TechDocsAssistant from './pages/TechDocsAssistant';
import CicdAssistant from './pages/CicdAssistant';
import DataTransformer from './pages/DataTransformer';
import PerformanceProfiler from './pages/PerformanceProfiler';
import MonitoringAlerts from './pages/MonitoringAlerts';
import CloudCostOptimizer from './pages/CloudCostOptimizer';
import VersionControlAdvisor from './pages/VersionControlAdvisor';
import CodeSnippets from './pages/CodeSnippets';
import KnowledgeBase from './pages/KnowledgeBase';
import TrendWatcher from './pages/TrendWatcher';
import AiPairProgramming from './pages/AiPairProgramming';
import ComingSoon from './pages/ComingSoon';
import { Box, Typography } from '@mui/material';

const pageComponents = {
  'Dashboard Overview': LandingPage,
  'Code Review': CodeReview,
  'SQL Generator': SqlGenerator,
  'API Generator': ApiGenerator,
  'Bug Fixer': BugFixer,
  'Code Explainer': CodeExplainer,
  'Code Converter': CodeConverter,
  'Tech Onboarding': NewTechGuide,
  'Error Analyzer': ErrorAnalyzer,
  'Requirement Analyzer': RequirementAnalyzer,
  'Architecture Advisor': ArchitectureAdvisor,
  'Project Skeleton': ProjectSkeleton,
  'Smart Code Completion': SmartCodeCompletion,
  'Refactoring Assistant': RefactoringAssistant,
  'Test Generator': TestGenerator,
  'Security Advisor': SecurityAdvisor,
  'Tech Docs Assistant': TechDocsAssistant,
  'CI/CD Assistant': CicdAssistant,
  'Data Transformer': DataTransformer,
  'Performance Profiler': PerformanceProfiler,
  'Monitoring & Alerts': MonitoringAlerts,
  'Cloud Cost Optimizer': CloudCostOptimizer,
  'Version Control Advisor': VersionControlAdvisor,
  'Code Snippets': CodeSnippets,
  'Knowledge Base': KnowledgeBase,
  'Trend Watcher': TrendWatcher,
  'AI Pair Programming': AiPairProgramming,
};

function App() {
  const [page, setPage] = useState('Dashboard Overview');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const renderPage = () => {
    if (page === 'Dashboard Overview') return <LandingPage onModuleSelect={setPage} />;
    const Component = pageComponents[page];
    if (Component) return <Component />;
    return <ComingSoon moduleName={page} />;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', background: 'var(--bg-gradient)', overflow: 'hidden' }}>
      <Sidebar
        onSelect={(p) => { setPage(p); setSidebarOpen(false); }}
        activePage={page}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <Box
        sx={{
          flexGrow: 1,
          p: page === 'Dashboard Overview' ? 0 : { xs: 2, md: 3, lg: 5 },
          ml: { xs: 0, lg: '296px' },
          width: { xs: '100%', lg: 'calc(100% - 296px)' },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        {/* Mobile Toggle Button */}
        <Box sx={{
          display: { lg: 'none' },
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1000,
          p: 1.5,
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--glass-border)',
          cursor: 'pointer',
          color: 'white',
          '&:hover': { background: 'rgba(255,255,255,0.1)' }
        }} onClick={toggleSidebar}>
          <Typography variant="body2" sx={{ fontWeight: 800 }}>MENU</Typography>
        </Box>

        <Box sx={{
          maxWidth: page === 'Dashboard Overview' ? '100%' : '1600px',
          width: '100%',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        }}>
          {page !== 'Dashboard Overview' && (
            <Box sx={{ mb: 3 }} className="animate-fade-in">
              <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.5px', background: 'linear-gradient(45deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                SagarSense.AI
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'var(--text-secondary)', mt: 0.5 }}>
                Your Signature Intelligence for Modern Software Engineering.
              </Typography>
            </Box>
          )}

          <Box sx={{ flexGrow: 1, width: '100%' }}>
            {renderPage()}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
