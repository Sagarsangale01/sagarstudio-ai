import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import Editor from '@monaco-editor/react';
import { performanceProfiler } from '../services/api';
import { LANGUAGES, PERFORMANCE_FOCUS_AREAS } from '../utils/constants';
import SpeedIcon from '@mui/icons-material/Speed';
import TimerIcon from '@mui/icons-material/Timer';
import MemoryIcon from '@mui/icons-material/Memory';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import BoltIcon from '@mui/icons-material/Bolt';

export default function PerformanceProfiler() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [focusArea, setFocusArea] = useState('General');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await performanceProfiler({ code, language, focus_area: focusArea });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to run performance analysis. Please check your connection." });
    }
    setLoading(false);
  };

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high': return '#fca5a5';
      case 'medium': return '#fcd34d';
      case 'low': return '#93c5fd';
      default: return '#cbd5e1';
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
                <SpeedIcon /> Performance Profiler
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
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

                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Focus Area</InputLabel>
                  <Select
                    value={focusArea}
                    label="Focus Area"
                    onChange={(e) => setFocusArea(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {PERFORMANCE_FOCUS_AREAS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Paste your application code or query below. Our AI Performance Profiler will evaluate Big O complexity, identify memory leaks, and generate highly optimized code.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '350px' : '450px', transition: 'height 0.4s ease' }}>
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
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <BoltIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Profiling Execution...' : 'Run Performance Profiler'}
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

            <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Time Complexity */}
                {result.time_complexity && (
                <Box className="glass-panel" sx={{ p: 3, flex: 1, borderLeft: '3px solid #60a5fa' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TimerIcon fontSize="small"/> Time Complexity
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {result.time_complexity}
                    </Typography>
                </Box>
                )}

                {/* Space Complexity */}
                {result.space_complexity && (
                <Box className="glass-panel" sx={{ p: 3, flex: 1, borderLeft: '3px solid #c084fc' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#c084fc', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MemoryIcon fontSize="small"/> Space Complexity
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {result.space_complexity}
                    </Typography>
                </Box>
                )}
            </Box>

            {/* Bottlenecks */}
            {result.bottlenecks && result.bottlenecks.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fb923c' }}>
                  <WarningAmberIcon /> Execution Bottlenecks
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {result.bottlenecks.map((btn, idx) => (
                    <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, borderLeft: `3px solid ${getImpactColor(btn.impact)}` }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>{btn.issue}</Typography>
                        <Chip label={btn.impact + " Impact"} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: getImpactColor(btn.impact), fontSize: '0.7rem' }} />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                        Location: {btn.line_or_area}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Performance Gains Summary */}
            {result.performance_gains && (
              <Box className="glass-panel" sx={{ p: 3, bgcolor: 'rgba(52, 211, 153, 0.05)' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#34d399', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BoltIcon /> Optimization Results
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {result.performance_gains}
                </Typography>
              </Box>
            )}

            {/* Optimized Code Preview */}
            {result.optimized_code && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                     Optimized High-Performance Code
                  </Typography>
                </Box>
                <Editor
                  height="350px"
                  language={language}
                  theme="vs-dark"
                  value={result.optimized_code}
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
