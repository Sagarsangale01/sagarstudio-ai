import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import Editor from '@monaco-editor/react';
import { securityAdvisor } from '../services/api';
import { LANGUAGES } from '../utils/constants';
import SecurityIcon from '@mui/icons-material/Security';
import BugReportIcon from '@mui/icons-material/BugReport';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CodeIcon from '@mui/icons-material/Code';

export default function SecurityAdvisor() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [framework, setFramework] = useState('None');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await securityAdvisor({ code, language, framework });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to run security analysis. Please check your connection." });
    }
    setLoading(false);
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'high': return '#fca5a5';
      case 'medium': return '#fcd34d';
      case 'low': return '#86efac';
      case 'secure': return '#34d399';
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
                <SecurityIcon /> Security Advisor
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
            
            <TextField
              size="small"
              fullWidth
              label="Application Framework (e.g., Express, Django, Spring)"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              InputLabelProps={{ style: { color: 'var(--text-secondary)' } }}
              sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' } } }}
            />

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Paste your application code below. Our DevSecOps AI will analyze it for OWASP Top 10 vulnerabilities, insecure patterns, and suggest hardened patches.
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
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <HealthAndSafetyIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Scanning...' : 'Scan for Vulnerabilities'}
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

            {/* Overall Risk */}
            {result.overall_risk && (
              <Box className="glass-panel" sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, color: 'var(--text-primary)' }}>
                  <SecurityIcon /> Overall Risk Level
                </Typography>
                <Chip 
                  label={result.overall_risk.toUpperCase()} 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: getRiskColor(result.overall_risk), 
                    fontWeight: 700, 
                    fontSize: '1rem', 
                    px: 1, 
                    border: `1px solid ${getRiskColor(result.overall_risk)}`
                  }} 
                />
              </Box>
            )}

            {/* Vulnerabilities */}
            {result.vulnerabilities && result.vulnerabilities.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#f87171' }}>
                  <BugReportIcon /> Vulnerabilities Detected
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {result.vulnerabilities.map((vuln, idx) => (
                    <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, borderLeft: `3px solid ${getRiskColor(vuln.severity)}` }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>{vuln.issue}</Typography>
                        <Chip label={vuln.severity} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: getRiskColor(vuln.severity), fontSize: '0.7rem' }} />
                      </Box>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                        <WarningAmberIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5, color: '#fb923c' }} />
                        Location: {vuln.line_or_area}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Remediation Steps */}
            {result.remediation_steps && result.remediation_steps.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                  <HealthAndSafetyIcon /> Remediation Steps
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {result.remediation_steps.map((step, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{step}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Secure Code Preview */}
            {result.secure_code && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon fontSize="small" /> Secured Code
                  </Typography>
                </Box>
                <Editor
                  height="350px"
                  language={language}
                  theme="vs-dark"
                  value={result.secure_code}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
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
