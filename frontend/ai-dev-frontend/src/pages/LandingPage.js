import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, Avatar, Container, keyframes } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import StorageIcon from '@mui/icons-material/Storage';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudIcon from '@mui/icons-material/Cloud';
import DashboardIcon from '@mui/icons-material/Dashboard';

// --- INDUSTRIAL ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const phraseSlideUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); filter: blur(5px); }
  10% { opacity: 1; transform: translateY(0); filter: blur(0); }
  90% { opacity: 1; transform: translateY(0); filter: blur(0); }
  100% { opacity: 0; transform: translateY(-20px); filter: blur(5px); }
`;

const categories = [
  { title: 'Core Planning', desc: 'Requirement analysis, architecture advising, and project scaffolding.', icon: <DashboardIcon />, color: '#818cf8', modules: ['Requirement Analyzer', 'Architecture Advisor', 'Project Skeleton'], trend: '+15% Efficiency' },
  { title: 'Development', desc: 'AI-driven code completion, refactoring assistant, and code converter.', icon: <CodeIcon />, color: '#6366f1', modules: ['Smart Code Completion', 'Refactoring Assistant', 'Code Converter'], trend: 'Beta: v2.4' },
  { title: 'Reliability & QA', desc: 'Intelligent bug fixing, error analysis, and performance optimization.', icon: <BugReportIcon />, color: '#fca5a5', modules: ['Bug Fixer', 'Error Analyzer', 'Security Advisor'], trend: 'SOC-2 Ready' },
  { title: 'Data Systems', desc: 'SQL query generation, API scaffolding, and data transformation.', icon: <StorageIcon />, color: '#34d399', modules: ['SQL Generator', 'API Generator', 'Data Transformer'], trend: 'New Node.js Hub' },
  { title: 'Documentation', desc: 'Code explanations, tech documentation, and version control advisor.', icon: <DescriptionIcon />, color: '#fb923c', modules: ['Code Explainer', 'Docs Assistant', 'VC Advisor'], trend: 'Doc-Link Sync' },
  { title: 'Infrastructure', desc: 'CI/CD pipeline generation and monitoring configuration.', icon: <CloudIcon />, color: '#22d3ee', modules: ['CI/CD Assistant', 'Monitoring & Alerts'], trend: 'AWS Enabled' }
];

const phrases = ["Build 2.5x Faster.", "Fix Bugs Smarter.", "Scale Engineering Hub.", "Deploy with Confidence."];

export default function LandingPage({ onModuleSelect }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % phrases.length);
      setKey(prev => prev + 1);
    }, 4500); // Increased duration to allow for longer "stuck" time in the middle of animation
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ animation: `${fadeIn} 0.8s ease-out`, pb: 12, overflowX: 'hidden', width: '100%' }}>

      {/* --- HERO SECTION --- */}
      <Box sx={{
        pt: 18, pb: 15,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background glow */}
        <Box sx={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: '80%', height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1, pointerEvents: 'none'
        }} />

        <Avatar
          src="/sagar.png"
          sx={{
            width: 140, height: 140, mb: 5,
            border: '2px solid var(--primary-color)',
            boxShadow: '0 0 30px rgba(99,102,241,0.3)',
            background: 'rgba(255,255,255,0.05)'
          }}
        />

        <Typography variant="h1" sx={{
          fontWeight: 900,
          fontSize: { xs: '2.8rem', sm: '4.5rem', md: '6.5rem' },
          mb: 1,
          px: 2,
          letterSpacing: '-4px',
          lineHeight: 1,
          background: 'linear-gradient(to bottom, #ffffff 30%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          SagarSense<span style={{ color: 'var(--primary-color)' }}>.AI</span>
        </Typography>

        <Typography
          key={key}
          variant="h4"
          sx={{
            color: 'var(--text-secondary)',
            fontWeight: 400,
            mb: 8,
            px: 4,
            fontSize: { xs: '1.2rem', md: '2.1rem' },
            letterSpacing: '1px',
            fontStyle: 'italic',
            maxWidth: '800px',
            animation: `${phraseSlideUp} 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            display: 'block'
          }}
        >
          {phrases[phraseIndex]}
        </Typography>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            variant="contained" size="large"
            onClick={() => onModuleSelect('Requirement Analyzer')}
            sx={{
              bgcolor: 'var(--primary-color)', px: 6, py: 2.2, borderRadius: '12px',
              fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 20px rgba(99,102,241,0.2)',
              '&:hover': {
                bgcolor: 'var(--primary-hover)',
                transform: 'translateY(-3px)',
                boxShadow: '0 15px 30px rgba(99,102,241,0.3)'
              }
            }}
          >
            Launch Hub
          </Button>
          <Button
            variant="outlined" size="large"
            sx={{
              color: 'white',
              borderColor: 'var(--glass-border)',
              px: 5, py: 2.2,
              borderRadius: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                borderColor: 'white',
                background: 'rgba(255,255,255,0.05)',
                transform: 'translateY(-3px)'
              }
            }}
          >
            Documentation
          </Button>
        </Box>
      </Box>

      {/* --- STATS SECTION --- */}
      <Box sx={{ mb: 25, px: { xs: 2, sm: 4, md: 10, lg: 15 } }}>
        <Grid container spacing={0} sx={{
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
        }}>
          {[
            { label: 'Engineering Modules', value: '28+' },
            { label: 'Active LLM Engines', value: '5+' },
            { label: 'Developer Velocity', value: '2.5x' },
            { label: 'Global Availability', value: '99.9%' }
          ].map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box sx={{
                p: { xs: 4, md: 6 }, textAlign: 'center',
                borderRight: { md: i < 3 ? '1px solid var(--glass-border)' : 'none' },
                borderBottom: { xs: i < 3 ? '1px solid var(--glass-border)' : 'none', md: 'none' },
                transition: 'all 0.3s ease',
                '&:hover': { background: 'rgba(255,255,255,0.03)' }
              }}>
                <Typography variant="h2" sx={{
                  fontWeight: 900,
                  color: i === 2 ? 'var(--primary-color)' : 'white',
                  mb: 1,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}>{s.value}</Typography>
                <Typography variant="overline" sx={{
                  color: 'var(--text-secondary)',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  display: 'block'
                }}>{s.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* --- NARRATIVE SECTION (UNIFIED CONTEXT) --- */}
      <Box sx={{ mb: 30, px: { xs: 3, sm: 5, md: 10, lg: 15 }, position: 'relative' }}>
        {/* Background Visualizer Element */}
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '100%', height: '80%', zIndex: -1,
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.03) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <Grid container spacing={{ xs: 8, md: 12 }} alignItems="center">
          <Grid item xs={12} md={6} width={'50%'}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="overline" sx={{ color: 'var(--primary-color)', fontWeight: 900, letterSpacing: '4px' }}>CORE PHILOSOPHY</Typography>
            </Box>
            <Typography variant="h2" sx={{
              fontWeight: 900, mb: 4, letterSpacing: '-2.5px', lineHeight: 1.05,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              background: 'linear-gradient(135deg, #ffffff 40%, #64748b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Unified Context. <br /> Total Reliability.
            </Typography>

            <Typography variant="body1" sx={{ color: 'var(--text-secondary)', lineHeight: 2.1, fontSize: { xs: '1rem', md: '1.25rem' }, mb: 8, maxWidth: '580px' }}>
              SagarSense.AI isn't just another chat interface. It is a <span style={{ color: 'white', fontWeight: 600 }}>vertically integrated engineering workspace</span> that synchronizes neural states across 28+ specialized modules.
            </Typography>

            <Grid container spacing={3}>
              {[
                { val: 'Zero', label: 'Config Overhead', color: 'var(--primary-color)' },
                { val: '100%', label: 'Data Integrity', color: '#fff' }
              ].map((stat, idx) => (
                <Grid item xs={12} sm={6} key={stat.label}>
                  <Box sx={{
                    p: 3, px: 4,
                    height: '100%',
                    borderRadius: '24px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(255,255,255,0.01)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { transform: 'translateY(-5px)', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.03)' }
                  }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: stat.color, mb: 0.5, fontSize: { xs: '2.2rem', md: '2.5rem' } }}>{stat.val}</Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.8 }}>{stat.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} width={'40%'}>
            <Box sx={{
              p: 1.5, background: 'linear-gradient(145deg, #020617, #0f172a)', borderRadius: '32px',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 50px 120px rgba(0,0,0,0.7)',
              position: 'relative',
              '&::after': {
                content: '""', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: '32px', border: '1px solid rgba(99,102,241,0.1)', pointerEvents: 'none'
              }
            }}>
              <Box sx={{
                position: 'absolute', top: -15, right: 30,
                bgcolor: 'var(--primary-color)', color: 'white',
                px: 2.5, py: 1, borderRadius: '10px',
                fontWeight: 900, fontSize: '0.75rem', letterSpacing: '1px',
                boxShadow: '0 10px 20px rgba(99,102,241,0.4)',
                zIndex: 10
              }}>
                NEURAL SYNC ACTIVE
              </Box>

              <Box sx={{ display: 'flex', gap: 1.2, p: 3, borderBottom: '1px solid var(--glass-border)', alignItems: 'center' }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
                <Typography sx={{ ml: 'auto', fontSize: '0.7rem', color: '#475569', fontWeight: 700, letterSpacing: '1px' }}>WORKSPACE: SAGARSENSE_AI</Typography>
              </Box>

              <Box sx={{ p: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: '1.05rem', color: '#94a3b8', lineHeight: 2.2 }}>
                <Typography component="div" sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <span style={{ color: '#6366f1' }}>$</span>
                  <span>sagarsense boot --signature-premium</span>
                </Typography>
                <code style={{ color: '#4ade80', display: 'block' }}>[SYS] Initializing context engine... Success</code>
                <code style={{ color: '#475569', display: 'block' }}>[SYS] Loading 28 specialized engineering nodes...</code>
                <code style={{ color: '#475569', display: 'block' }}>[SYS] Mapping requirement neural states... Done</code>
                <Typography component="div" sx={{ display: 'flex', gap: 2, mt: 3, alignItems: 'center' }}>
                  <Box sx={{ width: 8, height: 16, bgcolor: 'var(--primary-color)', animation: 'pulse 1s infinite alternate' }} />
                  <span style={{ color: '#fff', fontWeight: 600 }}>Accelerating your engineering vision...</span>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* --- MODULE GRID (THE HUB) --- */}
      <Box sx={{ px: { xs: 2, md: 12 }, mb: 20 }}>
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography variant="overline" sx={{ color: 'var(--primary-color)', fontWeight: 900, letterSpacing: '4px', opacity: 0.8 }}>SYNERGY ECOSYSTEM</Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, mb: 2, letterSpacing: '-2px' }}>Engineering Hub</Typography>
          <Typography variant="h6" sx={{ color: 'var(--text-secondary)', fontWeight: 400, maxWidth: '600px', mx: 'auto', opacity: 0.7 }}>
            Vertically integrated agents for modern software life-cycles.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {categories.map((cat, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Paper sx={{
                p: 0, height: '100%', display: 'flex', flexDirection: 'column',
                background: 'rgba(255,255,255,0.01)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '32px',
                overflow: 'hidden',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                '&:hover': {
                  borderColor: `${cat.color}60`,
                  background: 'rgba(255,255,255,0.03)',
                  transform: 'translateY(-12px)',
                  boxShadow: `0 30px 60px ${cat.color}10`
                }
              }}>
                <Box sx={{ p: 5, pb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                    <Avatar sx={{
                      bgcolor: `${cat.color}15`,
                      color: cat.color,
                      width: 52, height: 52,
                      border: `1px solid ${cat.color}30`,
                    }}>{cat.icon}</Avatar>
                    <Typography variant="caption" sx={{
                      color: cat.color,
                      fontWeight: 800,
                      px: 1.5, py: 0.5,
                      borderRadius: '100px',
                      background: `${cat.color}10`,
                      border: `1px solid ${cat.color}20`
                    }}>
                      {cat.trend}
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.5px' }}>{cat.title}</Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text-secondary)', mb: 4, lineHeight: 1.8, fontSize: '0.95rem' }}>{cat.desc}</Typography>
                </Box>

                <Box sx={{
                  mt: 'auto', p: 4, pt: 0,
                  display: 'flex', flexWrap: 'wrap', gap: 1.2,
                  zIndex: 1
                }}>
                  {cat.modules.map((m, j) => (
                    <Box key={j} onClick={() => onModuleSelect(m)} sx={{
                      px: 2, py: 1, borderRadius: '12px', bgcolor: 'rgba(0,0,0,0.2)',
                      fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', cursor: 'pointer', border: '1px solid var(--glass-border)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'white',
                        color: 'white',
                        background: 'rgba(255,255,255,0.05)',
                        transform: 'scale(1.05)'
                      }
                    }}>
                      {m}
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* --- FOOTER (SIGNATURE) --- */}
      <Box sx={{ mt: 20, textAlign: 'center', pt: 8, borderTop: '1px solid var(--glass-border)' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: 'white' }}>SagarSense.AI Signature Ecosystem</Typography>
        <Typography variant="caption" sx={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Architected & Managed by Sagar Sangale · v2.0.4 Premium</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4, opacity: 0.4 }}>
          {['Gemini 1.5 Pro', 'Claude 3.5 Sonnet', 'GPT-4o', 'Llama 3'].map(t => <Typography key={t} sx={{ fontSize: '0.65rem', fontWeight: 700 }}>{t}</Typography>)}
        </Box>
      </Box>
    </Box>
  );
}
