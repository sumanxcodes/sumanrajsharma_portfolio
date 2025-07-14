'use client';

import React from 'react';
import { Box, Container, BoxProps, ContainerProps } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  containerProps?: ContainerProps;
  useContainer?: boolean;
  animationVariant?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'staggerChildren';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  sx?: BoxProps['sx'];
}

// Animation variants - simplified
const animationVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
};

export function AnimatedSection({
  children,
  containerProps,
  useContainer = true,
  animationVariant = 'fadeInUp',
  delay = 0,
  duration = 0.8,
  once = true,
  threshold = 0.1,
  sx
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once
  });

  const variant = animationVariants[animationVariant];

  const content = (
    <Box
      ref={ref}
      component={motion.div}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ duration, delay, ease: 'easeOut' }}
      sx={sx}
    >
      {children}
    </Box>
  );

  if (useContainer) {
    return (
      <Container maxWidth="lg" {...containerProps}>
        {content}
      </Container>
    );
  }

  return content;
}

// Specialized animated section variants for common use cases
export function AnimatedHeroSection(props: Omit<AnimatedSectionProps, 'animationVariant'>) {
  return (
    <AnimatedSection
      animationVariant="fadeIn"
      duration={1.2}
      {...props}
    />
  );
}

export function AnimatedContentSection(props: Omit<AnimatedSectionProps, 'animationVariant'>) {
  return (
    <AnimatedSection
      animationVariant="fadeInUp"
      duration={0.8}
      {...props}
    />
  );
}

export function AnimatedGridSection(props: Omit<AnimatedSectionProps, 'animationVariant'>) {
  return (
    <AnimatedSection
      animationVariant="staggerChildren"
      duration={0.6}
      {...props}
    />
  );
}