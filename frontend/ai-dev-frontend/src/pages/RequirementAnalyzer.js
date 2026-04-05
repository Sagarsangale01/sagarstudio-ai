import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, TextField, Chip } from '@mui/material';
import { requirementAnalyzer } from '../services/api';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

export default function RequirementAnalyzer() {
  const [requirements, setRequirements] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!requirements) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await requirementAnalyzer({ requirements });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to analyze requirements. Please check your connection." });
    }
    setLoading(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '#fca5a5';
      case 'medium': return '#fcd34d';
      case 'low': return '#86efac';
      default: return '#cbd5e1';
    }
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} lg={result ? 4 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
              <AssignmentIcon /> Requirement Analyzer
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 1 }}>
              Describe your project requirements in plain english. We'll convert them into actionable tasks, wireframe recommendations, and database schema suggestions.
            </Typography>

            <TextField
              multiline rows={12} fullWidth variant="outlined" label="Project Requirements"
              value={requirements} onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g. I want to build a blog where users can register, login, create posts, comment on posts, and like them. There should be an admin panel to manage users and posts..."
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' }, color: 'var(--text-primary)' } }}
            />

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !requirements}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AccountTreeIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Analyzing Specs...' : 'Analyze Requirements'}
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

            {/* Project Summary */}
            {result.project_summary && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#a78bfa' }}>
                  <AssignmentIcon /> Project Summary
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-primary)' }}>
                  {result.project_summary}
                </Typography>
              </Box>
            )}

            {/* Actionable Tasks */}
            {result.actionable_tasks && result.actionable_tasks.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                  <AccountTreeIcon /> Actionable Tasks
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {result.actionable_tasks.map((task, idx) => (
                    <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: 1 }} elevation={0}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                          {task.title}
                        </Typography>
                        <Chip 
                          label={task.priority} 
                          size="small" 
                          icon={<PriorityHighIcon style={{ color: getPriorityColor(task.priority) }}/>} 
                          sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: getPriorityColor(task.priority), fontWeight: 'bold' }} 
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                        {task.description}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {/* Schema Suggestions */}
            {result.schema_suggestions && result.schema_suggestions.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                  <StorageIcon /> Database Schema Suggestions
                </Typography>
                
                <Grid container spacing={2}>
                  {result.schema_suggestions.map((schema, idx) => (
                    <Grid item xs={12} md={6} key={idx}>
                      <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', height: '100%' }} elevation={0}>
                        <Typography variant="subtitle1" sx={{ color: '#34d399', fontWeight: 700, mb: 1, borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 1 }}>
                          {schema.entity}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', mb: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>Fields</Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {schema.fields && schema.fields.map((field, fIdx) => (
                              <Chip key={fIdx} label={field} size="small" sx={{ bgcolor: 'rgba(52,211,153,0.1)', color: '#d1fae5', border: '1px solid rgba(52,211,153,0.3)', fontFamily: 'monospace' }} />
                            ))}
                          </Box>
                        </Box>
                        {schema.relationships && (
                          <Box>
                            <Typography variant="caption" sx={{ color: 'var(--text-secondary)', display: 'block', mb: 0.5, textTransform: 'uppercase', letterSpacing: '1px' }}>Relationships</Typography>
                            <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{schema.relationships}</Typography>
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Wireframe Recommendations */}
            {result.wireframe_recommendations && result.wireframe_recommendations.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#f472b6' }}>
                  <WebIcon /> Wireframe Recommendations
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {result.wireframe_recommendations.map((wireframe, idx) => (
                    <Paper key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: 1 }} elevation={0}>
                      <Typography variant="subtitle1" sx={{ color: '#fbcfe8', fontWeight: 600 }}>
                        {wireframe.page} Page
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        Layout: {wireframe.layout}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>Key Elements:</Typography>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                          {wireframe.key_elements && wireframe.key_elements.map((element, eIdx) => (
                            <li key={eIdx} style={{ marginBottom: '4px' }}>{element}</li>
                          ))}
                        </ul>
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
