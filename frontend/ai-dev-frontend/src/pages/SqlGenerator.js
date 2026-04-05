import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, TextField, MenuItem } from '@mui/material';
import Editor from '@monaco-editor/react';
import { sqlGenerator } from '../services/api';
import { DATABASES } from '../utils/constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StorageIcon from '@mui/icons-material/Storage';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function SqlGenerator() {
  const [query, setQuery] = useState('Create a query to find all users who signed up in the last 30 days and have spent more than $500, grouped by their country.');
  const [db, setDb] = useState('PostgreSQL');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await sqlGenerator({ query, db });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({
        error: "Failed to connect to AI server.",
        optimization_tips: []
      });
    }
    setLoading(false);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={result ? 6 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, height: 'calc(100vh - 200px)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Describe your query</Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 2 }}>
                Explain what data you want to retrieve in plain English.
              </Typography>

              <TextField
                select
                fullWidth
                label="Target Database"
                value={db}
                onChange={(e) => setDb(e.target.value)}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' } } }}
              >
                {DATABASES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </TextField>

              <TextField
                multiline
                rows={result ? 10 : 15}
                fullWidth
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Find all active users..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'var(--glass-border)' },
                    color: 'var(--text-primary)',
                    background: 'rgba(0,0,0,0.2)'
                  }
                }}
              />
            </Box>

            <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
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
                  px: 4, py: 1.5
                }}
              >
                {loading ? 'Generating...' : 'Generate SQL'}
              </Button>
            </Box>
          </Box>
        </Grid>

        {result && (
          <Grid item xs={12} lg={6} className="animate-fade-in">
            <Box className="glass-panel" sx={{ p: 3, height: 'calc(100vh - 200px)', minHeight: '400px', overflowY: 'auto' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesomeIcon /> Generated Result
              </Typography>

              {result.error && (
                <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', p: 2, borderRadius: 2, border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', mb: 3 }}>
                  <Typography>{result.error}</Typography>
                </Box>
              )}

              {result.sql && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#93c5fd' }}>
                    <StorageIcon /> SQL Query
                  </Typography>
                  <Box className="monaco-container" sx={{ height: '300px' }}>
                    <Editor
                      height="100%"
                      defaultLanguage="sql"
                      theme="vs-dark"
                      value={result.sql}
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

              {result.explanation && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fca5a5' }}>
                    <InfoOutlinedIcon /> Explanation
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }} elevation={0}>
                    {result.explanation}
                  </Paper>
                </Box>
              )}

              {result.optimization_tips && result.optimization_tips.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#6ee7b7' }}>
                    <LightbulbOutlinedIcon /> Optimization Tips
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {Array.isArray(result.optimization_tips) ? result.optimization_tips.map((tip, idx) => (
                      <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)' }} elevation={0}>
                        {typeof tip === 'string' ? tip : JSON.stringify(tip)}
                      </Paper>
                    )) : <Typography>{JSON.stringify(result.optimization_tips)}</Typography>}
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
