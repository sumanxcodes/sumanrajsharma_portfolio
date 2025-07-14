'use client';

import React, { useState } from 'react';
import { Box, Typography, Container, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Terminal, Code, PlayArrow } from '@mui/icons-material';
import { PortfolioTerminal } from '@/components/terminal/PortfolioTerminal';
import { Profile, Project, Skill } from '@/types/sanity';

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
          bgcolor: '#000000',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
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
            opacity: 0.05,
            backgroundImage: `
              linear-gradient(90deg, #333333 1px, transparent 1px),
              linear-gradient(#333333 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
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
                  color: '#50fa7b',
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
                }}
              >
                Portfolio Terminal
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#f8f8f2',
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
                    bgcolor: '#50fa7b',
                    color: '#000000',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontFamily: 'monospace',
                    '&:hover': {
                      bgcolor: '#45e66d',
                      transform: 'translateY(-2px)',
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
                  color: '#bd93f9',
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
                        bgcolor: '#1a1a1a',
                        border: '1px solid #333333',
                        color: '#ffffff',
                        textAlign: 'center',
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#50fa7b',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Box sx={{ color: '#50fa7b', mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#f8f8f2', mb: 2 }}>
                        {feature.description}
                      </Typography>
                      <Box
                        sx={{
                          bgcolor: '#000000',
                          p: 1,
                          borderRadius: 1,
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          color: '#50fa7b',
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
                    bgcolor: '#0d1117',
                    border: '1px solid #333333',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 3,
                      color: '#f1fa8c',
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
                        <Box sx={{ color: '#50fa7b', mr: 1 }}>$</Box>
                        <Box sx={{ color: '#f8f8f2' }}>{command}</Box>
                      </Box>
                    ))}
                  </Box>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 3,
                      color: '#8be9fd',
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