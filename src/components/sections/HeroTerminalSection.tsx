'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Container, useTheme, Grid, Paper } from '@mui/material';
import { Terminal as TerminalIcon, GitHub, LinkedIn, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Profile, Project, Skill } from '@/types/sanity';
import { usePortfolioTheme } from '@/components/providers/ThemeProvider';

interface HeroTerminalSectionProps {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
}

// Simulated terminal component without xterm dependency
function SimulatedTerminal({ profile, projects, skills }: HeroTerminalSectionProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [currentPath] = useState('/home/suman/portfolio');
  const [isAutoStarted, setIsAutoStarted] = useState(false);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  
  const theme = useTheme();
  const { mode } = usePortfolioTheme();
  const isDark = mode === 'dark';
  
  // Theme-aware terminal colors
  const terminalColors = {
    light: {
      background: '#F8F9FA',
      foreground: '#2C3E50',
      accent: '#27AE60',
      secondary: '#34495E',
      border: '#BDC3C7',
    },
    dark: {
      background: '#1D1F21',
      foreground: '#A8E6CF',
      accent: '#50fa7b',
      secondary: '#f1fa8c',
      border: '#373B41',
    },
  };

  const colors = terminalColors[isDark ? 'dark' : 'light'];

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [output]);

  // Auto-start terminal with welcome sequence
  useEffect(() => {
    if (!isAutoStarted) {
      const welcomeSequence = [
        '$ Welcome to Suman\'s Portfolio Terminal! 🚀',
        '$ Initializing developer environment...',
        '$ Loading portfolio data...',
        '$ Type "help" to see available commands.',
        '$ Try: whoami, skills, projects, contact',
        ''
      ];
      
      setOutput(welcomeSequence);
      setIsAutoStarted(true);
    }
  }, [isAutoStarted]);

  const commands: Record<string, () => string> = {
    help: () => `Available commands:
  help              - Show this help message
  whoami            - Display user information  
  skills [category] - Display skills by category
  projects          - Show all projects
  contact           - Display contact information
  about             - Show about information
  clear             - Clear terminal
  ls                - List portfolio sections
  pwd               - Show current directory
  git log           - Show project timeline
  easter-egg        - Find the hidden surprise
  theme             - Display portfolio color scheme`,

    whoami: () => `
╔════════════════════════════════════════╗
║            ${profile?.name || 'Suman Raj Sharma'}            ║
║      Full-Stack Developer & Tech       ║
║           Problem Solver               ║
╚════════════════════════════════════════╝

${profile?.shortBio || 'Passionate about building innovative digital experiences with modern technologies.'}

🌍 Location: Available for remote work
📅 Experience: Building modern web applications
🎯 Focus: React, Node.js, TypeScript, Cloud Architecture`,

    skills: () => {
      if (skills.length === 0) {
        return 'No skills found. Add skills in your Sanity CMS.';
      }
      const grouped = skills.reduce((acc, skill) => {
        const category = skill.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill.name);
        return acc;
      }, {} as Record<string, string[]>);

      return Object.entries(grouped)
        .map(([category, skillList]) => 
          `\\n${category}:\\n${skillList.map(skill => `  • ${skill}`).join('\\n')}`
        ).join('\\n');
    },

    projects: () => {
      if (projects.length === 0) {
        return 'No projects found. Add projects in your Sanity CMS.';
      }
      return projects.slice(0, 3).map((project, index) => `
${index + 1}. ${project.title}
   ${project.description}
   ${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''}
   ${project.demoUrl ? `Demo: ${project.demoUrl}` : ''}
`).join('\\n');
    },

    contact: () => `
📧 Email: ${profile?.socials?.email || 'contact@sumanrajsharma.dev'}
🔗 LinkedIn: ${profile?.socials?.linkedin || 'linkedin.com/in/sumanrajsharma'}
🐙 GitHub: ${profile?.socials?.github || 'github.com/sumanxcodes'}
🌐 Portfolio: https://sumanrajsharma.dev

Feel free to reach out for collaboration opportunities!`,

    about: () => `
${profile?.name || 'Suman Raj Sharma'}
${'='.repeat((profile?.name || 'Suman Raj Sharma').length)}

${profile?.shortBio || 'Passionate full-stack developer with expertise in modern web technologies.'}

I love building scalable applications, solving complex problems, and contributing to open-source projects.`,

    clear: () => {
      setOutput(['']);
      return '';
    },

    ls: () => `
Portfolio sections:
  about/            - Personal information and background
  skills/           - Technical skills and expertise  
  projects/         - Development projects and work
  contact/          - Contact information and social links`,

    pwd: () => currentPath,

    'git': () => `
commit a1b2c3d (HEAD -> main, origin/main)
Author: Suman Raj Sharma <contact@sumanrajsharma.dev>
Date: ${new Date().toDateString()}

    feat: Added interactive terminal to portfolio
    
    - Implemented creative developer experience
    - Created command-line interface for portfolio navigation
    - Added green-based design system

commit e4f5g6h  
Author: Suman Raj Sharma <contact@sumanrajsharma.dev>
Date: ${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString()}

    design: Complete portfolio redesign
    
    - Migrated to split-screen hero layout
    - Implemented smooth terminal integration`,

    'easter-egg': () => `
  ______ _    _ _   _   ______ ____  _    _ _   _ _____  
 |  ____| |  | | \\ | | |  ____/ __ \\| |  | | \\ | |  __ \\ 
 | |__  | |  | |  \\| | | |__ | |  | | |  | |  \\| | |  | |
 |  __| | |  | | . \` | |  __|| |  | | |  | | . \` | |  | |
 | |    | |__| | |\\  | | |   | |__| | |__| | |\\  | |__| |
 |_|     \\____/|_| \\_| |_|    \\____/ \\____/|_| \\_|_____/ 

🎉 Congratulations! You found the Easter egg! 
🥚 You're clearly someone who pays attention to details.
🚀 That's exactly the kind of person I'd love to work with!`,

    theme: () => `
Portfolio Color Scheme:
━━━━━━━━━━━━━━━━━━━━━━━━━

${isDark ? 'Dark Mode' : 'Light Mode'} Active:
Background: ${colors.background}
Text:       ${colors.foreground}  
Accent:     ${colors.accent}
Secondary:  ${colors.secondary}
Borders:    ${colors.border}

Typography:
Primary:    Inter, Crimson Pro
Secondary:  Plus Jakarta Sans
Monospace:  JetBrains Mono

Design Philosophy: Terminal-inspired green aesthetic.`,
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const [commandName, ...args] = trimmed.split(' ');
    const command = commands[commandName.toLowerCase()];

    const newOutput = [...output, `$ ${trimmed}`];
    
    if (command) {
      const result = command();
      if (result) {
        newOutput.push(result);
      }
    } else {
      newOutput.push(`Command not found: ${commandName}\\nType 'help' for available commands.`);
    }
    
    newOutput.push('');
    setOutput(newOutput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: colors.background,
        color: colors.foreground,
        border: `1px solid ${colors.border}`,
        borderRadius: 3,
        height: '500px',
        overflow: 'hidden',
        transition: 'all 0.15s ease',
        boxShadow: isDark 
          ? '0 12px 24px rgba(0, 0, 0, 0.4)' 
          : '0 12px 24px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Terminal Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          bgcolor: isDark ? '#2A2C2E' : '#E8E8E8',
          borderBottom: `1px solid ${colors.border}`,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Typography variant="body2" sx={{ 
          color: colors.foreground,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          fontWeight: 500,
        }}>
          sumanrajsharma — terminal — 80×24
        </Typography>
      </Box>

      {/* Terminal Content */}
      <Box
        ref={terminalContentRef}
        sx={{
          p: 3,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '14px',
          lineHeight: 1.4,
          height: 'calc(100% - 56px)',
          overflow: 'auto',
          bgcolor: colors.background,
          scrollBehavior: 'smooth',
        }}
      >
        <Box sx={{ mb: 2 }}>
          {output.map((line, index) => (
            <Box key={index} sx={{ whiteSpace: 'pre-wrap', color: line.startsWith('$') ? colors.accent : colors.foreground }}>
              {line}
            </Box>
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ color: colors.accent, mr: 1 }}>$</Box>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              background: 'transparent',
              border: 'none',
              color: colors.foreground,
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              flex: 1,
            }}
            placeholder="Type a command..."
          />
        </Box>
      </Box>
    </Paper>
  );
}

export function HeroTerminalSection({ profile, projects, skills }: HeroTerminalSectionProps) {
  const theme = useTheme();
  const { mode } = usePortfolioTheme();
  const isDark = mode === 'dark';

  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: 'background.default',
        color: 'text.primary',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Hero Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ pr: { md: 4 } }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                  }}
                >
                  PORTFOLIO
                </Typography>
                
                <Typography
                  variant="h1"
                  sx={{
                    mb: 3,
                    fontWeight: 700,
                    background: isDark 
                      ? 'linear-gradient(135deg, #FFFFFF 0%, #E8E8E8 100%)'
                      : 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {profile?.name || 'Suman Raj Sharma'}
                </Typography>
                
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    fontWeight: 300,
                  }}
                >
                  Full-Stack Developer & Creative Problem Solver
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    mb: 6,
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    maxWidth: '500px',
                  }}
                >
                  {profile?.shortBio || 'Building exceptional digital experiences with modern technologies. Passionate about creating innovative solutions and sharing knowledge through code.'}
                </Typography>
                
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    flexWrap: 'wrap',
                    mb: 4,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    href="#projects"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                    }}
                  >
                    View Projects
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    href="#contact"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                    }}
                  >
                    Get In Touch
                  </Button>
                </Box>

                {/* Quick Links */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1 }}>
                    Connect:
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<GitHub />}
                    href={profile?.socials?.github || 'https://github.com/sumanxcodes'}
                    target="_blank"
                    sx={{ minWidth: 'auto' }}
                  >
                    GitHub
                  </Button>
                  <Button
                    size="small"
                    startIcon={<LinkedIn />}
                    href={profile?.socials?.linkedin || 'https://linkedin.com/in/sumanrajsharma'}
                    target="_blank"
                    sx={{ minWidth: 'auto' }}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Email />}
                    href={`mailto:${profile?.socials?.email || 'contact@sumanrajsharma.dev'}`}
                    sx={{ minWidth: 'auto' }}
                  >
                    Email
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - Terminal */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box sx={{ pl: { md: 4 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontFamily: 'monospace',
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  <TerminalIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Interactive Terminal
                </Typography>
                
                <SimulatedTerminal
                  profile={profile}
                  projects={projects}
                  skills={skills}
                />
                
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    color: 'text.secondary',
                    fontFamily: 'monospace',
                    textAlign: 'center',
                  }}
                >
                  💡 Try commands: help, whoami, skills, projects, contact
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Box
          sx={{
            width: 1,
            height: 40,
            bgcolor: 'text.secondary',
            mx: 'auto',
            opacity: 0.6,
          }}
        />
      </motion.div>
    </Box>
  );
}