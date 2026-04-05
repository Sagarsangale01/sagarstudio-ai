import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, MenuItem, Tabs, Tab } from '@mui/material';
import Editor from '@monaco-editor/react';
import { apiGenerator } from '../services/api';
import { LANGUAGES, FRAMEWORKS, DATABASES } from '../utils/constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ApiIcon from '@mui/icons-material/Api';

export default function ApiGenerator() {
  const [description, setDescription] = useState('Create a RESTful API for a blog application with endpoints to create, read, update, and delete posts, as well as a user authentication system.');
  const [language, setLanguage] = useState('javascript');
  const [framework, setFramework] = useState('Express');
  const [database, setDatabase] = useState('MongoDB');

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await apiGenerator({ description, language, framework, database });
      setResult(res.data);
      setActiveTab(0);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to connect to AI server." });
    }
    setLoading(false);
  };

  const getActiveContent = () => {
    if (!result) return "";
    const keys = ["setup", "database_config", "models", "controllers", "routes", "auth"];
    return result[keys[activeTab]] || "// Content not provided";
  };

  const getEditorLanguage = () => {
    if (!result) return "javascript";
    const key = ["setup", "database_config", "models", "controllers", "routes", "auth"][activeTab];
    if (key === "setup" && typeof result[key] === "string" && result[key].includes("npm")) return "shell";
    return language.toLowerCase().includes("python") ? "python" : "javascript";
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={result ? 6 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, height: 'calc(100vh - 200px)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>API Architecture</Typography>

              <TextField select fullWidth label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} sx={{ mb: 2, mt: 2, '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}>
                {LANGUAGES.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </TextField>

              <TextField select fullWidth label="Framework" value={framework} onChange={(e) => setFramework(e.target.value)} sx={{ mb: 2, '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}>
                {FRAMEWORKS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </TextField>

              <TextField select fullWidth label="Database" value={database} onChange={(e) => setDatabase(e.target.value)} sx={{ mb: 2, '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}>
                {DATABASES.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </TextField>

              <TextField
                multiline rows={result ? 7 : 10} fullWidth variant="outlined" label="Description"
                value={description} onChange={(e) => setDescription(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' }, color: 'var(--text-primary)' } }}
              />
            </Box>

            <Box sx={{ mt: 'auto' }}>
              <Button
                variant="contained" fullWidth onClick={handleSubmit} disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                sx={{ bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5 }}
              >
                {loading ? 'Designing API...' : 'Generate API'}
              </Button>
            </Box>
          </Box>
        </Grid>

        {result && (
          <Grid item xs={12} lg={6} className="animate-fade-in">
            <Box className="glass-panel" sx={{ p: 0, height: 'calc(100vh - 200px)', minHeight: '400px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <ApiIcon sx={{ color: 'var(--primary-color)' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Generated Code</Typography>
              </Box>

              {result.error ? (
                <Box sx={{ p: 3 }}><Typography color="error">{result.error}</Typography></Box>
              ) : (
                <>
                  <Tabs
                    value={activeTab}
                    onChange={(_, v) => setActiveTab(v)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ borderBottom: '1px solid var(--glass-border)', '& .MuiTab-root': { textTransform: 'none', color: 'var(--text-secondary)' }, '& .Mui-selected': { color: 'var(--text-primary)' } }}
                  >
                    <Tab label="Setup/Init" />
                    <Tab label="Database" />
                    <Tab label="Models" />
                    <Tab label="Controllers" />
                    <Tab label="Routes" />
                    <Tab label="Auth" />
                  </Tabs>

                  <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#1e1e1e' }}>
                    <Editor
                      height="100%"
                      language={getEditorLanguage()}
                      theme="vs-dark"
                      value={typeof getActiveContent() === 'string' ? getActiveContent() : JSON.stringify(getActiveContent(), null, 2)}
                      options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
