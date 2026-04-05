import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Editor from '@monaco-editor/react';
import { versionControlAdvisor } from '../services/api';
import { GIT_PLATFORMS, GIT_TASK_TYPES } from '../utils/constants';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import MessageIcon from '@mui/icons-material/Message';
import TerminalIcon from '@mui/icons-material/Terminal';

export default function VersionControlAdvisor() {
  const [contextInput, setContextInput] = useState('');
  const [taskType, setTaskType] = useState('Resolve Merge Conflict');
  const [gitPlatform, setGitPlatform] = useState('GitHub');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!contextInput) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await versionControlAdvisor({ context: contextInput, task_type: taskType, git_platform: gitPlatform });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to get version control advice. Please check your connection." });
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
                <MergeTypeIcon /> Version Control Advisor
              </Typography>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Platform</InputLabel>
                  <Select
                    value={gitPlatform}
                    label="Platform"
                    onChange={(e) => setGitPlatform(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {GIT_PLATFORMS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Task Type</InputLabel>
                  <Select
                    value={taskType}
                    label="Task Type"
                    onChange={(e) => setTaskType(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {GIT_TASK_TYPES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Describe your current Git situation — your branch state, the conflict, workflow, or question. Our Git Specialist AI will generate an exact command sequence and strategy.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '350px' : '450px', transition: 'height 0.4s ease' }}>
              <Editor
                height="100%"
                language="plaintext"
                theme="vs-dark"
                value={contextInput}
                onChange={(value) => setContextInput(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  padding: { top: 16 }
                }}
              />
            </Box>

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !contextInput}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AccountTreeIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Generating Git Strategy...' : 'Get Git Advice'}
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

            {/* Strategy Overview */}
            {result.strategy_overview && (
              <Box className="glass-panel" sx={{ p: 3, borderLeft: '3px solid #818cf8' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#818cf8' }}>
                  <AccountTreeIcon fontSize="small" /> Strategy Overview
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {result.strategy_overview}
                </Typography>
              </Box>
            )}

            {/* Git Commands */}
            {result.git_commands && (
              <Box className="glass-panel" sx={{ p: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid var(--glass-border)', bgcolor: 'rgba(255,255,255,0.03)' }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TerminalIcon fontSize="small" /> Git Commands
                  </Typography>
                </Box>
                <Editor
                  height="200px"
                  language="shell"
                  theme="vs-dark"
                  value={result.git_commands}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    padding: { top: 12 }
                  }}
                />
              </Box>
            )}

            {/* Branching Conventions */}
            {result.branching_conventions && result.branching_conventions.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                  <MergeTypeIcon /> Branching Conventions
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {result.branching_conventions.map((conv, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{conv}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Commit Message Template */}
            {result.commit_message_template && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                  <MessageIcon fontSize="small" /> Commit Message Template
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.3)', borderRadius: 2, fontFamily: 'monospace', fontSize: '0.9rem', color: '#a5f3fc', whiteSpace: 'pre-wrap' }}>
                  {result.commit_message_template}
                </Box>
              </Box>
            )}

            {/* Warnings */}
            {result.warnings && result.warnings.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#fbbf24' }}>
                  <WarningAmberIcon /> Potential Risks
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                  {result.warnings.map((warn, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>{warn}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Raw Fallback */}
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
