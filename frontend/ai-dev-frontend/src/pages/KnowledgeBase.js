import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Editor from '@monaco-editor/react';
import { knowledgeBase } from '../services/api';
import { KB_DOMAINS, EXPERIENCE_LEVELS } from '../utils/constants';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ExploreIcon from '@mui/icons-material/Explore';

export default function KnowledgeBase() {
  const [question, setQuestion] = useState('');
  const [domain, setDomain] = useState('Software Engineering');
  const [experienceLevel, setExperienceLevel] = useState('Mid-level');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await knowledgeBase({ question, domain, experience_level: experienceLevel });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to fetch knowledge. Please check your connection." });
    }
    setLoading(false);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <LiveHelpIcon /> Knowledge Base
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Domain</InputLabel>
                  <Select value={domain} label="Domain" onChange={(e) => setDomain(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}>
                    {KB_DOMAINS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>My Level</InputLabel>
                  <Select value={experienceLevel} label="My Level" onChange={(e) => setExperienceLevel(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}>
                    {EXPERIENCE_LEVELS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Ask any technical question. Our Principal Engineer AI will give you a structured answer calibrated to your experience level.
            </Typography>
            <TextField multiline rows={5} fullWidth
              placeholder="e.g., 'What is the difference between useCallback and useMemo?', 'How does database indexing work?', 'Explain CAP theorem'"
              value={question} onChange={(e) => setQuestion(e.target.value)}
              sx={{ '& .MuiInputBase-root': { color: 'white', bgcolor: 'rgba(0,0,0,0.2)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' } } }}
            />
            <Button variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !question}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoStoriesIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}>
              {loading ? 'Consulting Knowledge Base...' : 'Get Answer'}
            </Button>
          </Box>
        </Grid>

        {result && (
          <Grid item xs={12} lg={6} className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: 'calc(100vh - 200px)', overflowY: 'auto', pr: 1 }}>
            {result.error && <Box className="glass-panel" sx={{ p: 3 }}><Typography color="error">{result.error}</Typography></Box>}

            {result.answer && (
              <Box className="glass-panel" sx={{ p: 3, borderLeft: '3px solid #60a5fa' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#60a5fa' }}>Direct Answer</Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>{result.answer}</Typography>
              </Box>
            )}

            {result.deep_dive && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#c084fc' }}>Deep Dive</Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{result.deep_dive}</Typography>
              </Box>
            )}

            {result.code_example && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Code Example</Typography>
                </Box>
                <Editor height="220px" language="javascript" theme="vs-dark" value={result.code_example}
                  options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, padding: { top: 12 } }} />
              </Box>
            )}

            {result.common_mistakes && result.common_mistakes.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#f87171' }}>
                  <WarningAmberIcon fontSize="small" /> Common Mistakes
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                  {result.common_mistakes.map((m, i) => <li key={i}><Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{m}</Typography></li>)}
                </ul>
              </Box>
            )}

            {result.further_reading && result.further_reading.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fbbf24' }}>
                  <ExploreIcon fontSize="small" /> Explore Further
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                  {result.further_reading.map((r, i) => <li key={i}><Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>{r}</Typography></li>)}
                </ul>
              </Box>
            )}

            {result.raw && <Box className="glass-panel" sx={{ p: 3 }}><Typography sx={{ color: '#fff' }}>{result.raw}</Typography></Box>}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
