'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { macOSColors } from '@/lib/colors';

interface MacOSWindowControlsProps {
  title?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  showControls?: boolean;
  isDark?: boolean;
}

interface WindowControlProps {
  color: string;
  hoverColor: string;
  symbol: string;
  onClick?: () => void;
  symbolColor?: string;
}

function WindowControl({ 
  color, 
  hoverColor, 
  symbol, 
  onClick, 
  symbolColor = 'transparent' 
}: WindowControlProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 13,
        height: 13,
        borderRadius: '50%',
        bgcolor: color,
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: symbol === '⬢' ? '8px' : '10px',
        fontWeight: 'bold',
        color: symbolColor,
        position: 'relative',
        transition: 'all 0.1s ease',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        '&:hover': onClick ? {
          bgcolor: hoverColor,
          color: symbol === '×' ? '#8B1F1F' : symbol === '−' ? '#8B6F00' : '#1B5E20',
          transform: 'scale(1.05)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3)',
        } : {},
        '&:active': onClick ? {
          transform: 'scale(0.95)',
        } : {},
      }}
    >
      {symbol}
    </Box>
  );
}

export function MacOSWindowControls({
  title,
  onClose,
  onMinimize,
  onMaximize,
  showControls = true,
  isDark = false,
}: MacOSWindowControlsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        bgcolor: isDark ? '#2A2C2E' : '#E8E8E8',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        background: isDark 
          ? 'linear-gradient(180deg, #2A2C2E 0%, #25272A 100%)'
          : 'linear-gradient(180deg, #F0F0F0 0%, #E8E8E8 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        borderBottom: `1px solid ${isDark ? '#373B41' : '#BDC3C7'}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {showControls && (
          <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
            <WindowControl
              color={macOSColors.red}
              hoverColor={macOSColors.redHover}
              symbol="×"
              onClick={onClose}
            />
            <WindowControl
              color={macOSColors.yellow}
              hoverColor={macOSColors.yellowHover}
              symbol="−"
              onClick={onMinimize}
            />
            <WindowControl
              color={macOSColors.green}
              hoverColor={macOSColors.greenHover}
              symbol="⬢"
              onClick={onMaximize}
            />
          </Box>
        )}
        
        {title && (
          <Typography 
            variant="body2" 
            sx={{ 
              color: isDark ? '#E1E9E2' : '#2C3E50',
              ml: 2,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              fontWeight: 500,
              textShadow: isDark 
                ? '0 1px 0 rgba(255, 255, 255, 0.1)' 
                : '0 1px 0 rgba(255, 255, 255, 0.8)',
            }}
          >
            {title}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// Specialized variants
export function TerminalWindowControls(props: Omit<MacOSWindowControlsProps, 'title'>) {
  return (
    <MacOSWindowControls
      title="sumanrajsharma — terminal — 80×24"
      {...props}
    />
  );
}

export function CodeWindowControls(props: Omit<MacOSWindowControlsProps, 'title'>) {
  return (
    <MacOSWindowControls
      title="VS Code — portfolio"
      {...props}
    />
  );
}