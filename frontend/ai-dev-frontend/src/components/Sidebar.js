// components/Sidebar.js
import { Box, List, ListItemButton, ListItemText, ListItemIcon, Typography, Avatar } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/Api';
import BugReportIcon from '@mui/icons-material/BugReport';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import TerminalIcon from '@mui/icons-material/Terminal';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const menuItems = [
  { name: 'Code Review', icon: <CodeIcon /> },
  { name: 'SQL Generator', icon: <StorageIcon /> },
  { name: 'API Generator', icon: <ApiIcon /> },
  { name: 'Bug Fixer', icon: <BugReportIcon /> },
  { name: 'Code Explainer', icon: <MenuBookIcon /> },
  { name: 'Code Converter', icon: <SyncAltIcon /> },
  { name: 'Error Analyzer', icon: <ErrorOutlineIcon /> },
  { name: 'Tech Onboarding', icon: <TerminalIcon /> }
];

export default function Sidebar({ onSelect, activePage }) {
  return (
    <Box
      className="glass-panel"
      sx={{
        width: 260,
        position: 'fixed',
        height: 'calc(100vh - 32px)',
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid var(--glass-border)' }}>
        <Avatar sx={{ bgcolor: 'var(--primary-color)', width: 40, height: 40 }}>
          <AutoAwesomeIcon />
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'var(--text-primary)' }}>
          SagarStudio AI
        </Typography>
      </Box>

      <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = activePage === item.name;
          return (
            <ListItemButton
              key={item.name}
              onClick={() => onSelect(item.name)}
              sx={{
                mb: 1,
                borderRadius: '12px',
                background: isActive ? 'linear-gradient(90deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0) 100%)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--primary-color)' : '3px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(255,255,255,0.05)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <ListItemIcon sx={{ color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)'
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ p: 3, borderTop: '1px solid var(--glass-border)' }}>
        <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', textAlign: 'center' }}>
          v0.1.0
          @sagar.sangale
        </Typography>
      </Box>
    </Box>
  );
}
