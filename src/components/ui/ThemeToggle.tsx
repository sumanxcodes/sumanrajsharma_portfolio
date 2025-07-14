'use client';

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { usePortfolioTheme } from '@/components/providers/ThemeProvider';

interface ThemeToggleProps {
  variant?: 'compact' | 'detailed' | 'floating';
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export function ThemeToggle({ 
  variant = 'compact', 
  size = 'medium',
  showLabel = false 
}: ThemeToggleProps) {
  const { mode, toggleTheme } = usePortfolioTheme();

  const isDark = mode === 'dark';
  const label = `Switch to ${isDark ? 'light' : 'dark'} mode`;

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        size={size}
        sx={{
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        {isDark ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}