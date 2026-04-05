import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Editor from '@monaco-editor/react';
import { monitoringAlerts } from '../services/api';
import { MONITORING_PLATFORMS } from '../utils/constants';
import MonitorIcon from '@mui/icons-material/Monitor';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import CodeIcon from '@mui/icons-material/Code';

export default function MonitoringAlerts() {
  const [logsInput, setLogsInput] = useState('');
  const [platform, setPlatform] = useState('Prometheus / Grafana');
  const [incidentType, setIncidentType] = useState('High Latency');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!logsInput) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await monitoringAlerts({ logs: logsInput, platform, incident_type: incidentType });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate monitoring strategy. Please check your connection." });
    }
    setLoading(false);
  };

  const getEditorLanguage = (platformName) => {
    if (platformName.includes('Prometheus')) return 'plaintext'; // PromQL
    if (platformName.includes('Datadog') || platformName.includes('AWS')) return 'json';
    if (platformName.includes('Terraform')) return 'hcl';
    return 'plaintext';
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} lg={6} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <MonitorIcon /> Monitoring & Alerts
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Monitoring Platform</InputLabel>
                  <Select
                    value={platform}
                    label="Monitoring Platform"
                    onChange={(e) => setPlatform(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {MONITORING_PLATFORMS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <TextField
              size="small"
              fullWidth
              label="Incident Type or Target (e.g., 'High Latency', 'Database Connection Pool Exhaustion')"
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              InputLabelProps={{ style: { color: 'var(--text-secondary)' } }}
              sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' } } }}
            />

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Paste anomaly logs, stack traces, or an architectural description below. The AI SRE will map out the exact metrics to track, generate the alert configuration, and draft an incident response runbook.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '350px' : '450px', transition: 'height 0.4s ease' }}>
              <Editor
                height="100%"
                language="plaintext"
                theme="vs-dark"
                value={logsInput}
                onChange={(value) => setLogsInput(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  padding: { top: 16 }
                }}
              />
            </Box>

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !logsInput}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CrisisAlertIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Synthesizing SRE Strategy...' : 'Generate Monitoring Rules'}
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

            {/* Incident Diagnosis */}
            {result.incident_diagnosis && (
              <Box className="glass-panel" sx={{ p: 3, borderLeft: '3px solid #f87171' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#f87171' }}>
                  <MonitorIcon fontSize="small"/> Incident Diagnosis
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {result.incident_diagnosis}
                </Typography>
              </Box>
            )}

            {/* Recommended Metrics */}
            {result.recommended_metrics && result.recommended_metrics.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                  <SsidChartIcon /> Recommended SLA/SLO Metrics
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {result.recommended_metrics.map((metric, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{metric}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Incident Response Plan / Runbook */}
            {result.incident_response_plan && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                  <LocalHospitalIcon /> SRE On-Call Runbook
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                  {result.incident_response_plan}
                </Typography>
              </Box>
            )}

            {/* Alert Config Preview */}
            {result.alert_rules && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon fontSize="small" /> Alert Configuration ({platform})
                  </Typography>
                </Box>
                <Editor
                  height="300px"
                  language={getEditorLanguage(platform)}
                  theme="vs-dark"
                  value={result.alert_rules}
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
