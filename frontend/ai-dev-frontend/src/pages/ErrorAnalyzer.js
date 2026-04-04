import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, TextField, MenuItem } from '@mui/material';
import { errorAnalyzer } from '../services/api';
import { LANGUAGES, FRAMEWORKS, DATABASES } from '../utils/constants';
import BugReportIcon from '@mui/icons-material/BugReport';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function ErrorAnalyzer() {
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [framework, setFramework] = useState('None');
  const [database, setDatabase] = useState('None');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!error) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await errorAnalyzer({ 
        error, 
        language, 
        framework: framework !== 'None' ? framework : undefined,
        database: database !== 'None' ? database : undefined 
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to analyze error. Please check your connection." });
    }
    setLoading(false);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} lg={result ? 4 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
              <ErrorOutlineIcon /> Error Analyzer
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 1 }}>
              Paste your error message and select your tech stack to get a professional breakdown and solution.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                select fullWidth size="small" label="Language" value={language} onChange={(e) => setLanguage(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
              >
                {LANGUAGES.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
              </TextField>
              <TextField
                select fullWidth size="small" label="Framework" value={framework} onChange={(e) => setFramework(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
              >
                {FRAMEWORKS.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </TextField>
            </Box>

            <TextField
              select fullWidth size="small" label="Database" value={database} onChange={(e) => setDatabase(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
            >
              {DATABASES.map((db) => <MenuItem key={db} value={db}>{db}</MenuItem>)}
            </TextField>

            <TextField
              multiline rows={10} fullWidth variant="outlined" label="Paste Error Here"
              value={error} onChange={(e) => setError(e.target.value)}
              placeholder="e.g. ReferenceError: x is not defined..."
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' }, color: 'var(--text-primary)', fontFamily: 'monospace' } }}
            />

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !error}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PsychologyIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Analyzing Error...' : 'Analyze Error'}
            </Button>
          </Box>
        </Grid>

        {/* Results Section */}
        {result && (
          <Grid item xs={12} lg={8} className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* What & Why */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              <Box className="glass-panel" sx={{ p: 3, flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fca5a5' }}>
                  <BugReportIcon /> What is wrong?
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-primary)' }}>
                  {result.what_is_wrong}
                </Typography>
                {result.error && <Typography color="error">{result.error}</Typography>}
              </Box>

              <Box className="glass-panel" sx={{ p: 3, flex: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#93c5fd' }}>
                 <InfoOutlinedIcon /> Why it's wrong?
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {result.why_it_is_wrong}
                </Typography>
              </Box>
            </Box>

            {/* Steps & Solution */}
            <Box className="glass-panel" sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#86efac' }}>
                <ConstructionIcon /> Step-by-Step Solution
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {result.solution_steps && Array.isArray(result.solution_steps) ? result.solution_steps.map((step, idx) => (
                  <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: 1 }} elevation={0}>
                    <Typography variant="subtitle2" sx={{ color: 'var(--primary-color)', fontWeight: 700 }}>
                      Step {idx + 1}: {step.step}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                      {step.action}
                    </Typography>
                    {step.code && (
                      <Box sx={{ mt: 1, p: 2, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto' }}>
                        <code style={{ color: '#e2e8f0', fontSize: '13px', whiteSpace: 'pre' }}>{step.code}</code>
                      </Box>
                    )}
                  </Paper>
                )) : result.raw && <Typography sx={{ color: '#fff' }}>{result.raw}</Typography>}
              </Box>
            </Box>

            {/* Prevention */}
            {result.prevention_tips && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fcd34d' }}>
                  <CheckCircleOutlineIcon /> How to prevent this?
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                  {Array.isArray(result.prevention_tips) && result.prevention_tips.map((tip, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>{tip}</li>
                  ))}
                </ul>
              </Box>
            )}

          </Grid>
        )}
      </Grid>
    </Box>
  );
}
