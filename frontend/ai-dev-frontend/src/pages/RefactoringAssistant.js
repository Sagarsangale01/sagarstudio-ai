import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import Editor from '@monaco-editor/react';
import { refactoringAssistant } from '../services/api';
import { LANGUAGES } from '../utils/constants';
import ConstructionIcon from '@mui/icons-material/Construction';
import HandymanIcon from '@mui/icons-material/Handyman';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import WarningIcon from '@mui/icons-material/Warning';
import SpeedIcon from '@mui/icons-material/Speed';

export default function RefactoringAssistant() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await refactoringAssistant({ code, language });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate refactored code. Please check your connection." });
    }
    setLoading(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return '#fca5a5';
      case 'medium': return '#fcd34d';
      case 'low': return '#86efac';
      default: return '#cbd5e1';
    }
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} lg={6} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <ConstructionIcon /> Refactoring Assistant
              </Typography>

              <FormControl size="small" sx={{ minWidth: 150 }}>
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
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Paste your messy or inefficient code here. Our AI will analyze it for code smells, dead code, and anti-patterns, and provide a perfectly refactored version.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '400px' : '500px', transition: 'height 0.4s ease' }}>
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
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <HandymanIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Refactoring Code...' : 'Refactor Code'}
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

            {/* Performance Gains */}
            {result.performance_gains && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                  <SpeedIcon /> Optimization Summary
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-primary)' }}>
                  {result.performance_gains}
                </Typography>
              </Box>
            )}

            {/* Issues Found */}
            {result.issues_found && result.issues_found.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#f87171' }}>
                  <WarningIcon /> Issues Identified
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {result.issues_found.map((issue, idx) => (
                    <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1.5, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 1, border: '1px solid var(--glass-border)' }}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                        {issue.issue}
                      </Typography>
                      <Chip label={issue.severity} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: getSeverityColor(issue.severity), fontWeight: 600 }} />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Refactoring Steps */}
            {result.refactoring_steps && result.refactoring_steps.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                  <TrackChangesIcon /> Changes Made
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {result.refactoring_steps.map((step, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{step}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Refactored Code */}
            {result.refactored_code && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HandymanIcon fontSize="small" /> Refactored Code
                  </Typography>
                </Box>
                <Editor
                  height="350px"
                  language={language}
                  theme="vs-dark"
                  value={result.refactored_code}
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
