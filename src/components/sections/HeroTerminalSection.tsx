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
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  
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

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Auto-start terminal with welcome sequence
  useEffect(() => {
    if (!isAutoStarted && output.length === 0) {
      console.log('Starting terminal auto-sequence...');
      
      const createIntroSection = () => {
        const name = profile?.name || 'Suman Raj Sharma';
        const title = 'Full-Stack Developer & Creative Problem Solver';
        const bio = profile?.shortBio || 'Developer skilled in backend engineering, cloud infrastructure, and automation.';
        
        return [
          '='.repeat(72),
          '                    DEVELOPER PORTFOLIO TERMINAL',
          '='.repeat(72),
          '',
          `👨‍💻 ${name}`,
          `🎯 ${title}`,
          '',
          '📍 SYSTEM INFO',
          '   OS: macOS Sonoma 14.5 (Portfolio Terminal v2.0)',
          '   Shell: zsh 5.9 (x86_64-apple-darwin23.0)',
          '   Path: /home/suman/portfolio',
          '',
          '🚀 ABOUT',
          `   ${bio}`,
          '',
          '📞 CONTACT',
          `   📧 ${profile?.socials?.email || 'contact@sumanrajsharma.dev'}`,
          `   🔗 ${profile?.socials?.linkedin || 'linkedin.com/in/sumanrajsharma'}`,
          `   🐙 ${profile?.socials?.github || 'github.com/sumanxcodes'}`,
          '',
          '💡 Type "help" for available commands',
          '='.repeat(72),
          ''
        ];
      };

      const introLines = createIntroSection();
      const welcomeSequence = [
        ...introLines,
        '$ whoami',
        `${profile?.name || 'Suman Raj Sharma'} - Full-Stack Developer & Creative Problem Solver`,
        '',
        '$ ls skills/',
        'Frontend/  Backend/  Tools/  Languages/',
        '',
        '$ git status',
        'On branch main',
        'Working on exciting projects...',
        'nothing to commit, working tree clean',
        '',
        '$ echo "Ready to collaborate! Type \'help\' for available commands."',
        'Ready to collaborate! Type \'help\' for available commands.',
        ''
      ];
      
      console.log('Starting terminal sequence with', welcomeSequence.length, 'lines');
      
      let index = 0;
      const typeSequence = () => {
        if (index < welcomeSequence.length) {
          const line = welcomeSequence[index];
          console.log('Adding line', index, ':', line);
          setOutput(prev => [...prev, line]);
          index++;
          
          // Variable timing for smoother animation
          let delay = 150; // Default fast timing
          if (index <= introLines.length) {
            // Faster for intro box lines
            delay = line.startsWith('╔') || line.startsWith('╚') ? 100 : 80;
          } else if (line.startsWith('$')) {
            // Slightly slower for commands
            delay = 300;
          }
          
          const timeout = setTimeout(typeSequence, delay);
          timeoutRefs.current.push(timeout);
        } else {
          console.log('Terminal sequence complete');
          setIsAutoStarted(true);
        }
      };
      
      const initialTimeout = setTimeout(typeSequence, 300);
      timeoutRefs.current.push(initialTimeout);
    }
  }, [isAutoStarted, output.length, profile]); // Include profile so it updates when data loads

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
        height: '600px',
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
            sumanrajsharma — terminal — 80×24
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
          height: 'calc(100% - 48px)',
          overflow: 'auto',
          bgcolor: colors.background,
          scrollBehavior: 'smooth',
        }}
      >
        <Box sx={{ mb: 2 }}>
          {output.length === 0 && (
            <Box sx={{ color: colors.foreground, fontStyle: 'italic' }}>
              Initializing terminal...
            </Box>
          )}
          {output.map((line, index) => {
            const isCommand = line && line.startsWith('$');
            const isHeader = line && line.startsWith('='.repeat(10));
            const isSection = line && /^(📍|🚀|📞|💡)/.test(line);
            const isEmoji = line && /^(👨‍💻|🎯)/.test(line);
            
            let textColor = colors.foreground;
            let fontWeight = 'normal';
            let fontSize = '14px';
            let marginBottom = '0';
            
            if (isCommand) {
              textColor = colors.accent;
              fontWeight = 'bold';
            } else if (isHeader) {
              textColor = colors.accent;
              fontWeight = 'bold';
              fontSize = '13px';
            } else if (isSection) {
              textColor = colors.secondary;
              fontWeight = 'bold';
              fontSize = '14px';
              marginBottom = '4px';
            } else if (isEmoji) {
              textColor = colors.foreground;
              fontWeight = 'bold';
              fontSize = '15px';
            }
            
            return (
              <Box 
                key={index} 
                sx={{ 
                  whiteSpace: 'pre-wrap', 
                  color: textColor,
                  fontWeight,
                  fontSize,
                  marginBottom,
                  lineHeight: 1.5,
                  fontFamily: '"JetBrains Mono", monospace',
                }}
              >
                {line || '\u00A0'}
              </Box>
            );
          })}
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
        // Developer workspace background pattern
        backgroundImage: isDark 
          ? 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0)'
          : 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Brief intro text above terminal */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                color: 'primary.main',
                fontWeight: 500,
                letterSpacing: '0.1em',
                fontFamily: 'monospace',
              }}
            >
              DEVELOPER WORKSPACE
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                fontWeight: 300,
                fontFamily: 'monospace',
              }}
            >
              $ exploring portfolio in terminal mode...
            </Typography>
          </Box>

          {/* Main Terminal Window */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Box sx={{ width: '100%', maxWidth: '900px' }}>
              <SimulatedTerminal
                profile={profile}
                projects={projects}
                skills={skills}
              />
            </Box>
          </Box>

          {/* Floating Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
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
                fontFamily: 'monospace',
                textTransform: 'none',
              }}
            >
              $ cd projects/
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="#contact"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontFamily: 'monospace',
                textTransform: 'none',
              }}
            >
              $ cat contact.md
            </Button>
          </Box>

          {/* Social Links as Terminal Commands */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
              $ curl -L
            </Typography>
            <Button
              size="small"
              startIcon={<GitHub />}
              href={profile?.socials?.github || 'https://github.com/sumanxcodes'}
              target="_blank"
              sx={{ 
                minWidth: 'auto',
                fontFamily: 'monospace',
                textTransform: 'none',
              }}
            >
              github.com/sumanxcodes
            </Button>
            <Button
              size="small"
              startIcon={<LinkedIn />}
              href={profile?.socials?.linkedin || 'https://linkedin.com/in/sumanrajsharma'}
              target="_blank"
              sx={{ 
                minWidth: 'auto',
                fontFamily: 'monospace',
                textTransform: 'none',
              }}
            >
              linkedin.com/in/sumanrajsharma
            </Button>
            <Button
              size="small"
              startIcon={<Email />}
              href={`mailto:${profile?.socials?.email || 'contact@sumanrajsharma.dev'}`}
              sx={{ 
                minWidth: 'auto',
                fontFamily: 'monospace',
                textTransform: 'none',
              }}
            >
              contact@sumanrajsharma.dev
            </Button>
          </Box>
        </motion.div>
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