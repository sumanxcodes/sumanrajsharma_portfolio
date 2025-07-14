'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Box, Typography, Container, Button, Paper, CircularProgress } from '@mui/material';
import { Terminal as TerminalIcon, Code, PlayArrow } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Profile, Project, Skill } from '@/types/sanity';

interface ClientTerminalProps {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
}

// Simulated terminal component without xterm dependency
function SimulatedTerminal({ profile, projects, skills }: ClientTerminalProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    '$ Welcome to Suman\'s Portfolio Terminal! 🚀',
    '$ Type "help" to see available commands.',
    '$ Try: whoami, skills, projects, contact, easter-egg',
    ''
  ]);
  const [currentPath] = useState('/home/suman/portfolio');

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

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: '#000000',
        color: '#00ff00',
        p: 3,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '14px',
        lineHeight: 1.4,
        border: '1px solid #333333',
        maxHeight: '400px',
        overflow: 'auto',
      }}
    >
      <Box sx={{ mb: 2 }}>
        {output.map((line, index) => (
          <Box key={index} sx={{ whiteSpace: 'pre-wrap', color: line.startsWith('$') ? '#00ff00' : '#ffffff' }}>
            {line}
          </Box>
        ))}
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ color: '#00ff00', mr: 1 }}>$</Box>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            flex: 1,
          }}
          placeholder="Type a command..."
        />
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
        bgcolor: '#000000',
        color: '#ffffff',
        position: 'relative',
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
                color: '#00ff00',
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
                color: '#ffffff',
              }}
            >
              Developer Terminal
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#cccccc',
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
                bgcolor: '#00ff00',
                color: '#000000',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                '&:hover': {
                  bgcolor: '#00cc00',
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
                  bgcolor: '#1a1a1a',
                  color: '#ffffff',
                  px: 2,
                  py: 1,
                  border: '1px solid #333333',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              >
                <Box sx={{ color: '#00ff00' }}>$ {cmd.cmd}</Box>
                <Box sx={{ color: '#cccccc', fontSize: '0.75rem' }}>{cmd.desc}</Box>
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
              />
            </motion.div>
          )}

          {/* Help Text */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#888888',
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