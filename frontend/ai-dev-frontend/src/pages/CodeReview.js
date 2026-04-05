// pages/CodeReview.js
import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, TextField, MenuItem } from '@mui/material';
import Editor from '@monaco-editor/react';
import { codeReview } from '../services/api';
import { LANGUAGES, FRAMEWORKS } from '../utils/constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import BugReportIcon from '@mui/icons-material/BugReport';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function CodeReview() {
  const defaultCode = `// Example: Inefficient Javascript
function calculateSum(arr) {
  let sum = 0;
  for(let i=0; i<arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
}
`;
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState('javascript');
  const [framework, setFramework] = useState('None');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await codeReview({ code, language, framework: framework !== 'None' ? framework : undefined });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({
        error: "Failed to connect to AI server. Please make sure the backend is running and valid API key is provided.",
        issues: [],
        improvements: []
      });
    }
    setLoading(false);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Editor Row */}
        <Grid item xs={12} lg={result ? 6 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 2, height: 'calc(100vh - 200px)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, mr: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mr: 1, display: { xs: 'none', md: 'block' } }}>Source Code</Typography>
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
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                sx={{
                  bgcolor: 'var(--primary-color)',
                  '&:hover': { bgcolor: 'var(--primary-hover)' },
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3

                }}
              >
                {loading ? 'Analyzing...' : 'Run Review'}
              </Button>
            </Box>
            <Box className="monaco-container" sx={{ flexGrow: 1 }}>
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', 'Fira Code', source-code-pro, Menlo, Monaco, Consolas, monospace",
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorBlinking: "smooth"
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Results Row */}
        {result && (
          <Grid item xs={12} lg={6} className="animate-fade-in">
            <Box className="glass-panel" sx={{ p: 3, height: 'calc(100vh - 200px)', minHeight: '400px', overflowY: 'auto' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesomeIcon /> Review Results
              </Typography>

              {result.error && (
                <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', p: 2, borderRadius: 2, border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', mb: 3 }}>
                  <Typography>{result.error}</Typography>
                </Box>
              )}

              {result.issues && result.issues.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fca5a5' }}>
                    <BugReportIcon /> Issues Detected
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Array.isArray(result.issues) ? result.issues.map((issue, idx) => (
                      <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }} elevation={0}>
                        {typeof issue === 'string' ? issue : JSON.stringify(issue)}
                      </Paper>
                    )) : <Typography>{JSON.stringify(result.issues)}</Typography>}
                  </Box>
                </Box>
              )}

              {result.improvements && result.improvements.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#6ee7b7' }}>
                    <LightbulbOutlinedIcon /> Improvements
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Array.isArray(result.improvements) ? result.improvements.map((imp, idx) => (
                      <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }} elevation={0}>
                        {typeof imp === 'string' ? imp : JSON.stringify(imp)}
                      </Paper>
                    )) : <Typography>{JSON.stringify(result.improvements)}</Typography>}
                  </Box>
                </Box>
              )}

              {result.optimized_code && typeof result.optimized_code === 'string' && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#93c5fd' }}>
                    <CheckCircleOutlineIcon /> Optimized Code
                  </Typography>
                  <Box className="monaco-container" sx={{ height: '350px' }}>
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      theme="vs-dark"
                      value={result.optimized_code}
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
