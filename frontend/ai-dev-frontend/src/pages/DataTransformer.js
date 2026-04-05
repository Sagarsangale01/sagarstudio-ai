import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Editor from '@monaco-editor/react';
import { dataTransformer } from '../services/api';
import { DATA_SOURCE_FORMATS, DATA_TARGET_FORMATS } from '../utils/constants';
import TransformIcon from '@mui/icons-material/Transform';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DataObjectIcon from '@mui/icons-material/DataObject';
import FactCheckIcon from '@mui/icons-material/FactCheck';

export default function DataTransformer() {
  const [dataInput, setDataInput] = useState('');
  const [sourceFormat, setSourceFormat] = useState('JSON');
  const [targetFormat, setTargetFormat] = useState('YAML');
  const [instructions, setInstructions] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!dataInput) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await dataTransformer({ data_input: dataInput, source_format: sourceFormat, target_format: targetFormat, instructions });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to transform data. Please check your connection." });
    }
    setLoading(false);
  };

  const getEditorLanguage = (format) => {
    switch (format) {
      case 'JSON': return 'json';
      case 'YAML': return 'yaml';
      case 'XML': return 'xml';
      case 'SQL': return 'sql';
      case 'GraphQL': return 'graphql';
      default: return 'plaintext';
    }
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} lg={6} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <TransformIcon /> Data Transformer
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>From</InputLabel>
                  <Select
                    value={sourceFormat}
                    label="From"
                    onChange={(e) => setSourceFormat(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {DATA_SOURCE_FORMATS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>

                <SyncAltIcon sx={{ color: 'var(--text-secondary)' }} />

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>To</InputLabel>
                  <Select
                    value={targetFormat}
                    label="To"
                    onChange={(e) => setTargetFormat(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {DATA_TARGET_FORMATS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <TextField
              size="small"
              fullWidth
              label="Special Instructions (e.g., 'Normalize dates', 'CamelCase keys', 'Generate 10 mock records based on this schema')"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              InputLabelProps={{ style: { color: 'var(--text-secondary)' } }}
              sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' } } }}
            />

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Paste your raw {sourceFormat} data or schema below. The AI pipeline will parse, clean, and transform it flawlessly into {targetFormat}.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '350px' : '450px', transition: 'height 0.4s ease' }}>
              <Editor
                height="100%"
                language={getEditorLanguage(sourceFormat)}
                theme="vs-dark"
                value={dataInput}
                onChange={(value) => setDataInput(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  padding: { top: 16 }
                }}
              />
            </Box>

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !dataInput}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DataObjectIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Processing Data...' : `Transform to ${targetFormat}`}
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

            {/* Analysis Summary */}
            {result.transformation_summary && (
              <Box className="glass-panel" sx={{ p: 3, borderLeft: '3px solid #34d399' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'var(--text-primary)' }}>
                  Transformation Summary
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {result.transformation_summary}
                </Typography>
              </Box>
            )}

            {/* Quality Notes */}
            {result.data_quality_notes && result.data_quality_notes.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fbbf24' }}>
                  <FactCheckIcon /> Data Quality Notes
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {result.data_quality_notes.map((note, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{note}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Transformed Data Preview */}
            {result.transformed_data && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DataObjectIcon fontSize="small" /> Transformed {targetFormat}
                  </Typography>
                </Box>
                <Editor
                  height="400px"
                  language={getEditorLanguage(targetFormat)}
                  theme="vs-dark"
                  value={result.transformed_data}
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
