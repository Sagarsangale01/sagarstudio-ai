import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import Editor from '@monaco-editor/react';
import { techDocsAssistant } from '../services/api';
import { EDITOR_LANGUAGES, DOC_TYPES } from '../utils/constants';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default function TechDocsAssistant() {
  const [contextInput, setContextInput] = useState('');
  const [docType, setDocType] = useState('README.md');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!contextInput) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await techDocsAssistant({ context: contextInput, doc_type: docType, language });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate documentation. Please check your connection." });
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
                <ArticleIcon /> Tech Docs Assistant
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Language</InputLabel>
                  <Select
                    value={language}
                    label="Language / Stack"
                    onChange={(e) => setLanguage(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {EDITOR_LANGUAGES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Doc Type</InputLabel>
                  <Select
                    value={docType}
                    label="Doc Type"
                    onChange={(e) => setDocType(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {DOC_TYPES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Provide your code snippet, raw business requirements, or a brief architecture description below. Our AI Technical Writer will generate pristine markdown documentation.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '350px' : '450px', transition: 'height 0.4s ease' }}>
              <Editor
                height="100%"
                language={language === 'General' ? 'plaintext' : language}
                theme="vs-dark"
                value={contextInput}
                onChange={(value) => setContextInput(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  padding: { top: 16 }
                }}
              />
            </Box>

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !contextInput}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AssignmentIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Drafting Documentation...' : 'Generate Documentation'}
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

            {/* Header Info */}
            {result.doc_title && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'var(--text-primary)' }}>
                  {result.doc_title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                  {result.summary}
                </Typography>
              </Box>
            )}

            {/* Suggested Additions */}
            {result.suggested_additions && result.suggested_additions.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fbbf24' }}>
                  <LightbulbIcon fontSize="small" /> Manual Additions Needed
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {result.suggested_additions.map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Box sx={{ mt: 0.8, width: 6, height: 6, borderRadius: '50%', bgcolor: '#fbbf24', flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Markdown Output Preview */}
            {result.markdown_content && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ArticleIcon fontSize="small" /> Markdown Source
                  </Typography>
                </Box>
                <Editor
                  height="400px"
                  language="markdown"
                  theme="vs-dark"
                  value={result.markdown_content}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
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
