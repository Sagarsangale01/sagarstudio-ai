import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { trendWatcher } from '../services/api';
import { TREND_DOMAINS, TREND_FOCUS_AREAS } from '../utils/constants';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import SchoolIcon from '@mui/icons-material/School';

export default function TrendWatcher() {
  const [domain, setDomain] = useState('Full-Stack Web Development');
  const [focusArea, setFocusArea] = useState('AI & Machine Learning Integration');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await trendWatcher({ domain, focus_area: focusArea });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to fetch trends. Please check your connection." });
    }
    setLoading(false);
  };

  const getMaturityColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'emerging': return '#f87171';
      case 'growing': return '#fbbf24';
      case 'mainstream': return '#34d399';
      default: return '#94a3b8';
    }
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Box className="glass-panel" sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TrendingUpIcon /> Trend Watcher
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel sx={{ color: 'var(--text-secondary)' }}>Domain</InputLabel>
            <Select value={domain} label="Domain" onChange={(e) => setDomain(e.target.value)}
              sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}>
              {TREND_DOMAINS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 260 }}>
            <InputLabel sx={{ color: 'var(--text-secondary)' }}>Focus Area</InputLabel>
            <Select value={focusArea} label="Focus Area" onChange={(e) => setFocusArea(e.target.value)}
              sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}>
              {TREND_FOCUS_AREAS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RocketLaunchIcon />}
            sx={{ bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', px: 4, py: 1.2, fontWeight: 600, textTransform: 'none' }}>
            {loading ? 'Scanning Tech Radar...' : 'Scan Trends'}
          </Button>
        </Box>
      </Box>

      {result && (
        <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {result.error && <Box className="glass-panel" sx={{ p: 3 }}><Typography color="error">{result.error}</Typography></Box>}

          {result.executive_summary && (
            <Box className="glass-panel" sx={{ p: 3, borderLeft: '3px solid var(--primary-color)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'var(--primary-color)' }}>Market Pulse</Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>{result.executive_summary}</Typography>
            </Box>
          )}

          {result.top_trends && result.top_trends.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'var(--text-primary)' }}>Top Trends</Typography>
              <Grid container spacing={2}>
                {result.top_trends.map((t, i) => (
                  <Grid item xs={12} md={6} key={i}>
                    <Box className="glass-panel" sx={{ p: 3, height: '100%', borderTop: `3px solid ${getMaturityColor(t.maturity_level)}` }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white', flex: 1, mr: 1 }}>{t.trend}</Typography>
                        <Chip label={t.maturity_level} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: getMaturityColor(t.maturity_level), flexShrink: 0 }} />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.why_it_matters}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          <Grid container spacing={3}>
            {result.tools_to_watch && result.tools_to_watch.length > 0 && (
              <Grid item xs={12} md={6}>
                <Box className="glass-panel" sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                    <BuildCircleIcon /> Tools to Watch
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {result.tools_to_watch.map((tool, i) => (
                      <Chip key={i} label={tool} sx={{ bgcolor: 'rgba(96,165,250,0.1)', color: '#93c5fd', border: '1px solid rgba(96,165,250,0.3)' }} />
                    ))}
                  </Box>
                </Box>
              </Grid>
            )}
            {result.skill_recommendations && result.skill_recommendations.length > 0 && (
              <Grid item xs={12} md={6}>
                <Box className="glass-panel" sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                    <SchoolIcon /> Skills to Invest In
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.9 }}>
                    {result.skill_recommendations.map((s, i) => <li key={i}><Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{s}</Typography></li>)}
                  </ul>
                </Box>
              </Grid>
            )}
          </Grid>

          {result.raw && <Box className="glass-panel" sx={{ p: 3 }}><Typography sx={{ color: '#fff' }}>{result.raw}</Typography></Box>}
        </Box>
      )}
    </Box>
  );
}
