import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import Editor from '@monaco-editor/react';
import { codeSnippets } from '../services/api';
import { LANGUAGES, SNIPPET_TYPES } from '../utils/constants';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';
import LabelIcon from '@mui/icons-material/Label';

export default function CodeSnippets() {
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [snippetType, setSnippetType] = useState('Utility Function');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!description) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await codeSnippets({ description, language, snippet_type: snippetType });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate snippet. Please check your connection." });
    }
    setLoading(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <ContentCopyIcon /> Code Snippets
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Language</InputLabel>
                  <Select value={language} label="Language" onChange={(e) => setLanguage(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}>
                    {LANGUAGES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Snippet Type</InputLabel>
                  <Select value={snippetType} label="Snippet Type" onChange={(e) => setSnippetType(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}>
                    {SNIPPET_TYPES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Describe the snippet you need in plain English. Our AI will generate a clean, production-ready implementation with a usage example.
            </Typography>
            <TextField
              multiline rows={6} fullWidth
              placeholder="e.g., 'A debounce function that delays execution', 'JWT authentication middleware for Express', 'Binary search algorithm'..."
              value={description} onChange={(e) => setDescription(e.target.value)}
              InputLabelProps={{ style: { color: 'var(--text-secondary)' } }}
              sx={{ '& .MuiInputBase-root': { color: 'white', bgcolor: 'rgba(0,0,0,0.2)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' } } }}
            />
            <Button variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !description}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CodeIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}>
              {loading ? 'Generating Snippet...' : 'Generate Snippet'}
            </Button>
          </Box>
        </Grid>

        {result && (
          <Grid item xs={12} lg={6} className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: 'calc(100vh - 200px)', overflowY: 'auto', pr: 1 }}>
            {result.error && <Box className="glass-panel" sx={{ p: 3 }}><Typography color="error">{result.error}</Typography></Box>}

            {result.snippet_title && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'var(--text-primary)' }}>{result.snippet_title}</Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6, mb: 2 }}>{result.explanation}</Typography>
                {result.tags && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {result.tags.map((tag, i) => (
                      <Chip key={i} label={tag} icon={<LabelIcon />} size="small" sx={{ bgcolor: 'rgba(99,102,241,0.15)', color: '#818cf8', borderColor: '#818cf8', border: '1px solid' }} />
                    ))}
                  </Box>
                )}
              </Box>
            )}

            {result.code && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Snippet Code</Typography>
                  <Button size="small" startIcon={<ContentCopyIcon />} onClick={() => handleCopy(result.code)}
                    sx={{ color: copied ? '#34d399' : 'var(--text-secondary)', textTransform: 'none' }}>
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </Box>
                <Editor height="250px" language={language} theme="vs-dark" value={result.code}
                  options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14, padding: { top: 12 } }} />
              </Box>
            )}

            {result.usage_example && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>Usage Example</Typography>
                </Box>
                <Editor height="150px" language={language} theme="vs-dark" value={result.usage_example}
                  options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, padding: { top: 10 } }} />
              </Box>
            )}

            {result.raw && <Box className="glass-panel" sx={{ p: 3 }}><Typography sx={{ color: '#fff' }}>{result.raw}</Typography></Box>}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
