'use client';

import React from 'react';
import { Box, Typography, TypographyProps } from '@mui/material';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  subtitleProps?: TypographyProps;
  titleProps?: TypographyProps;
  descriptionProps?: TypographyProps;
  maxWidth?: string | number;
  sx?: object;
}

export function SectionHeader({
  subtitle,
  title,
  description,
  align = 'center',
  subtitleProps,
  titleProps,
  descriptionProps,
  maxWidth = '800px',
  sx,
  ...props
}: SectionHeaderProps) {
  const alignment = {
    textAlign: align,
    mx: align === 'center' ? 'auto' : align === 'right' ? 'auto' : 0,
    ml: align === 'right' ? 'auto' : align === 'center' ? 'auto' : 0,
    mr: align === 'left' ? 'auto' : align === 'center' ? 'auto' : 0,
  };

  return (
    <Box
      sx={{
        mb: 6,
        maxWidth,
        ...alignment,
        ...sx,
      }}
      {...props}
    >
      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              mb: 2,
              color: 'primary.main',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              ...alignment,
            }}
            {...subtitleProps}
          >
            {subtitle}
          </Typography>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: description ? 3 : 0,
            fontWeight: 600,
            color: 'text.primary',
            ...alignment,
          }}
          {...titleProps}
        >
          {title}
        </Typography>
      </motion.div>
      
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7,
              ...alignment,
            }}
            {...descriptionProps}
          >
            {description}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
}

// Specialized section header variants
export function HeroSectionHeader(props: Omit<SectionHeaderProps, 'align'>) {
  return (
    <SectionHeader
      align="center"
      titleProps={{ 
        variant: 'h1',
        sx: { 
          fontWeight: 700,
          background: 'linear-gradient(135deg, currentColor 0%, currentColor 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
        }
      }}
      maxWidth="900px"
      {...props}
    />
  );
}

export function ContentSectionHeader(props: SectionHeaderProps) {
  return (
    <SectionHeader
      titleProps={{ 
        variant: 'h2',
        sx: { fontWeight: 600 }
      }}
      maxWidth="700px"
      {...props}
    />
  );
}

export function CompactSectionHeader(props: SectionHeaderProps) {
  return (
    <SectionHeader
      titleProps={{ 
        variant: 'h3',
        sx: { fontWeight: 600 }
      }}
      maxWidth="600px"
      sx={{ mb: 4 }}
      {...props}
    />
  );
}