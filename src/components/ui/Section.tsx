import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface SectionProps extends BoxProps {
  children: React.ReactNode;
  background?: 'default' | 'surface' | 'surface-variant';
}

export function Section({ 
  children, 
  background = 'default',
  ...props 
}: SectionProps) {
  const getBackgroundColor = () => {
    switch (background) {
      case 'surface':
        return 'surface.container';
      case 'surface-variant':
        return 'surface.variant';
      default:
        return 'transparent';
    }
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        bgcolor: getBackgroundColor(),
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}