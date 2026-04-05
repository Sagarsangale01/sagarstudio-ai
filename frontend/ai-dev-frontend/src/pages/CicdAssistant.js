import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Editor from '@monaco-editor/react';
import { cicdAssistant } from '../services/api';
import { CICD_PROVIDERS, CLOUD_PROVIDERS } from '../utils/constants';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CodeIcon from '@mui/icons-material/Code';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export default function CicdAssistant() {
  const [projectInfo, setProjectInfo] = useState('');
  const [cicdProvider, setCicdProvider] = useState('GitHub Actions');
  const [cloudProvider, setCloudProvider] = useState('AWS');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!projectInfo) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await cicdAssistant({ project_info: projectInfo, cicd_provider: cicdProvider, cloud_provider: cloudProvider });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate CI/CD pipeline. Please check your connection." });
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
                <SettingsIcon /> CI/CD Assistant
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>CI/CD Provider</InputLabel>
                  <Select
                    value={cicdProvider}
                    label="CI/CD Provider"
                    onChange={(e) => setCicdProvider(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {CICD_PROVIDERS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Cloud Target</InputLabel>
                  <Select
                    value={cloudProvider}
                    label="Cloud Target"
                    onChange={(e) => setCloudProvider(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {CLOUD_PROVIDERS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Describe your project stack (e.g., "React frontend, Django backend with PostgreSQL"). Our Principal DevOps AI will architect a robust pipeline and generate the exact YAML configuration needed.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '350px' : '450px', transition: 'height 0.4s ease' }}>
              <Editor
                height="100%"
                language="markdown"
                theme="vs-dark"
                value={projectInfo}
                onChange={(value) => setProjectInfo(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  padding: { top: 16 }
                }}
              />
            </Box>

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !projectInfo}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Architecting Pipeline...' : 'Generate CI/CD Pipeline'}
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

            {/* Pipeline Architecture overview */}
            {result.pipeline_architecture && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                  <AccountTreeIcon /> Pipeline Architecture
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-primary)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                  {result.pipeline_architecture}
                </Typography>
              </Box>
            )}

            {/* Required Secrets */}
            {result.required_secrets && result.required_secrets.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#f87171' }}>
                  <VpnKeyIcon /> Required Environment Secrets
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {result.required_secrets.map((secret, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{secret}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Deployment Strategy */}
                {result.deployment_strategy && (
                <Box className="glass-panel" sx={{ p: 3, flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#fbbf24' }}>
                    Deployment Strategy
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {result.deployment_strategy}
                    </Typography>
                </Box>
                )}

                {/* Rollback Plan */}
                {result.rollback_plan && (
                <Box className="glass-panel" sx={{ p: 3, flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#60a5fa' }}>
                    Rollback Plan
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {result.rollback_plan}
                    </Typography>
                </Box>
                )}
            </Box>

            {/* YAML Config Preview */}
            {result.yaml_config && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CodeIcon fontSize="small" /> YAML Configuration
                  </Typography>
                </Box>
                <Editor
                  height="400px"
                  language="yaml"
                  theme="vs-dark"
                  value={result.yaml_config}
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
