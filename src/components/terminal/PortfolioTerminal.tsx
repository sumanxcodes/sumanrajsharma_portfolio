'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import { Close, Minimize, CropSquare } from '@mui/icons-material';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { Profile, Project, Skill } from '@/types/sanity';

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
      theme: {
        background: '#000000',
        foreground: '#ffffff',
        cursor: '#ffffff',
        selectionBackground: '#333333',
        black: '#000000',
        red: '#ff5555',
        green: '#50fa7b',
        yellow: '#f1fa8c',
        blue: '#bd93f9',
        magenta: '#ff79c6',
        cyan: '#8be9fd',
        white: '#f8f8f2',
        brightBlack: '#44475a',
        brightRed: '#ff5555',
        brightGreen: '#50fa7b',
        brightYellow: '#f1fa8c',
        brightBlue: '#bd93f9',
        brightMagenta: '#ff79c6',
        brightCyan: '#8be9fd',
        brightWhite: '#ffffff',
      },
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
  }, [profile, projects, skills, currentPath, commandHistory, minimized]);

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
          bgcolor: '#000000',
          color: '#ffffff',
          minWidth: 200,
        }}
        onClick={onToggleMinimize}
      >
        <Typography variant="body2">📟 Portfolio Terminal</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '95vw', md: '80vw', lg: '70vw' },
        height: { xs: '80vh', md: '70vh' },
        bgcolor: '#000000',
        border: '1px solid #333333',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Terminal Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
          bgcolor: '#1a1a1a',
          borderBottom: '1px solid #333333',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5555' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f1fa8c' }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#50fa7b' }} />
          </Box>
          <Typography variant="body2" sx={{ color: '#ffffff', ml: 2 }}>
            suman@portfolio: ~/portfolio
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton size="small" onClick={onToggleMinimize} sx={{ color: '#ffffff' }}>
            <Minimize fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: '#ffffff' }}>
            <CropSquare fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onClose} sx={{ color: '#ffffff' }}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Terminal Content */}
      <Box
        ref={terminalRef}
        sx={{
          flex: 1,
          bgcolor: '#000000',
          '& .xterm': {
            height: '100%',
          },
          '& .xterm-viewport': {
            backgroundColor: '#000000',
          },
        }}
      />
    </Paper>
  );
}