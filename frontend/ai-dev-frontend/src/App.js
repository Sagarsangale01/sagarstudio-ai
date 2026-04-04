// App.js
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import CodeReview from './pages/CodeReview';
import SqlGenerator from './pages/SqlGenerator';
import ApiGenerator from './pages/ApiGenerator';
import BugFixer from './pages/BugFixer';
import CodeExplainer from './pages/CodeExplainer';
import CodeConverter from './pages/CodeConverter';
import NewTechGuide from './pages/NewTechGuide';
import { Box, Typography } from '@mui/material';

function App() {
  const [page, setPage] = useState('Code Review');

  const renderPage = () => {
    switch (page) {
      case 'Code Review':
        return <CodeReview />;
      case 'SQL Generator':
        return <SqlGenerator />;
      case 'API Generator':
        return <ApiGenerator />;
      case 'Bug Fixer':
        return <BugFixer />;
      case 'Code Explainer':
        return <CodeExplainer />;
      case 'Code Converter':
        return <CodeConverter />;
      case 'Tech Onboarding':
        return <NewTechGuide />;
      default:
        return (
          <Box className="animate-fade-in glass-panel" sx={{ p: 4, textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {page}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: 'var(--text-secondary)' }}>
              This module is currently under development. Choose "Code Review" for the active demonstration.
            </Typography>
          </Box>
        );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar onSelect={setPage} activePage={page} />
      <Box 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 4, lg: 6 }, 
          ml: '276px', 
          width: 'calc(100vw - 276px)',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100vh',
          overflowY: 'auto'
        }}
      >
        <Box sx={{ maxWidth: '1600px', width: '100%', mx: 'auto', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Box sx={{ mb: 4 }} className="animate-fade-in">
            <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.5px', background: 'linear-gradient(45deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              SagarStudio AI
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'var(--text-secondary)', mt: 1 }}>
              Your Signature Intelligence for Modern Software Engineering.
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            {renderPage()}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
