'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Button, Paper, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Terminal, Code, PlayArrow } from '@mui/icons-material';
import { PortfolioTerminal } from '@/components/terminal/PortfolioTerminal';
import { Profile, Project, Skill } from '@/types/sanity';
import { usePortfolioTheme } from '@/components/providers/ThemeProvider';

interface TerminalSectionProps {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
}

export function TerminalSection({ profile, projects, skills }: TerminalSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  
  const theme = useTheme();
  const { mode } = usePortfolioTheme();
  const isDark = mode === 'dark';

  // Theme-aware colors
  const terminalColors = {
    light: {
      background: '#F8F9FA',
      foreground: '#2C3E50',
      accent: '#27AE60',
      secondary: '#34495E',
      border: '#BDC3C7',
      cardBg: '#FFFFFF',
      pattern: '#E8E8E8',
    },
    dark: {
      background: '#1D1F21',
      foreground: '#A8E6CF',
      accent: '#50fa7b',
      secondary: '#f1fa8c',
      border: '#373B41',
      cardBg: '#2A2C2E',
      pattern: '#333333',
    },
  };

  const colors = terminalColors[isDark ? 'dark' : 'light'];

  const handleOpenTerminal = () => {
    setTerminalOpen(true);
    setTerminalMinimized(false);
  };

  const handleCloseTerminal = () => {
    setTerminalOpen(false);
    setTerminalMinimized(false);
  };

  const handleToggleMinimize = () => {
    setTerminalMinimized(!terminalMinimized);
  };

  const terminalCommands = [
    'whoami',
    'ls',
    'skills frontend',
    'projects',
    'contact',
    'git log',
    'easter-egg',
  ];

  return (
    <>
      <Box
        id="terminal"
        ref={ref}
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: colors.background,
          color: colors.foreground,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.15s ease',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: isDark ? 0.05 : 0.03,
            backgroundImage: `
              linear-gradient(90deg, ${colors.pattern} 1px, transparent 1px),
              linear-gradient(${colors.pattern} 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            transition: 'opacity 0.15s ease',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 2,
                  color: colors.accent,
                  fontWeight: 500,
                  fontFamily: 'monospace',
                }}
              >
                INTERACTIVE EXPERIENCE
              </Typography>
              
              <Typography
                variant="h2"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  fontFamily: 'monospace',
                  color: colors.foreground,
                }}
              >
                Developer Terminal
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: colors.secondary,
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 6,
                  lineHeight: 1.7,
                }}
              >
                Experience my portfolio the developer way! Use command-line interface
                to explore my skills, projects, and experience. Type commands like a pro
                and discover hidden Easter eggs.
              </Typography>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Terminal />}
                  onClick={handleOpenTerminal}
                  sx={{
                    bgcolor: colors.accent,
                    color: isDark ? '#000000' : '#FFFFFF',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontFamily: 'monospace',
                    border: `2px solid ${colors.accent}`,
                    '&:hover': {
                      bgcolor: isDark ? '#45e66d' : '#219a52',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 25px ${colors.accent}25`,
                    },
                  }}
                >
                  Launch Terminal
                </Button>
              </motion.div>
            </Box>

            {/* Features Grid */}
            <Box sx={{ mt: 8 }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  textAlign: 'center',
                  fontWeight: 600,
                  color: colors.secondary,
                }}
              >
                What you can do:
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                  gap: 3,
                  mb: 6,
                }}
              >
                {[
                  {
                    icon: <Code />,
                    title: 'Navigate Portfolio',
                    description: 'Use ls, cd, and pwd commands to explore different sections',
                    command: 'ls',
                  },
                  {
                    icon: <Terminal />,
                    title: 'View Skills',
                    description: 'Check out technical skills organized by categories',
                    command: 'skills frontend',
                  },
                  {
                    icon: <PlayArrow />,
                    title: 'Discover Projects',
                    description: 'Browse through development projects and their details',
                    command: 'projects',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                        color: colors.foreground,
                        textAlign: 'center',
                        height: '100%',
                        borderRadius: 2,
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          borderColor: colors.accent,
                          transform: 'translateY(-4px)',
                          boxShadow: `0 8px 25px ${colors.accent}15`,
                        },
                      }}
                    >
                      <Box sx={{ color: colors.accent, mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: colors.foreground }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.secondary, mb: 2 }}>
                        {feature.description}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: colors.background,
                          p: 1,
                          borderRadius: 1,
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          color: colors.accent,
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        $ {feature.command}
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </Box>

              {/* Command Examples */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Paper
                  sx={{
                    p: 4,
                    bgcolor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      color: colors.secondary,
                      fontFamily: 'monospace',
                      fontWeight: 600,
                    }}
                  >
                    💡 Try these commands:
                  </Typography>
                  
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                      gap: 2,
                    }}
                  >
                    {terminalCommands.map((command, index) => (
                      <Box
                        key={command}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                        }}
                      >
                        <Box sx={{ color: colors.accent, mr: 1 }}>$</Box>
                        <Box sx={{ color: colors.foreground }}>{command}</Box>
                      </Box>
                    ))}
                  </Box>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 3,
                      color: colors.secondary,
                      fontStyle: 'italic',
                    }}
                  >
                    💎 Pro tip: Type "help" in the terminal for a complete list of available commands!
                  </Typography>
                </Paper>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Terminal Modal */}
      {terminalOpen && (
        <PortfolioTerminal
          profile={profile}
          projects={projects}
          skills={skills}
          onClose={handleCloseTerminal}
          minimized={terminalMinimized}
          onToggleMinimize={handleToggleMinimize}
        />
      )}
    </>
  );
}