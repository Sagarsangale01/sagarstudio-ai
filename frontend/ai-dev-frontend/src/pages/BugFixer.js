import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, TextField, MenuItem } from '@mui/material';
import Editor from '@monaco-editor/react';
import { bugFixer } from '../services/api';
import { LANGUAGES, FRAMEWORKS } from '../utils/constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BugReportIcon from '@mui/icons-material/BugReport';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function BugFixer() {
  const defaultCode = `function fetchUserData() {
  let user = null;
  setTimeout(() => {
    user = { name: "Alice", id: 1 };
  }, 1000);
  return user; // Always returns null
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
      const res = await bugFixer({ code, language, framework: framework !== 'None' ? framework : undefined });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to connect to AI server.", issues: [] });
    }
    setLoading(false);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid item xs={12} lg={result ? 6 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 2, height: 'calc(100vh - 200px)', minHeight: '400px', display: 'flex', flexDirection: 'column', transition: 'height 0.4s ease' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, mr: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mr: 1, display: { xs: 'none', md: 'block' } }}>Buggy Code</Typography>
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
                {loading ? 'Debugging...' : 'Fix Bugs'}
              </Button>
            </Box>
            <Box className="monaco-container" sx={{ flexGrow: 1 }}>
              <Editor height="100%" language={language} theme="vs-dark" value={code} onChange={(value) => setCode(value)} options={{ minimap: { enabled: false }, fontSize: 14 }} />
            </Box>
          </Box>
        </Grid>

        {result && (
          <Grid item xs={12} lg={6} className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: 'calc(100vh - 200px)', minHeight: '400px' }}>

            {/* Fixed Code */}
            <Box className="glass-panel" sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#93c5fd' }}>
                <CheckCircleOutlineIcon /> Fixed Code
              </Typography>
              <Box className="monaco-container" sx={{ flexGrow: 1, minHeight: 0 }}>
                <Editor height="100%" language={language} theme="vs-dark" value={result.fixed_code || '// No fixed code provided'} options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }} />
              </Box>
            </Box>

            {/* Issues & Explanation */}
            <Box className="glass-panel" sx={{ p: 3, flexBasis: '40%', overflowY: 'auto' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fca5a5' }}>
                <BugReportIcon /> Issues Found & Explanation
              </Typography>
              {result.error && <Typography color="error">{result.error}</Typography>}

              {result.explanation && (
                <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)', mb: 3 }} elevation={0}>
                  {result.explanation}
                </Paper>
              )}

              {result.issues && result.issues.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {Array.isArray(result.issues) ? result.issues.map((issue, idx) => (
                    <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid rgba(252, 165, 165, 0.2)' }} elevation={0}>
                      {typeof issue === 'string' ? issue : JSON.stringify(issue)}
                    </Paper>
                  )) : <Typography>{JSON.stringify(result.issues)}</Typography>}
                </Box>
              )}
            </Box>

          </Grid>
        )}
      </Grid>
    </Box>
  );
}
