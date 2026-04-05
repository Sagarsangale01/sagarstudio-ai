import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, TextField, MenuItem } from '@mui/material';
import Editor from '@monaco-editor/react';
import { convertCode } from '../services/api';
import { LANGUAGES } from '../utils/constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function CodeConverter() {
  const defaultCode = `def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    sequence = [0, 1]
    while len(sequence) < n:
        next_val = sequence[-1] + sequence[-2]
        sequence.append(next_val)
        
    return sequence`;

  const [code, setCode] = useState(defaultCode);
  const [sourceLang, setSourceLang] = useState('python');
  const [targetLang, setTargetLang] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await convertCode({ code, source_lang: sourceLang, target_lang: targetLang });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to connect to AI server.", notes: [] });
    }
    setLoading(false);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Source Code Container */}
        <Grid item xs={12} lg={result ? 6 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 2, height: 'calc(100vh - 200px)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, mr: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mr: 1, display: { xs: 'none', md: 'block' } }}>Code Converter</Typography>
                <TextField
                  select size="small" label="Source Language" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}
                  sx={{ width: '150px', '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
                >
                  {LANGUAGES.map((o) => <MenuItem key={"source-" + o.value} value={o.value}>{o.label}</MenuItem>)}
                </TextField>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SyncAltIcon sx={{ color: 'var(--text-secondary)' }} />
                </Box>
                <TextField
                  select size="small" label="Target Language" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}
                  sx={{ width: '150px', '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
                >
                  {LANGUAGES.map((o) => <MenuItem key={"target-" + o.value} value={o.value}>{o.label}</MenuItem>)}
                </TextField>
              </Box>

              <Button
                variant="contained" onClick={handleSubmit} disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                sx={{ bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
              >
                {loading ? 'Converting...' : 'Convert'}
              </Button>
            </Box>
            <Box className="monaco-container" sx={{ flexGrow: 1 }}>
              <Editor height="100%" language={sourceLang} theme="vs-dark" value={code} onChange={(value) => setCode(value)} options={{ minimap: { enabled: false }, fontSize: 14 }} />
            </Box>
          </Box>
        </Grid>

        {/* Result Container */}
        {result && (
          <Grid item xs={12} lg={6} sx={{ transition: 'all 0.4s ease' }}>
            <Box className="glass-panel" sx={{ p: 3, height: 'calc(100vh - 200px)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, pl: 1 }}>
                Target Code
              </Typography>

              {result?.error && (
                <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', p: 2, borderRadius: 2, border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', mb: 2 }}>
                  <Typography>{result.error}</Typography>
                </Box>
              )}

              <Box className="monaco-container" sx={{ flexGrow: 1, mb: result?.notes?.length > 0 ? 2 : 0 }}>
                <Editor
                  height="100%"
                  language={targetLang}
                  theme="vs-dark"
                  value={result?.converted_code || '// Converted code will appear here...'}
                  options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }}
                />
              </Box>

              {result && result.notes && result.notes.length > 0 && (
                <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, border: '1px solid var(--glass-border)', maxHeight: '150px', overflowY: 'auto' }}>
                  <Typography variant="subtitle2" sx={{ color: '#6ee7b7', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InfoOutlinedIcon fontSize="small" /> Notes on Conversion
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {result.notes.map((note, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{note}</li>)}
                  </ul>
                </Box>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
