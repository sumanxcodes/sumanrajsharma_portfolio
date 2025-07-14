'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, IconButton, useTheme } from '@mui/material';
import { Close, Minimize, CropSquare } from '@mui/icons-material';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { Profile, Project, Skill } from '@/types/sanity';
import { usePortfolioTheme } from '@/components/providers/ThemeProvider';

interface PortfolioTerminalProps {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
  onClose?: () => void;
  minimized?: boolean;
  onToggleMinimize?: () => void;
}

interface CommandHandler {
  description: string;
  handler: (args: string[]) => Promise<string> | string;
}

export function PortfolioTerminal({
  profile,
  projects,
  skills,
  onClose,
  minimized = false,
  onToggleMinimize,
}: PortfolioTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const [currentPath, setCurrentPath] = useState('/home/suman');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const theme = useTheme();
  const { mode } = usePortfolioTheme();
  const isDark = mode === 'dark';
  
  // Theme-aware terminal colors
  const terminalTheme = {
    light: {
      background: '#F8F9FA',
      foreground: '#2C3E50',
      cursor: '#2C3E50',
      selectionBackground: '#BDC3C7',
      black: '#2C3E50',
      red: '#E74C3C',
      green: '#27AE60',
      yellow: '#F39C12',
      blue: '#3498DB',
      magenta: '#9B59B6',
      cyan: '#16A085',
      white: '#ECF0F1',
      brightBlack: '#34495E',
      brightRed: '#C0392B',
      brightGreen: '#229954',
      brightYellow: '#D68910',
      brightBlue: '#2980B9',
      brightMagenta: '#8E44AD',
      brightCyan: '#138D75',
      brightWhite: '#FFFFFF',
    },
    dark: {
      background: '#1D1F21',
      foreground: '#A8E6CF',
      cursor: '#A8E6CF',
      selectionBackground: '#373B41',
      black: '#1D1F21',
      red: '#CC6666',
      green: '#B5BD68',
      yellow: '#F0C674',
      blue: '#81A2BE',
      magenta: '#B294BB',
      cyan: '#8ABEB7',
      white: '#C5C8C6',
      brightBlack: '#373B41',
      brightRed: '#CC6666',
      brightGreen: '#B5BD68',
      brightYellow: '#F0C674',
      brightBlue: '#81A2BE',
      brightMagenta: '#B294BB',
      brightCyan: '#8ABEB7',
      brightWhite: '#FFFFFF',
    }
  };

  // macOS-style colors for traffic lights (exact macOS colors)
  const macOSColors = {
    red: '#FF5F57',
    yellow: '#FFBD2E',
    green: '#28CA42',
    redHover: '#FF4A47',
    yellowHover: '#FFB01E',
    greenHover: '#1FB832',
    // Inner shadow colors for depth
    redInner: '#CC3E34',
    yellowInner: '#E09B0B',
    greenInner: '#1F8B32',
  };

  // Terminal commands
  const commands: Record<string, CommandHandler> = {
    help: {
      description: 'Show available commands',
      handler: () => {
        return `
Available commands:
  help              - Show this help message
  whoami            - Display user information
  ls [section]      - List portfolio sections or section contents
  cd <section>      - Navigate to a section
  pwd               - Show current directory
  skills [category] - Display skills by category
  projects          - Show all projects
  contact           - Display contact information
  about             - Show about information
  resume            - Display resume link
  clear             - Clear terminal
  history           - Show command history
  git log           - Show project timeline
  cat <file>        - Display file contents
  easter-egg        - Find the hidden surprise
  theme             - Display portfolio color scheme
  
Use 'help <command>' for detailed information about a specific command.
`;
      },
    },

    whoami: {
      description: 'Display user information',
      handler: () => {
        return `
╔════════════════════════════════════════╗
║            Suman Raj Sharma            ║
║      Full-Stack Developer & Tech       ║
║           Problem Solver               ║
╚════════════════════════════════════════╝

${profile?.shortBio || 'Passionate about building innovative digital experiences with modern technologies.'}

🌍 Location: Based in [Your Location]
📅 Experience: [Your Experience] years in software development
🎯 Focus: React, Node.js, TypeScript, Cloud Architecture
`;
      },
    },

    ls: {
      description: 'List portfolio sections',
      handler: (args) => {
        if (args.length === 0) {
          return `
Portfolio sections:
  about/            - Personal information and background
  skills/           - Technical skills and expertise
  projects/         - Development projects and work
  experience/       - Professional experience
  education/        - Educational background
  contact/          - Contact information and social links
  
Use 'ls <section>' to see section contents or 'cd <section>' to navigate.
`;
        }

        const section = args[0].toLowerCase().replace('/', '');
        switch (section) {
          case 'skills':
            const categories = Array.from(new Set(skills.map(skill => skill.category)));
            return categories.length > 0
              ? `Skills categories:\n${categories.map(cat => `  ${cat}/`).join('\n')}`
              : 'No skills found. Add skills in your Sanity CMS.';
          
          case 'projects':
            return projects.length > 0
              ? `Projects:\n${projects.map((p, i) => `  ${i + 1}. ${p.title}`).join('\n')}`
              : 'No projects found. Add projects in your Sanity CMS.';
          
          default:
            return `ls: cannot access '${section}': Section not found\nTry 'ls' to see available sections.`;
        }
      },
    },

    cd: {
      description: 'Navigate to a section',
      handler: (args) => {
        if (args.length === 0) {
          setCurrentPath('/home/suman');
          return `Changed directory to /home/suman`;
        }

        const section = args[0].toLowerCase().replace('/', '');
        const validSections = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];
        
        if (validSections.includes(section)) {
          setCurrentPath(`/home/suman/portfolio/${section}`);
          return `Changed directory to /home/suman/portfolio/${section}`;
        }
        
        return `cd: no such directory: ${section}`;
      },
    },

    pwd: {
      description: 'Show current directory',
      handler: () => currentPath,
    },

    skills: {
      description: 'Display skills by category',
      handler: (args) => {
        if (skills.length === 0) {
          return 'No skills found. Add skills in your Sanity CMS.';
        }

        if (args.length === 0) {
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
        }

        const category = args[0];
        const categorySkills = skills.filter(skill => 
          skill.category?.toLowerCase() === category.toLowerCase()
        );

        return categorySkills.length > 0
          ? `${category} skills:\n${categorySkills.map(skill => `  • ${skill.name}`).join('\n')}`
          : `No skills found for category: ${category}`;
      },
    },

    projects: {
      description: 'Show all projects',
      handler: () => {
        if (projects.length === 0) {
          return 'No projects found. Add projects in your Sanity CMS.';
        }

        return projects.map((project, index) => `
${index + 1}. ${project.title}
   Description: ${project.description}
   ${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''}
   ${project.demoUrl ? `Demo: ${project.demoUrl}` : ''}
   Technologies: ${project.techStack?.join(', ') || 'N/A'}
`).join('\n');
      },
    },

    contact: {
      description: 'Display contact information',
      handler: () => {
        const socials = profile?.socials;
        return `
📧 Email: ${socials?.email || 'contact@sumanrajsharma.dev'}
🔗 LinkedIn: ${socials?.linkedin || 'linkedin.com/in/sumanrajsharma'}
🐙 GitHub: ${socials?.github || 'github.com/sumanxcodes'}
🌐 Portfolio: https://sumanrajsharma.dev

Feel free to reach out for collaboration opportunities!
`;
      },
    },

    about: {
      description: 'Show about information',
      handler: () => {
        return `
${profile?.name || 'Suman Raj Sharma'}
${'='.repeat((profile?.name || 'Suman Raj Sharma').length)}

${profile?.shortBio || 'Passionate full-stack developer with expertise in modern web technologies.'}

I love building scalable applications, solving complex problems, and contributing to open-source projects.
When I'm not coding, you can find me exploring new technologies or sharing knowledge with the community.
`;
      },
    },

    resume: {
      description: 'Display resume link',
      handler: () => {
        return profile?.resumeUrl
          ? `📄 Resume: ${profile.resumeUrl}\n\nYou can download my latest resume from the link above.`
          : 'Resume not available. Please check back later.';
      },
    },

    clear: {
      description: 'Clear terminal',
      handler: () => {
        terminalInstance.current?.clear();
        return '';
      },
    },

    history: {
      description: 'Show command history',
      handler: () => {
        return commandHistory.length > 0
          ? `Command history:\n${commandHistory.map((cmd, i) => `  ${i + 1}. ${cmd}`).join('\n')}`
          : 'No command history available.';
      },
    },

    'git': {
      description: 'Git commands',
      handler: (args) => {
        if (args[0] === 'log') {
          return `
commit a1b2c3d (HEAD -> main, origin/main)
Author: Suman Raj Sharma <contact@sumanrajsharma.dev>
Date: ${new Date().toDateString()}

    feat: Added interactive terminal to portfolio
    
    - Implemented xterm.js integration
    - Created command-line interface for portfolio navigation
    - Added creative developer experience features

commit e4f5g6h
Author: Suman Raj Sharma <contact@sumanrajsharma.dev>
Date: ${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString()}

    design: Complete portfolio redesign with monochrome theme
    
    - Migrated to single-page layout
    - Implemented smooth scrolling navigation
    - Added framer-motion animations
`;
        }
        return `git: '${args.join(' ')}' is not a git command. Try 'git log'.`;
      },
    },

    cat: {
      description: 'Display file contents',
      handler: (args) => {
        if (args.length === 0) {
          return 'cat: missing file operand\nTry \'cat biography.txt\' or \'cat skills.json\'';
        }

        const file = args[0].toLowerCase();
        switch (file) {
          case 'biography.txt':
          case 'bio.txt':
            return profile?.shortBio || 'Biography file not found.';
          
          case 'skills.json':
            return JSON.stringify({ skills: skills.map(s => ({ name: s.name, category: s.category })) }, null, 2);
          
          case 'projects.json':
            return JSON.stringify({ projects: projects.map(p => ({ title: p.title, description: p.description })) }, null, 2);
          
          default:
            return `cat: ${file}: No such file or directory`;
        }
      },
    },

    'easter-egg': {
      description: 'Find the hidden surprise',
      handler: () => {
        return `
  ______ _    _ _   _   ______ ____  _    _ _   _ _____  
 |  ____| |  | | \\ | | |  ____/ __ \\| |  | | \\ | |  __ \\ 
 | |__  | |  | |  \\| | | |__ | |  | | |  | |  \\| | |  | |
 |  __| | |  | | . \` | |  __|| |  | | |  | | . \` | |  | |
 | |    | |__| | |\\  | | |   | |__| | |__| | |\\  | |__| |
 |_|     \\____/|_| \\_| |_|    \\____/ \\____/|_| \\_|_____/ 

🎉 Congratulations! You found the Easter egg! 
🥚 You're clearly someone who pays attention to details.
🚀 That's exactly the kind of person I'd love to work with!

P.S. Type 'help' to discover more commands, or explore the portfolio sections with 'cd' and 'ls'.
`;
      },
    },

    theme: {
      description: 'Display portfolio color scheme',
      handler: () => {
        return `
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

Design Philosophy: Minimalist monochrome aesthetic 
inspired by modern developer tools and clean interfaces.
`;
      },
    },
  };

  useEffect(() => {
    if (!terminalRef.current || minimized) return;

    // Initialize terminal
    const terminal = new Terminal({
      theme: terminalTheme[isDark ? 'dark' : 'light'],
      fontFamily: '"JetBrains Mono", "Courier New", monospace',
      fontSize: 14,
      lineHeight: 1.4,
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
    });

    fitAddon.current = new FitAddon();
    terminal.loadAddon(fitAddon.current);
    terminal.loadAddon(new WebLinksAddon());
    
    terminal.open(terminalRef.current);
    fitAddon.current.fit();

    // Welcome message
    terminal.write('\r\n\x1b[1;32mWelcome to Suman\'s Portfolio Terminal! 🚀\x1b[0m\r\n');
    terminal.write('Type \x1b[1;33mhelp\x1b[0m to see available commands.\r\n\r\n');
    
    let currentInput = '';
    const prompt = () => `\x1b[1;36msuman@portfolio\x1b[0m:\x1b[1;34m${currentPath}\x1b[0m$ `;
    terminal.write(prompt());

    const handleCommand = async (input: string) => {
      const trimmed = input.trim();
      if (!trimmed) return;

      const [commandName, ...args] = trimmed.split(' ');
      const command = commands[commandName.toLowerCase()];

      setCommandHistory(prev => [...prev, trimmed]);

      if (command) {
        try {
          const output = await command.handler(args);
          if (output) {
            terminal.write('\r\n' + output + '\r\n');
          }
        } catch (error) {
          terminal.write('\r\nError executing command: ' + commandName + '\r\n');
        }
      } else {
        terminal.write(`\r\nCommand not found: ${commandName}\r\nType 'help' for available commands.\r\n`);
      }
      
      terminal.write('\r\n' + prompt());
    };

    terminal.onData((data) => {
      const code = data.charCodeAt(0);
      
      if (code === 13) { // Enter
        handleCommand(currentInput);
        currentInput = '';
      } else if (code === 127) { // Backspace
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          terminal.write('\b \b');
        }
      } else if (code === 3) { // Ctrl+C
        terminal.write('^C\r\n' + prompt());
        currentInput = '';
      } else if (code >= 32) { // Printable characters
        currentInput += data;
        terminal.write(data);
      }
    });

    terminalInstance.current = terminal;

    const handleResize = () => {
      if (fitAddon.current) {
        fitAddon.current.fit();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, [profile, projects, skills, currentPath, commandHistory, minimized, isDark]);

  if (minimized) {
    return (
      <Paper
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          p: 2,
          cursor: 'pointer',
          zIndex: 1000,
          bgcolor: isDark ? '#1D1F21' : '#F8F9FA',
          color: isDark ? '#A8E6CF' : '#2C3E50',
          minWidth: 200,
          borderRadius: 3,
          border: `1px solid ${isDark ? '#373B41' : '#BDC3C7'}`,
          boxShadow: isDark 
            ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.15s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: isDark 
              ? '0 12px 48px rgba(0, 0, 0, 0.5)' 
              : '0 12px 48px rgba(0, 0, 0, 0.15)',
          },
        }}
        onClick={onToggleMinimize}
      >
        <Typography variant="body2">📟 Portfolio Terminal</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '95vw', md: '80vw', lg: '70vw' },
        height: { xs: '80vh', md: '70vh' },
        bgcolor: isDark ? '#1D1F21' : '#F8F9FA',
        border: `1px solid ${isDark ? '#373B41' : '#BDC3C7'}`,
        borderRadius: 3,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isDark 
          ? '0 25px 50px rgba(0, 0, 0, 0.6)' 
          : '0 25px 50px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.15s ease',
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
          borderBottom: `1px solid ${isDark ? '#373B41' : '#BDC3C7'}`,
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
                transition: 'all 0.15s ease',
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)`,
                '&:hover': {
                  bgcolor: macOSColors.redHover,
                  color: '#8B1F1F',
                  transform: 'scale(1.05)',
                  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)`,
                },
                '&:active': {
                  transform: 'scale(0.95)',
                  boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.2)`,
                },
              }}
            >
              ×
            </Box>
            
            {/* Minimize Button */}
            <Box
              onClick={onToggleMinimize}
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
                transition: 'all 0.15s ease',
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)`,
                '&:hover': {
                  bgcolor: macOSColors.yellowHover,
                  color: '#8B6F00',
                  transform: 'scale(1.05)',
                  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)`,
                },
                '&:active': {
                  transform: 'scale(0.95)',
                  boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.2)`,
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
                transition: 'all 0.15s ease',
                boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)`,
                '&:hover': {
                  bgcolor: macOSColors.greenHover,
                  color: '#1B5E20',
                  transform: 'scale(1.05)',
                  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)`,
                },
                '&:active': {
                  transform: 'scale(0.95)',
                  boxShadow: `inset 0 1px 2px rgba(0, 0, 0, 0.2)`,
                },
              }}
            >
              ⬢
            </Box>
          </Box>
          
          <Typography variant="body2" sx={{ 
            color: isDark ? '#A8E6CF' : '#2C3E50',
            ml: 2,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            fontWeight: 500,
            textShadow: isDark 
              ? '0 1px 0 rgba(255, 255, 255, 0.1)' 
              : '0 1px 0 rgba(255, 255, 255, 0.8)',
          }}>
            sumanrajsharma — -zsh — 139×33
          </Typography>
        </Box>
      </Box>

      {/* Terminal Content */}
      <Box
        ref={terminalRef}
        sx={{
          flex: 1,
          bgcolor: isDark ? '#1D1F21' : '#F8F9FA',
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          overflow: 'hidden',
          '& .xterm': {
            height: '100%',
          },
          '& .xterm-viewport': {
            backgroundColor: isDark ? '#1D1F21' : '#F8F9FA',
          },
          '& .xterm-screen': {
            backgroundColor: isDark ? '#1D1F21' : '#F8F9FA',
          },
        }}
      />
    </Paper>
  );
}