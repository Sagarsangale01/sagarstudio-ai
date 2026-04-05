import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Editor from '@monaco-editor/react';
import { aiPairProgramming } from '../services/api';
import { LANGUAGES } from '../utils/constants';
import PeopleIcon from '@mui/icons-material/People';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BugReportIcon from '@mui/icons-material/BugReport';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

export default function AiPairProgramming() {
  const [code, setCode] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!taskDescription) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await aiPairProgramming({ code, task_description: taskDescription, language });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to start pair session. Please check your connection." });
    }
    setLoading(false);
  };

  const applyCode = () => {
    if (result?.continued_code) {
      setCode(prev => (prev ? prev + '\n\n' + result.continued_code : result.continued_code));
      setResult(null);
    }
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <PeopleIcon /> AI Pair Programming
              </Typography>
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel sx={{ color: 'var(--text-secondary)' }}>Language</InputLabel>
                <Select value={language} label="Language" onChange={(e) => setLanguage(e.target.value)}
                  sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}>
                  {LANGUAGES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            <TextField size="small" fullWidth multiline rows={2}
              label="Describe your task / what you're trying to build"
              placeholder="e.g., 'Build a rate limiter middleware for an Express API', 'Implement a binary tree traversal'"
              value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}
              InputLabelProps={{ style: { color: 'var(--text-secondary)' } }}
              sx={{ '& .MuiInputBase-root': { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' } } }}
            />

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Your current code (or leave empty to start fresh). The AI will review it, identify next steps, and write the next block.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', flex: 1, minHeight: result ? '280px' : '380px', transition: 'min-height 0.4s ease' }}>
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
                options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: 'on', padding: { top: 16 } }}
              />
            </Box>

            <Button variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !taskDescription}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PeopleIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}>
              {loading ? 'Thinking with you...' : 'Start Pair Session'}
            </Button>
          </Box>
        </Grid>

        {result && (
          <Grid item xs={12} lg={6} className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: 'calc(100vh - 200px)', overflowY: 'auto', pr: 1 }}>
            {result.error && <Box className="glass-panel" sx={{ p: 3 }}><Typography color="error">{result.error}</Typography></Box>}

            {result.code_review && (
              <Box className="glass-panel" sx={{ p: 3, borderLeft: '3px solid #60a5fa' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#60a5fa' }}>Code Review</Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{result.code_review}</Typography>
              </Box>
            )}

            {result.issues_found && result.issues_found.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#f87171' }}>
                  <BugReportIcon fontSize="small" /> Issues Found
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                  {result.issues_found.map((issue, i) => <li key={i}><Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{issue}</Typography></li>)}
                </ul>
              </Box>
            )}

            {result.next_step_suggestion && (
              <Box className="glass-panel" sx={{ p: 3, borderLeft: '3px solid #34d399' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                  <ArrowForwardIcon fontSize="small" /> Next Step
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>{result.next_step_suggestion}</Typography>
              </Box>
            )}

            {result.continued_code && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Suggested Next Block</Typography>
                  <Button size="small" variant="contained" onClick={applyCode}
                    sx={{ bgcolor: '#34d399', color: '#000', '&:hover': { bgcolor: '#10b981' }, textTransform: 'none', fontWeight: 600 }}>
                    Apply to Editor
                  </Button>
                </Box>
                <Editor height="220px" language={language} theme="vs-dark" value={result.continued_code}
                  options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, padding: { top: 12 } }} />
              </Box>
            )}

            {result.pair_tip && (
              <Box className="glass-panel" sx={{ p: 3, bgcolor: 'rgba(251,191,36,0.05)', borderLeft: '3px solid #fbbf24' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#fbbf24' }}>
                  <EmojiObjectsIcon fontSize="small" /> Staff Engineer Tip
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>"{result.pair_tip}"</Typography>
              </Box>
            )}

            {result.raw && <Box className="glass-panel" sx={{ p: 3 }}><Typography sx={{ color: '#fff' }}>{result.raw}</Typography></Box>}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
