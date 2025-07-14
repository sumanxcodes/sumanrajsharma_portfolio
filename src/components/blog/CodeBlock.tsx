'use client';

import { Box, IconButton, Typography, useTheme, alpha } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'javascript', filename }: CodeBlockProps) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  
  const isDarkMode = theme.palette.mode === 'dark';
  const syntaxTheme = isDarkMode ? vscDarkPlus : vs;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <Box
      sx={{
        my: 3,
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        backgroundColor: isDarkMode ? 'grey.900' : 'grey.50',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          backgroundColor: isDarkMode ? 'grey.800' : 'grey.100',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontFamily: 'monospace',
            fontWeight: 500,
          }}
        >
          {filename || language}
        </Typography>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
        </IconButton>
      </Box>

      {/* Code content */}
      <Box
        sx={{
          '& pre': {
            margin: '0 !important',
            padding: '16px !important',
            backgroundColor: 'transparent !important',
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
          '& code': {
            fontFamily: '"Fira Code", "JetBrains Mono", "Source Code Pro", monospace',
          },
        }}
      >
        <SyntaxHighlighter
          language={language}
          style={syntaxTheme}
          customStyle={{
            background: 'transparent',
            margin: 0,
            padding: 0,
          }}
          showLineNumbers
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
}