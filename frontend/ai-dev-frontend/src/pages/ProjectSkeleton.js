import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, TextField, MenuItem } from '@mui/material';
import { projectSkeleton } from '../services/api';
import { LANGUAGES, FRAMEWORKS, PROJECT_TYPES } from '../utils/constants';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ExtensionIcon from '@mui/icons-material/Extension';
import TerminalIcon from '@mui/icons-material/Terminal';
import ArticleIcon from '@mui/icons-material/Article';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function ProjectSkeleton() {
  const [projectType, setProjectType] = useState('');
  const [language, setLanguage] = useState('');
  const [framework, setFramework] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!projectType || !language || !framework) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await projectSkeleton({ project_type: projectType, language, framework });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate project skeleton. Please check your connection." });
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
              <CreateNewFolderIcon /> Project Skeleton Generator
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 1 }}>
              Instantly generate boilerplate project structures with optimal folder organization, CI/CD setups, and configuration files.
            </Typography>

            <TextField
              select fullWidth variant="outlined" label="Project Type"
              value={projectType} onChange={(e) => setProjectType(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' }, color: 'var(--text-primary)' }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiSvgIcon-root': { color: 'var(--text-secondary)' } }}
            >
              {PROJECT_TYPES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </TextField>

            <TextField
              select fullWidth variant="outlined" label="Primary Language"
              value={language} onChange={(e) => setLanguage(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' }, color: 'var(--text-primary)' }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiSvgIcon-root': { color: 'var(--text-secondary)' } }}
            >
              {LANGUAGES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
            </TextField>

            <TextField
              fullWidth variant="outlined" label="Framework (e.g., Next.js, Django, Fiber)"
              value={framework} onChange={(e) => setFramework(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' }, color: 'var(--text-primary)' }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' } }}
            />

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !projectType || !language || !framework}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CreateNewFolderIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Generating Skeleton...' : 'Generate Project Skeleton'}
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

            {/* Folder Structure */}
            {result.folder_structure && result.folder_structure.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1, color: '#a78bfa' }}>
                  <FolderOpenIcon /> Optimized Folder Structure
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {result.folder_structure.map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 1.5, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 1, border: '1px solid var(--glass-border)' }}>
                      {item.type === 'folder' ? <FolderOpenIcon sx={{ color: '#fbbf24', mt: 0.5 }} /> : <InsertDriveFileIcon sx={{ color: '#94a3b8', mt: 0.5 }} />}
                      <Box>
                        <Typography sx={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'monospace' }}>
                          {item.path}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {/* Dependencies */}
              {result.dependencies && result.dependencies.length > 0 && (
                <Box className="glass-panel" sx={{ p: 3, flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#f472b6' }}>
                    <ExtensionIcon /> Core Dependencies
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    {result.dependencies.map((dep, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{dep}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}

              {/* Setup Commands */}
              {result.setup_commands && result.setup_commands.length > 0 && (
                <Box className="glass-panel" sx={{ p: 3, flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                    <TerminalIcon /> Initialization Commands
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {result.setup_commands.map((cmd, idx) => (
                      <Box key={idx} sx={{ p: 1.5, bgcolor: '#0f172a', borderRadius: 1, border: '1px solid #1e293b' }}>
                         <Typography variant="body2" sx={{ color: '#a78bfa', fontFamily: 'monospace' }}>$ {cmd}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            {/* CI/CD Pipeline */}
            {result.ci_cd_pipeline && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                  <IntegrationInstructionsIcon /> Basic CI/CD Pipeline (YAML)
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#0f172a', overflowX: 'auto', border: '1px solid #1e293b' }} elevation={0}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#cbd5e1', whiteSpace: 'pre' }}>
                    {result.ci_cd_pipeline}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* README Template */}
            {result.readme_template && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fcd34d' }}>
                  <ArticleIcon /> Base README.md
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#0f172a', overflowX: 'auto', border: '1px solid #1e293b' }} elevation={0}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#cbd5e1', whiteSpace: 'pre' }}>
                    {result.readme_template}
                  </Typography>
                </Paper>
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
