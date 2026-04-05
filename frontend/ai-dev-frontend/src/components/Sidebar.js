import { useState, useEffect } from 'react';
import {
  Box, List, ListItemButton, ListItemText, ListItemIcon,
  Typography, Avatar, Collapse
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudIcon from '@mui/icons-material/Cloud';
import SchoolIcon from '@mui/icons-material/School';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ConstructionIcon from '@mui/icons-material/Construction';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import ApiIcon from '@mui/icons-material/Api';
import TransformIcon from '@mui/icons-material/Transform';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArticleIcon from '@mui/icons-material/Article';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SettingsIcon from '@mui/icons-material/Settings';
import MonitorIcon from '@mui/icons-material/Monitor';
import SavingsIcon from '@mui/icons-material/Savings';
import TerminalIcon from '@mui/icons-material/Terminal';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChatIcon from '@mui/icons-material/Chat';
import ExtensionIcon from '@mui/icons-material/Extension';
import PeopleIcon from '@mui/icons-material/People';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const DashboardOverview = { name: 'Dashboard Overview', icon: <DashboardIcon fontSize="small" />, active: true };

const menuSections = [
  {
    category: 'Planning & Design',
    icon: <DashboardIcon fontSize="small" />,
    color: '#a78bfa',
    items: [
      { name: 'Requirement Analyzer', icon: <AssignmentIcon fontSize="small" />, active: true },
      { name: 'Architecture Advisor', icon: <AccountTreeIcon fontSize="small" />, active: true },
      { name: 'Project Skeleton', icon: <CreateNewFolderIcon fontSize="small" />, active: true },
    ]
  },
  {
    category: 'Development Assistance',
    icon: <CodeIcon fontSize="small" />,
    color: '#60a5fa',
    items: [
      { name: 'Smart Code Completion', icon: <AutoFixHighIcon fontSize="small" />, active: true },
      { name: 'Refactoring Assistant', icon: <ConstructionIcon fontSize="small" />, active: true },
      { name: 'Code Converter', icon: <TransformIcon fontSize="small" />, active: true },
      { name: 'Code Snippets', icon: <ContentCopyIcon fontSize="small" />, active: true },
      { name: 'Test Generator', icon: <PlaylistAddCheckIcon fontSize="small" />, active: true },
    ]
  },
  {
    category: 'Debugging & QA',
    icon: <BugReportIcon fontSize="small" />,
    color: '#f87171',
    items: [
      { name: 'Bug Fixer', icon: <BugReportIcon fontSize="small" />, active: true },
      { name: 'Error Analyzer', icon: <ErrorOutlineIcon fontSize="small" />, active: true },
      { name: 'Performance Profiler', icon: <SpeedIcon fontSize="small" />, active: true },
      { name: 'Security Advisor', icon: <SecurityIcon fontSize="small" />, active: true },
    ]
  },
  {
    category: 'Data & API Handling',
    icon: <StorageIcon fontSize="small" />,
    color: '#34d399',
    items: [
      { name: 'SQL Generator', icon: <StorageIcon fontSize="small" />, active: true },
      { name: 'API Generator', icon: <ApiIcon fontSize="small" />, active: true },
      { name: 'Data Transformer', icon: <TransformIcon fontSize="small" />, active: true },
    ]
  },
  {
    category: 'Collaboration & Docs',
    icon: <DescriptionIcon fontSize="small" />,
    color: '#fb923c',
    items: [
      { name: 'Code Explainer', icon: <MenuBookIcon fontSize="small" />, active: true },
      { name: 'Tech Docs Assistant', icon: <ArticleIcon fontSize="small" />, active: true },
      { name: 'Version Control Advisor', icon: <MergeTypeIcon fontSize="small" />, active: true },
      { name: 'Code Review', icon: <RateReviewIcon fontSize="small" />, active: true },
    ]
  },
  {
    category: 'Deployment & Monitoring',
    icon: <CloudIcon fontSize="small" />,
    color: '#22d3ee',
    items: [
      { name: 'CI/CD Assistant', icon: <SettingsIcon fontSize="small" />, active: true },
      { name: 'Monitoring & Alerts', icon: <MonitorIcon fontSize="small" />, active: true },
      { name: 'Cloud Cost Optimizer', icon: <SavingsIcon fontSize="small" />, active: true },
    ]
  },
  {
    category: 'Learning & Growth',
    icon: <SchoolIcon fontSize="small" />,
    color: '#fbbf24',
    items: [
      { name: 'Tech Onboarding', icon: <TerminalIcon fontSize="small" />, active: true },
      { name: 'Knowledge Base', icon: <LiveHelpIcon fontSize="small" />, active: true },
      { name: 'Trend Watcher', icon: <TrendingUpIcon fontSize="small" />, active: true },
    ]
  },
  {
    category: 'Advanced Integrations',
    icon: <WidgetsIcon fontSize="small" />,
    color: '#f472b6',
    items: [
      { name: 'AI Pair Programming', icon: <PeopleIcon fontSize="small" />, active: true },
      { name: 'IDE Plugin', icon: <ExtensionIcon fontSize="small" /> },
    ]
  }
];

export default function Sidebar({ onSelect, activePage, isOpen, onToggle }) {
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const activeSection = menuSections.find(s => s.items.some(i => i.name === activePage));
    if (activeSection) {
      setOpenSections(prev => ({ ...prev, [activeSection.category]: true }));
    }
  }, [activePage]);

  const toggleSection = (category) => {
    setOpenSections(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <Box 
          onClick={onToggle}
          sx={{ 
            display: { lg: 'none' }, 
            position: 'fixed', 
            inset: 0, 
            bgcolor: 'rgba(0,0,0,0.6)', 
            backdropFilter: 'blur(4px)', 
            zIndex: 999 
          }} 
        />
      )}

      <Box
        className="glass-panel"
        sx={{
          width: 280,
          position: 'fixed',
          height: 'calc(100vh - 32px)',
          m: 2,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px',
          overflow: 'hidden',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: { xs: isOpen ? 'translateX(0)' : 'translateX(-320px)', lg: 'translateX(0)' },
          boxShadow: isOpen ? '0 0 50px rgba(0,0,0,0.5)' : 'none'
        }}
      >
        {/* Close Button for mobile */}
        <Box 
          onClick={onToggle}
          sx={{ 
            display: { lg: 'none' }, 
            position: 'absolute', 
            top: 15, 
            right: 15, 
            p: 1, 
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            '&:hover': { color: 'white' }
          }}
        >
          <ExpandLess sx={{ transform: 'rotate(-90deg)' }} />
        </Box>
      {/* Brand */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, borderBottom: '1px solid var(--glass-border)' }}>
        <Avatar src="/sagar.png" sx={{ width: 36, height: 36, border: '1px solid var(--glass-border)' }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
          SagarSense.AI
        </Typography>
      </Box>

      {/* Scrollable Menu */}
      <Box sx={{
        flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', py: 1, px: 1,
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '4px' },
      }}>
        <List disablePadding sx={{ mb: 1 }}>
          <ListItemButton
            onClick={() => onSelect(DashboardOverview.name)}
            sx={{
              borderRadius: '10px',
              py: 1,
              px: 1.5,
              mb: 1,
              background: activePage === DashboardOverview.name ? `rgba(139, 92, 246, 0.1)` : 'transparent',
              '&:hover': { background: 'rgba(255,255,255,0.05)' },
              transition: 'all 0.2s ease',
              border: activePage === DashboardOverview.name ? '1px solid var(--glass-border)' : '1px solid transparent'
            }}
          >
            <ListItemIcon sx={{ color: 'var(--primary-color)', minWidth: 32 }}>
              {DashboardOverview.icon}
            </ListItemIcon>
            <ListItemText
              primary="Overview"
              primaryTypographyProps={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: activePage === DashboardOverview.name ? 'var(--text-primary)' : 'var(--text-secondary)',
                letterSpacing: '0.01em'
              }}
            />
            {activePage === DashboardOverview.name && (
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'var(--primary-color)', boxShadow: '0 0 8px #a78bfa' }} />
            )}
          </ListItemButton>

          {menuSections.map((section) => {
            const isOpen = !!openSections[section.category];
            const hasActiveChild = section.items.some(i => i.name === activePage);

            return (
              <Box key={section.category} sx={{ mb: 0.5 }}>
                {/* Category Header */}
                <ListItemButton
                  onClick={() => toggleSection(section.category)}
                  sx={{
                    borderRadius: '10px',
                    py: 0.8,
                    px: 1.5,
                    background: hasActiveChild ? `${section.color}10` : 'transparent',
                    '&:hover': { background: `${section.color}15` },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ListItemIcon sx={{ color: section.color, minWidth: 32 }}>
                    {section.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={section.category}
                    primaryTypographyProps={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: hasActiveChild ? 'var(--text-primary)' : 'var(--text-secondary)',
                      letterSpacing: '0.02em'
                    }}
                  />
                  <Box sx={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                    {isOpen ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
                  </Box>
                </ListItemButton>

                {/* Sub-items */}
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List disablePadding sx={{ pl: 1.5, pt: 0.3 }}>
                    {section.items.map((item) => {
                      const isActive = activePage === item.name;
                      return (
                        <ListItemButton
                          key={item.name}
                          onClick={() => onSelect(item.name)}
                          sx={{
                            borderRadius: '8px',
                            py: 0.6,
                            px: 1.5,
                            mb: 0.2,
                            background: isActive
                              ? `linear-gradient(90deg, ${section.color}25 0%, ${section.color}05 100%)`
                              : 'transparent',
                            borderLeft: isActive ? `2px solid ${section.color}` : '2px solid transparent',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              background: 'rgba(255,255,255,0.04)',
                              transform: 'translateX(2px)'
                            }
                          }}
                        >
                          <ListItemIcon sx={{
                            color: isActive ? section.color : 'var(--text-secondary)',
                            minWidth: 28,
                            '& .MuiSvgIcon-root': { fontSize: '1rem' }
                          }}>
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.name}
                            primaryTypographyProps={{
                              fontSize: '0.75rem',
                              fontWeight: isActive ? 600 : 400,
                              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            }}
                          />
                          {item.active && (
                            <Box sx={{
                              width: 6, height: 6, borderRadius: '50%',
                              bgcolor: '#34d399', flexShrink: 0,
                              boxShadow: '0 0 6px rgba(52,211,153,0.5)'
                            }} />
                          )}
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid var(--glass-border)' }}>
        <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', textAlign: 'center' }}>
          v0.2.0 · @sagar.sangale
        </Typography>
      </Box>
      </Box>
    </>
  );
}
