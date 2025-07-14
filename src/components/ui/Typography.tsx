'use client';

import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { motion } from 'framer-motion';

interface AnimatedTypographyProps extends TypographyProps {
  animate?: boolean;
  delay?: number;
  duration?: number;
}

// Base animated typography component
export function AnimatedTypography({
  animate = true,
  delay = 0,
  duration = 0.6,
  children,
  ...props
}: AnimatedTypographyProps) {
  if (!animate) {
    return <Typography {...props}>{children}</Typography>;
  }

  return (
    <Typography
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </Typography>
  );
}

// Specialized typography variants
export function SectionTitle({ 
  children, 
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'>) {
  return (
    <AnimatedTypography
      variant="h2"
      sx={{
        fontWeight: 600,
        color: 'text.primary',
        mb: 2,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}

export function SectionSubtitle({ 
  children, 
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'>) {
  return (
    <AnimatedTypography
      variant="subtitle2"
      sx={{
        color: 'primary.main',
        fontWeight: 500,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        mb: 1,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}

export function SectionDescription({ 
  children, 
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'>) {
  return (
    <AnimatedTypography
      variant="body1"
      sx={{
        color: 'text.secondary',
        lineHeight: 1.7,
        maxWidth: '600px',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}

export function HeroTitle({ 
  children, 
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'>) {
  return (
    <AnimatedTypography
      variant="h1"
      sx={{
        fontWeight: 700,
        color: 'text.primary',
        mb: 3,
        textAlign: 'center',
        background: theme => theme.palette.mode === 'light' 
          ? 'linear-gradient(135deg, #000000 0%, #333333 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #E8E8E8 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...props.sx,
      }}
      duration={1}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}

export function HeroSubtitle({ 
  children, 
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'>) {
  return (
    <AnimatedTypography
      variant="h4"
      sx={{
        color: 'text.secondary',
        fontWeight: 300,
        textAlign: 'center',
        mb: 4,
        maxWidth: '800px',
        mx: 'auto',
        ...props.sx,
      }}
      delay={0.2}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}

export function HeroDescription({ 
  children, 
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'>) {
  return (
    <AnimatedTypography
      variant="body1"
      sx={{
        color: 'text.secondary',
        lineHeight: 1.8,
        textAlign: 'center',
        mb: 6,
        maxWidth: '600px',
        mx: 'auto',
        ...props.sx,
      }}
      delay={0.4}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}

export function CardTitle({ 
  children, 
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'>) {
  return (
    <AnimatedTypography
      variant="h5"
      sx={{
        fontWeight: 600,
        color: 'text.primary',
        mb: 1,
        lineHeight: 1.2,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}

export function CardDescription({ 
  children, 
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'>) {
  return (
    <AnimatedTypography
      variant="body2"
      sx={{
        color: 'text.secondary',
        lineHeight: 1.6,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}

export function TerminalText({ 
  children, 
  variant = 'mono',
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'> & { variant?: 'mono' | 'command' | 'output' }) {
  const variantStyles = {
    mono: {
      fontFamily: '"JetBrains Mono", monospace',
      color: 'text.primary',
      fontSize: '0.875rem',
    },
    command: {
      fontFamily: '"JetBrains Mono", monospace',
      color: 'primary.main',
      fontSize: '0.875rem',
      fontWeight: 'bold',
    },
    output: {
      fontFamily: '"JetBrains Mono", monospace',
      color: 'text.secondary',
      fontSize: '0.875rem',
    },
  };

  return (
    <AnimatedTypography
      variant="body2"
      sx={{
        ...variantStyles[variant],
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}

export function GradientText({ 
  children,
  gradient = 'primary',
  ...props 
}: Omit<AnimatedTypographyProps, 'variant'> & { gradient?: 'primary' | 'secondary' | 'custom' }) {
  const gradients = {
    primary: 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)',
    secondary: 'linear-gradient(135deg, #4A6B5C 0%, #6D8F7D 100%)',
    custom: 'linear-gradient(135deg, currentColor 0%, currentColor 100%)',
  };

  return (
    <AnimatedTypography
      sx={{
        background: gradients[gradient],
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </AnimatedTypography>
  );
}