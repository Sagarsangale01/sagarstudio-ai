import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Paper, TextField, MenuItem, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import Editor from '@monaco-editor/react';
import { apiGenerator } from '../services/api';
import { LANGUAGES, FRAMEWORKS, DATABASES } from '../utils/constants';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TerminalIcon from '@mui/icons-material/Terminal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CodeIcon from '@mui/icons-material/Code';

export default function NewTechGuide() {
  const [goal, setGoal] = useState('Create a simple REST API with a database CRUD');
  const [targetLang, setTargetLang] = useState('Go');
  const [targetFramework, setTargetFramework] = useState('Gin');
  const [targetDb, setTargetDb] = useState('None');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('steps'); // 'steps' or 'full-code'

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      // Reusing the onboarding endpoint
      const response = await fetch('http://localhost:8000/api/tech-onboarding/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal,
          language: targetLang,
          framework: targetFramework,
          database: targetDb
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate guide." });
    }
    setLoading(false);
  };

  const getSteps = () => {
    if (!result || !result.steps) return [];
    return result.steps;
  };

  return (
    <Box className="animate-fade-in" sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} lg={result ? 5 : 12} sx={{ transition: 'all 0.4s ease' }}>
          <Box className="glass-panel" sx={{ p: 3, height: 'calc(100vh - 200px)', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
              <HelpOutlineIcon /> Tech Onboarding
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 3 }}>
              Switching from JS to something new? Tell us what you want to build.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                select fullWidth label="Target Language" value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
              >
                {LANGUAGES.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
              </TextField>
              <TextField
                select fullWidth label="Framework" value={targetFramework}
                onChange={(e) => setTargetFramework(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
              >
                {FRAMEWORKS.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
              </TextField>
            </Box>

            <TextField
              select fullWidth label="Target Database" value={targetDb}
              onChange={(e) => setTargetDb(e.target.value)}
              sx={{ mb: 2, '& .MuiOutlinedInput-root fieldset': { borderColor: 'var(--glass-border)' } }}
            >
              {DATABASES.map((db) => <MenuItem key={db} value={db}>{db}</MenuItem>)}
            </TextField>

            <TextField
              multiline rows={8} fullWidth variant="outlined" label="What do you want to build?"
              value={goal} onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. I want to build a high-performance microservice for image processing..."
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--glass-border)' }, color: 'var(--text-primary)' } }}
            />

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <TerminalIcon />}
              sx={{ mt: 'auto', bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600 }}
            >
              {loading ? 'Consulting Senior Architects...' : 'Generate Learning Path'}
            </Button>
          </Box>
        </Grid>

        {/* Learning Path Section */}
        {result && (
          <Grid item xs={12} lg={7} className="animate-fade-in">
            <Box className="glass-panel" sx={{ p: 3, height: 'calc(100vh - 200px)', minHeight: '400px', overflowY: 'auto' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoAwesomeIcon /> Your Implementation Path
                </Typography>

                {result.complete_project_code && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      variant={activeTab === 'steps' ? "contained" : "outlined"}
                      onClick={() => setActiveTab('steps')}
                      startIcon={<AssignmentIcon />}
                      sx={{ textTransform: 'none', borderRadius: '20px' }}
                    >
                      Steps
                    </Button>
                    <Button
                      size="small"
                      variant={activeTab === 'full-code' ? "contained" : "outlined"}
                      onClick={() => setActiveTab('full-code')}
                      startIcon={<CodeIcon />}
                      sx={{ textTransform: 'none', borderRadius: '20px' }}
                    >
                      Full Code
                    </Button>
                  </Box>
                )}
              </Box>

              {activeTab === 'steps' ? (
                <Stepper orientation="vertical" sx={{ '& .MuiStepLabel-label': { color: 'white' }, '& .MuiStepIcon-root.Mui-active': { color: 'var(--primary-color)' } }}>
                  {getSteps().map((step, index) => (
                    <Step key={index} active={true}>
                      <StepLabel>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{step.title}</Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)', mb: 2 }}>{step.description}</Typography>
                        {step.code && (
                          <Paper sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', overflow: 'auto' }}>
                            <Editor
                              height="200px"
                              language={targetLang.toLowerCase()}
                              theme="vs-dark"
                              value={step.code}
                              options={{ readOnly: true, minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
                            />
                          </Paper>
                        )}
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              ) : (
                <Box sx={{ height: 'calc(100% - 60px)' }}>
                  <Editor
                    height="100%"
                    language={targetLang.toLowerCase()}
                    theme="vs-dark"
                    value={result.complete_project_code}
                    options={{ readOnly: true, minimap: { enabled: true }, fontSize: 14 }}
                  />
                </Box>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
