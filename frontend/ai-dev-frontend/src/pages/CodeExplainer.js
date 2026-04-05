import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, Accordion, AccordionSummary, AccordionDetails, TextField, MenuItem } from '@mui/material';
import Editor from '@monaco-editor/react';
import { explainCode } from '../services/api';
import { LANGUAGES, FRAMEWORKS } from '../utils/constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';

export default function CodeExplainer() {
  const defaultCode = `function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`;
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState('javascript');
  const [framework, setFramework] = useState('None');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await explainCode({ code, language, framework: framework !== 'None' ? framework : undefined });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to connect to AI server.", line_by_line: [], use_cases: [] });
    }
    setLoading(false);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} lg={6} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 2, height: 'calc(100vh - 200px)', minHeight: '400px', display: 'flex', flexDirection: 'column', transition: 'height 0.4s ease' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, mr: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mr: 1, display: { xs: 'none', md: 'block' } }}>Mysterious Code</Typography>
                <TextField
                  select size="small" label="Language" value={language} onChange={(e) => setLanguage(e.target.value)}
                  sx={{ width: '140px', '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
                >
                  {LANGUAGES.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                </TextField>
                <TextField
                  select size="small" label="Framework" value={framework} onChange={(e) => setFramework(e.target.value)}
                  sx={{ width: '140px', '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
                >
                  {FRAMEWORKS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                </TextField>
              </Box>
              <Button
                variant="contained" onClick={handleSubmit} disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                sx={{ bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', textTransform: 'none', fontWeight: 600, px: 3 }}
              >
                {loading ? 'Analyzing...' : 'Explain This'}
              </Button>
            </Box>
            <Box className="monaco-container" sx={{ flexGrow: 1 }}>
              <Editor height="100%" language={language} theme="vs-dark" value={code} onChange={(value) => setCode(value)} options={{ minimap: { enabled: false }, fontSize: 14 }} />
            </Box>
          </Box>
        </Grid>

        {result && (
          <Grid item xs={12} lg={6} className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid container spacing={3} sx={{ height: '100%' }}>
              <Grid item xs={12}>
                <Box className="glass-panel" sx={{ p: 3, height: '240px', overflowY: 'auto', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fca5a5' }}>
                    <MenuBookIcon /> Summary
                  </Typography>
                  {result.error && <Typography color="error">{result.error}</Typography>}

                  <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)', mb: 3 }} elevation={0}>
                    {result.summary || 'No summary available.'}
                  </Paper>

                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fde047' }}>
                    <SpeedIcon /> Complexity
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)', mb: 3 }} elevation={0}>
                    {result.complexity || 'Unknown'}
                  </Paper>

                  {result.use_cases && result.use_cases.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#6ee7b7' }}>Common Use Cases</Typography>
                      {result.use_cases.map((uc, i) => (
                        <Paper key={i} sx={{ p: 1.5, mb: 1, bgcolor: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', borderLeft: '3px solid #6ee7b7' }} elevation={0}>
                          {uc}
                        </Paper>
                      ))}
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box className="glass-panel" sx={{ p: 3, height: 'calc(100vh - 500px)', minHeight: '300px', overflowY: 'auto' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#93c5fd' }}>
                    <AutoAwesomeIcon /> Line-by-Line Breakdown
                  </Typography>
                  {result.line_by_line && result.line_by_line.map((item, index) => (
                    <Accordion key={index} sx={{ bgcolor: 'rgba(255,255,255,0.03)', color: 'white', mb: 1, border: '1px solid var(--glass-border)', '&:before': { display: 'none' } }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                        <Typography sx={{ fontFamily: 'monospace', color: '#93c5fd' }}>{typeof item === 'object' ? Object.keys(item)[0] || `Line ${index + 1}` : `Part ${index + 1}`}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ borderTop: '1px solid var(--glass-border)', bgcolor: 'rgba(0,0,0,0.2)' }}>
                        <Typography sx={{ color: 'var(--text-secondary)' }}>
                          {typeof item === 'object' ? Object.values(item)[0] : item}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                  {(!result.line_by_line || result.line_by_line.length === 0) && (
                    <Typography sx={{ color: 'var(--text-secondary)' }}>No detailed breakdown available.</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
