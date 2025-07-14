'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Box, Typography, Container, Button, Paper, CircularProgress, useTheme } from '@mui/material';
import { Terminal as TerminalIcon, Code, PlayArrow } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Profile, Project, Skill } from '@/types/sanity';
import { usePortfolioTheme } from '@/components/providers/ThemeProvider';

interface ClientTerminalProps {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
}

// Simulated terminal component without xterm dependency
function SimulatedTerminal({ profile, projects, skills, onClose }: ClientTerminalProps & { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    '$ Welcome to Suman\'s Portfolio Terminal! 🚀',
    '$ Type "help" to see available commands.',
    '$ Try: whoami, skills, projects, contact, easter-egg',
    ''
  ]);
  const [currentPath] = useState('/home/suman/portfolio');
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
          `\n${category}:\n${skillList.map(skill => `  • ${skill}`).join('\n')}`
        ).join('\n');
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
`).join('\n');
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
    - Added monochrome design system

commit e4f5g6h  
Author: Suman Raj Sharma <contact@sumanrajsharma.dev>
Date: ${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString()}

    design: Complete portfolio redesign
    
    - Migrated to single-page layout
    - Implemented smooth scrolling navigation`,

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

Background: #FFFFFF (Pure White)
Text:       #000000 (Pure Black)  
Secondary:  #666666 (Medium Gray)
Accent:     #333333 (Dark Gray)
Borders:    #E5E5E5 (Light Gray)

Typography:
Primary:    Inter, Crimson Pro
Secondary:  Plus Jakarta Sans
Monospace:  JetBrains Mono

Design Philosophy: Minimalist monochrome aesthetic.`,
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
      newOutput.push(`Command not found: ${commandName}\nType 'help' for available commands.`);
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

  // macOS-style colors for traffic lights
  const macOSColors = {
    red: '#FF5F57',
    yellow: '#FFBD2E',
    green: '#28CA42',
    redHover: '#FF4A47',
    yellowHover: '#FFB01E',
    greenHover: '#1FB832',
  };

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: colors.background,
        color: colors.foreground,
        border: `1px solid ${colors.border}`,
        borderRadius: 3,
        maxHeight: '500px',
        overflow: 'hidden',
        transition: 'all 0.15s ease',
        boxShadow: isDark 
          ? '0 12px 24px rgba(0, 0, 0, 0.4)' 
          : '0 12px 24px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Terminal Header with Traffic Lights */}
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
          background: isDark 
            ? 'linear-gradient(180deg, #2A2C2E 0%, #25272A 100%)'
            : 'linear-gradient(180deg, #F0F0F0 0%, #E8E8E8 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
            {/* Close Button */}
            <Box
              onClick={onClose}
              sx={{
                width: 13,
                height: 13,
                borderRadius: '50%',
                bgcolor: macOSColors.red,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
                color: 'transparent',
                position: 'relative',
                transition: 'all 0.1s ease',
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)`,
                '&:hover': {
                  bgcolor: macOSColors.redHover,
                  color: '#8B1F1F',
                  transform: 'scale(1.05)',
                  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)`,
                },
              }}
            >
              ×
            </Box>
            
            {/* Minimize Button */}
            <Box
              sx={{
                width: 13,
                height: 13,
                borderRadius: '50%',
                bgcolor: macOSColors.yellow,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
                color: 'transparent',
                position: 'relative',
                transition: 'all 0.1s ease',
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)`,
                '&:hover': {
                  bgcolor: macOSColors.yellowHover,
                  color: '#8B6F00',
                  transform: 'scale(1.05)',
                  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)`,
                },
              }}
            >
              −
            </Box>
            
            {/* Maximize Button */}
            <Box
              sx={{
                width: 13,
                height: 13,
                borderRadius: '50%',
                bgcolor: macOSColors.green,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8px',
                fontWeight: 'bold',
                color: 'transparent',
                position: 'relative',
                transition: 'all 0.1s ease',
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)`,
                '&:hover': {
                  bgcolor: macOSColors.greenHover,
                  color: '#1B5E20',
                  transform: 'scale(1.05)',
                  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)`,
                },
              }}
            >
              ⬢
            </Box>
          </Box>
          
          <Typography variant="body2" sx={{ 
            color: colors.foreground,
            ml: 2,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            fontWeight: 500,
            textShadow: isDark 
              ? '0 1px 0 rgba(255, 255, 255, 0.1)' 
              : '0 1px 0 rgba(255, 255, 255, 0.8)',
          }}>
            sumanrajsharma — -zsh — 80×24
          </Typography>
        </Box>
      </Box>

      {/* Terminal Content */}
      <Box
        ref={terminalContentRef}
        sx={{
          p: 3,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '14px',
          lineHeight: 1.4,
          maxHeight: '400px',
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

export function ClientTerminal({ profile, projects, skills }: ClientTerminalProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [terminalVisible, setTerminalVisible] = useState(false);
  
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
      background: '#242A25',
      foreground: '#A8E6CF',
      accent: '#50fa7b',
      secondary: '#f1fa8c',
      border: '#373B41',
      cardBg: '#2A2C2E',
      pattern: '#333333',
    },
  };

  const colors = terminalColors[isDark ? 'dark' : 'light'];

  const quickCommands = [
    { cmd: 'whoami', desc: 'About me' },
    { cmd: 'skills', desc: 'Technical skills' },
    { cmd: 'projects', desc: 'My projects' },
    { cmd: 'contact', desc: 'Get in touch' },
  ];

  return (
    <Box
      id="terminal"
      ref={ref}
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: colors.background,
        color: colors.foreground,
        position: 'relative',
        transition: 'all 0.15s ease',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                color: colors.accent,
                fontWeight: 500,
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
              }}
            >
              INTERACTIVE EXPERIENCE
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 600,
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
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              Explore my portfolio the developer way! Use command-line commands
              to discover my skills, projects, and experience.
            </Typography>

            <Button
              variant="contained"
              startIcon={<TerminalIcon />}
              onClick={() => setTerminalVisible(!terminalVisible)}
              sx={{
                bgcolor: colors.accent,
                color: isDark ? '#000000' : '#FFFFFF',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                border: `2px solid ${colors.accent}`,
                '&:hover': {
                  bgcolor: isDark ? '#45e66d' : '#219a52',
                  boxShadow: `0 8px 25px ${colors.accent}25`,
                },
              }}
            >
              {terminalVisible ? 'Hide Terminal' : 'Launch Terminal'}
            </Button>
          </Box>

          {/* Quick Commands */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
            {quickCommands.map((cmd) => (
              <Paper
                key={cmd.cmd}
                sx={{
                  bgcolor: colors.cardBg,
                  color: colors.foreground,
                  px: 2,
                  py: 1,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    borderColor: colors.accent,
                    boxShadow: `0 4px 12px ${colors.accent}15`,
                  },
                }}
              >
                <Box sx={{ color: colors.accent }}>$ {cmd.cmd}</Box>
                <Box sx={{ color: colors.secondary, fontSize: '0.75rem' }}>{cmd.desc}</Box>
              </Paper>
            ))}
          </Box>

          {/* Terminal */}
          {terminalVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SimulatedTerminal
                profile={profile}
                projects={projects}
                skills={skills}
                onClose={() => setTerminalVisible(false)}
              />
            </motion.div>
          )}

          {/* Help Text */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography
              variant="body2"
              sx={{
                color: colors.secondary,
                fontFamily: 'monospace',
              }}
            >
              💡 Try commands like: help, whoami, skills, projects, easter-egg
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}