import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import Editor from '@monaco-editor/react';
import { testGenerator } from '../services/api';
import { LANGUAGES, TEST_FRAMEWORKS } from '../utils/constants';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import WarningIcon from '@mui/icons-material/Warning';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CodeIcon from '@mui/icons-material/Code';

export default function TestGenerator() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [framework, setFramework] = useState('None');
  const [testFramework, setTestFramework] = useState('Jest');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await testGenerator({ code, language, framework, test_framework: testFramework });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate tests. Please check your connection." });
    }
    setLoading(false);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} lg={6} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <PlaylistAddCheckIcon /> Test Generator
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Language</InputLabel>
                  <Select
                    value={language}
                    label="Language"
                    onChange={(e) => setLanguage(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {LANGUAGES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
                
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Test Framework</InputLabel>
                  <Select
                    value={testFramework}
                    label="Test Framework"
                    onChange={(e) => setTestFramework(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {TEST_FRAMEWORKS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            
            <TextField
              size="small"
              fullWidth
              label="Application Framework (e.g., React, Django, Express. Optional)"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              InputLabelProps={{ style: { color: 'var(--text-secondary)' } }}
              sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' } } }}
            />

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Paste your application code below. Our AI will automatically generate extensive unit tests, considering edge cases and coverage.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '350px' : '450px', transition: 'height 0.4s ease' }}>
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  padding: { top: 16 }
                }}
              />
            </Box>

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !code}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FactCheckIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Generating Tests...' : 'Generate Tests'}
            </Button>
          </Box>
        </Grid>

        {/* Results Section */}
        {result && (
          <Grid item xs={12} lg={6} className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: 'calc(100vh - 200px)', overflowY: 'auto', pr: 1 }}>
            
            {result.error && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography color="error">{result.error}</Typography>
              </Box>
            )}

            {/* Test Strategy */}
            {result.test_strategy && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                  <AssignmentTurnedInIcon /> Test Strategy
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-primary)' }}>
                  {result.test_strategy}
                </Typography>
              </Box>
            )}

            {/* Edge Cases */}
            {result.edge_cases && result.edge_cases.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#f87171' }}>
                  <WarningIcon /> Edge Cases Considered
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {result.edge_cases.map((edge_case, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{edge_case}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Coverage Tips */}
            {result.coverage_tips && result.coverage_tips.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                  <FactCheckIcon /> Coverage & Testing Tips
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {result.coverage_tips.map((tip, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{tip}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Test Code Preview */}
            {result.test_code && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon fontSize="small" /> Test Suite Code
                  </Typography>
                </Box>
                <Editor
                  height="400px"
                  language={language}
                  theme="vs-dark"
                  value={result.test_code}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    padding: { top: 16 }
                  }}
                />
              </Box>
            )}

            {/* Raw JSON Fallback */}
            {result.raw && (
               <Box className="glass-panel" sx={{ p: 3 }}>
                   <Typography sx={{ color: '#fff' }}>{result.raw}</Typography>
               </Box>
            )}

          </Grid>
        )}
      </Grid>
    </Box>
  );
}
