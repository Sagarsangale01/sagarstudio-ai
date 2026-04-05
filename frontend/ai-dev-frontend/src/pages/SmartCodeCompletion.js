import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Editor from '@monaco-editor/react';
import { smartAutocomplete } from '../services/api';
import { LANGUAGES } from '../utils/constants';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CodeIcon from '@mui/icons-material/Code';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';

export default function SmartCodeCompletion() {
  const [codeContext, setCodeContext] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!codeContext) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await smartAutocomplete({ 
        code_context: codeContext, 
        language,
        cursor_position: 'End of file'
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate autocomplete suggestions. Please check your connection." });
    }
    setLoading(false);
  };

  const applySuggestion = (suggestedCode) => {
    setCodeContext(prev => prev + '\n\n' + suggestedCode);
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} lg={result ? 6 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoFixHighIcon /> Smart Code Completion
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
              Paste your current code context below. Our AI will analyze the flow and context to suggest the next logical block, function, or implementation step.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '350px' : '500px', transition: 'height 0.4s ease' }}>
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={codeContext}
                onChange={(value) => setCodeContext(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  padding: { top: 16 }
                }}
              />
            </Box>

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !codeContext}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CodeIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Analyzing Context...' : 'Generate AI Suggestions'}
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

            {/* Suggestions List */}
            {result.suggestions && result.suggestions.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#3b82f6' }}>
                  <LightbulbIcon /> Context-Aware Suggestions
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {result.suggestions.map((suggestion, idx) => (
                    <Paper key={idx} sx={{ p: 0, bgcolor: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', overflow: 'hidden' }} elevation={0}>
                      {/* Suggestion Header */}
                      <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                          {suggestion.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                          {suggestion.explanation}
                        </Typography>
                      </Box>
                      
                      {/* Suggested Code Preview */}
                      <Box sx={{ position: 'relative' }}>
                         <Editor
                            height="150px"
                            language={language}
                            theme="vs-dark"
                            value={suggestion.code}
                            options={{
                              readOnly: true,
                              minimap: { enabled: false },
                              scrollBeyondLastLine: false,
                              fontSize: 13,
                              padding: { top: 10, bottom: 10 }
                            }}
                          />
                          <Button 
                            variant="contained" 
                            size="small" 
                            startIcon={<ContentPasteGoIcon />}
                            onClick={() => applySuggestion(suggestion.code)}
                            sx={{ position: 'absolute', bottom: 10, right: 10, bgcolor: 'rgba(59, 130, 246, 0.8)', '&:hover': { bgcolor: '#3b82f6' }, textTransform: 'none', borderRadius: 2 }}
                          >
                            Apply Suggestion
                          </Button>
                      </Box>
                    </Paper>
                  ))}
                </Box>
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
