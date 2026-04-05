import { useState } from 'react';
import { Button, Box, Typography, CircularProgress, Grid, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import Editor from '@monaco-editor/react';
import { cloudCostOptimizer } from '../services/api';
import { CLOUD_PROVIDERS, CLOUD_COST_FOCUS_AREAS } from '../utils/constants';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PaidIcon from '@mui/icons-material/Paid';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export default function CloudCostOptimizer() {
  const [infrastructureInfo, setInfrastructureInfo] = useState('');
  const [cloudProvider, setCloudProvider] = useState('AWS');
  const [focusArea, setFocusArea] = useState('Compute Rightsizing');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!infrastructureInfo) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await cloudCostOptimizer({ infrastructure_info: infrastructureInfo, cloud_provider: cloudProvider, focus_area: focusArea });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to generate cost optimization. Please check your connection." });
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
                <SavingsIcon /> Cloud Cost Optimizer
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Provider</InputLabel>
                  <Select
                    value={cloudProvider}
                    label="Provider"
                    onChange={(e) => setCloudProvider(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {CLOUD_PROVIDERS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 190 }}>
                  <InputLabel sx={{ color: 'var(--text-secondary)' }}>Optimization Focus</InputLabel>
                  <Select
                    value={focusArea}
                    label="Optimization Focus"
                    onChange={(e) => setFocusArea(e.target.value)}
                    sx={{ color: 'white', '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--glass-border)' } }}
                  >
                    {CLOUD_COST_FOCUS_AREAS.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
              Provide a raw resource list, architectural diagram summary, or Terraform state snippet. Our elite FinOps AI will identify stranded assets, calculate rightsizing conversions, and draft a high-ROI architectural change.
            </Typography>

            <Box sx={{ border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden', height: result ? '350px' : '450px', transition: 'height 0.4s ease' }}>
              <Editor
                height="100%"
                language="json" // Assume usually JSON or YAML or plaintext
                theme="vs-dark"
                value={infrastructureInfo}
                onChange={(value) => setInfrastructureInfo(value)}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  padding: { top: 16 }
                }}
              />
            </Box>

            <Button
              variant="contained" fullWidth onClick={handleSubmit} disabled={loading || !infrastructureInfo}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PaidIcon />}
              sx={{ mt: 1, bgcolor: 'var(--primary-color)', '&:hover': { bgcolor: 'var(--primary-hover)' }, borderRadius: '8px', py: 1.5, fontWeight: 600, textTransform: 'none' }}
            >
              {loading ? 'Analyzing Billing Data...' : 'Audit Cloud Infrastructure'}
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

            {/* FinOps Executive Summary */}
            {result.cost_analysis_summary && (
              <Box className="glass-panel" sx={{ p: 3, borderLeft: '3px solid #34d399' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 1, color: '#34d399' }}>
                  <AccountBalanceWalletIcon fontSize="small"/> FinOps Executive Summary
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {result.cost_analysis_summary}
                </Typography>
              </Box>
            )}

            {/* Rightsizing Recommendations */}
            {result.rightsizing_recommendations && result.rightsizing_recommendations.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#60a5fa' }}>
                  <PriceCheckIcon /> Rightsizing Targets
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {result.rightsizing_recommendations.map((item, idx) => (
                    <Box key={idx} sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>{item.resource}</Typography>
                        <Chip label={item.estimated_savings} size="small" sx={{ bgcolor: 'rgba(52, 211, 153, 0.1)', color: '#34d399', fontWeight: 'bold' }} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                         <Typography variant="body2" sx={{ color: '#fca5a5' }}>{item.current_state}</Typography>
                         <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>→</Typography>
                         <Typography variant="body2" sx={{ color: '#60a5fa' }}>{item.recommended_state}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Unused / Orphaned Assets */}
            {result.unused_assets && result.unused_assets.length > 0 && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#f87171' }}>
                  <DeleteSweepIcon /> Orphaned & Wasted Assets
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {result.unused_assets.map((asset, idx) => (
                    <li key={idx}>
                      <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>{asset}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Architectural Changes */}
            {result.architectural_changes && (
              <Box className="glass-panel" sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1, color: '#c084fc' }}>
                  <AccountTreeIcon /> Suggested Architecture Scaling
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                  {result.architectural_changes}
                </Typography>
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
