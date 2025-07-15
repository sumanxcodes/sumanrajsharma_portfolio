'use client';

import React, { useRef } from 'react';
import { Box, BoxProps } from '@mui/material';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxSectionProps extends Omit<BoxProps, 'component'> {
  children: React.ReactNode;
  speed?: number; // Parallax speed multiplier (0-1, where 0.5 is half speed)
  direction?: 'up' | 'down'; // Direction of parallax movement
  offset?: number; // Initial offset in pixels
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  direction = 'up',
  offset = 0,
  sx,
  ...props
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Calculate transform based on speed and direction
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? [offset, -(100 * speed) + offset]
      : [offset, (100 * speed) + offset]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y: transform }}
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

interface ParallaxContainerProps extends Omit<BoxProps, 'component'> {
  children: React.ReactNode;
  height?: string | number;
  overflow?: 'hidden' | 'visible';
}

export function ParallaxContainer({
  children,
  height = '100vh',
  overflow = 'hidden',
  sx,
  ...props
}: ParallaxContainerProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        height,
        overflow,
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

// Hook for creating custom parallax transforms
export function useParallax(speed: number = 0.5, offset: number = 0): MotionValue<number> {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  return useTransform(
    scrollYProgress,
    [0, 1],
    [offset, -(100 * speed) + offset]
  );
}