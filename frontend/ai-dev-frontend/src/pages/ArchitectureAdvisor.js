import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, TextField, Chip } from '@mui/material';
import { architectureAdvisor } from '../services/api';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LayersIcon from '@mui/icons-material/Layers';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function ArchitectureAdvisor() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await architectureAdvisor({ project_description: description });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to fetch architecture advice. Please check your connection." });
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
              <AccountTreeIcon /> Architecture Advisor
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 1 }}>
              Describe your project's goals, expected traffic, and complex features. We'll suggest the best architecture, tech stack, and design patterns.
            </Typography>

            <TextField
              multiline rows={12} fullWidth variant="outlined" label="Project Description & Scale"
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. A real-time chat application expected to handle 10k concurrent users. We need fast messaging, message history, and push notifications..."
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' }, color: 'var(--text-primary)' } }}
            />

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !description}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LayersIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Consulting Architects...' : 'Get Architecture Advice'}
            </Button>
          </Box>
        </Grid>

        {/* Results Section */}
        {result && (
          <Grid item xs={12} lg={8} className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: 'calc(100vh - 200px)', overflowY: 'auto', pr: 1 }}>
            
            {result.error && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography color="error">{result.error}</Typography>
              </Box>
            )}

            {/* Recommended Architecture */}
            {result.recommended_architecture && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#a78bfa' }}>
                  <AccountTreeIcon /> Recommended Architecture: {result.recommended_architecture}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-primary)', mt: 1 }}>
                  {result.explanation}
                </Typography>
              </Box>
            )}

            {/* Tech Stack */}
            {result.tech_stack && result.tech_stack.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                  <LayersIcon /> Suggested Tech Stack
                </Typography>
                
                <Grid container spacing={2}>
                  {result.tech_stack.map((stack, idx) => (
                    <Grid item xs={12} md={6} key={idx}>
                      <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', height: '100%' }} elevation={0}>
                        <Typography variant="subtitle1" sx={{ color: '#60a5fa', fontWeight: 700, mb: 1, borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 1 }}>
                          {stack.layer}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                            {stack.technologies && stack.technologies.map((tech, tIdx) => (
                              <Chip key={tIdx} label={tech} size="small" sx={{ bgcolor: 'rgba(96,165,250,0.1)', color: '#bfdbfe', border: '1px solid rgba(96,165,250,0.3)', fontWeight: 600 }} />
                            ))}
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                           <span style={{color: 'var(--text-primary)'}}>Reasoning: </span>{stack.reasoning}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Design Patterns & Scalability */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {result.design_patterns && result.design_patterns.length > 0 && (
                <Box className="glass-panel" sx={{ p: 3, flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                    <AutoFixHighIcon /> Design Patterns
                    </Typography>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        {result.design_patterns.map((pattern, idx) => (
                        <li key={idx}>
                            <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{pattern}</Typography>
                        </li>
                        ))}
                    </ul>
                </Box>
                )}

                {result.scalability_considerations && result.scalability_considerations.length > 0 && (
                <Box className="glass-panel" sx={{ p: 3, flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fbbf24' }}>
                    <TrendingUpIcon /> Scalability 
                    </Typography>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        {result.scalability_considerations.map((item, idx) => (
                        <li key={idx}>
                            <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{item}</Typography>
                        </li>
                        ))}
                    </ul>
                </Box>
                )}
            </Box>

            {/* Potential Challenges */}
            {result.potential_challenges && result.potential_challenges.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#f87171' }}>
                  <WarningAmberIcon /> Potential Challenges & Mitigation
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {result.potential_challenges.map((challenge, idx) => (
                    <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(248,113,113,0.3)', borderLeft: '4px solid #f87171' }} elevation={0}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                        {challenge}
                      </Typography>
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
