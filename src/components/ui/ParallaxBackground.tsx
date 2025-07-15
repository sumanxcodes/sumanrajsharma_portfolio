'use client';

import React, { useRef } from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps extends Omit<BoxProps, 'component'> {
  children?: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  opacity?: number;
  blur?: number;
  gradient?: 'radial' | 'linear' | 'none';
  color?: string;
}

export function ParallaxBackground({
  children,
  speed = 0.3,
  direction = 'up',
  opacity = 0.6,
  blur = 0,
  gradient = 'radial',
  color,
  sx,
  ...props
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Calculate transforms based on direction
  const distance = 100 * speed;
  const transform = useTransform(
    scrollYProgress, 
    [0, 1], 
    direction === 'up' ? [0, -distance] :
    direction === 'down' ? [0, distance] :
    direction === 'left' ? [0, -distance] :
    direction === 'right' ? [0, distance] :
    [0, -distance] // default
  );

  // Get gradient background
  const getGradientBackground = () => {
    const baseColor = color || theme.palette.primary.main;
    const isDark = theme.palette.mode === 'dark';
    
    if (gradient === 'radial') {
      return `radial-gradient(circle at center, ${baseColor}20, transparent 70%)`;
    } else if (gradient === 'linear') {
      return `linear-gradient(45deg, ${baseColor}15, transparent 50%, ${baseColor}10)`;
    }
    return baseColor;
  };

  const style = {
    [direction === 'left' || direction === 'right' ? 'x' : 'y']: transform
  };

  return (
    <Box
      ref={ref}
      component={motion.div}
      style={style}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: gradient !== 'none' ? getGradientBackground() : color,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        pointerEvents: 'none',
        willChange: 'transform',
        zIndex: -1,
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

interface FloatingElementProps extends Omit<BoxProps, 'component'> {
  children?: React.ReactNode;
  speed?: number;
  amplitude?: number; // How much the element moves
  delay?: number;
}

export function FloatingElement({
  children,
  speed = 0.5,
  amplitude = 20,
  delay = 0,
  sx,
  ...props
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-amplitude, amplitude]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 360 * speed]
  );

  return (
    <motion.div
      ref={ref}
      style={{ 
        y,
        rotate,
      }}
    >
      <Box
        sx={{
          willChange: 'transform',
          ...sx
        }}
        {...props}
      >
        {children}
      </Box>
    </motion.div>
  );
}