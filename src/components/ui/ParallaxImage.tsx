'use client';

import React, { useRef } from 'react';
import { Box, BoxProps } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ParallaxImageProps extends Omit<BoxProps, 'component'> {
  src: string;
  alt: string;
  speed?: number;
  scale?: number; // Scale factor for zoom effect
  opacity?: number;
  overlay?: boolean;
  overlayColor?: string;
  blur?: number;
  width?: number | string;
  height?: number | string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  scale = 1,
  opacity = 1,
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.3)',
  blur = 0,
  width = '100%',
  height = '100%',
  objectFit = 'cover',
  sx,
  ...props
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(100 * speed)]
  );

  const scaleTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [scale, scale * 1.1]
  );

  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [opacity * 0.8, opacity, opacity * 0.8]
  );

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        ...sx
      }}
      {...props}
    >
      <Box
        component={motion.div}
        style={{
          y,
          scale: scaleTransform,
          opacity: opacityTransform
        }}
        sx={{
          position: 'relative',
          width: '110%', // Slightly larger to prevent gaps during parallax
          height: '110%',
          marginLeft: '-5%',
          marginTop: '-5%',
          filter: blur > 0 ? `blur(${blur}px)` : 'none',
          willChange: 'transform',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit }}
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Box>
      
      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}

interface ParallaxVideoProps extends Omit<BoxProps, 'component'> {
  src: string;
  speed?: number;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  overlay?: boolean;
  overlayColor?: string;
}

export function ParallaxVideo({
  src,
  speed = 0.3,
  muted = true,
  loop = true,
  autoPlay = true,
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.4)',
  sx,
  ...props
}: ParallaxVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(100 * speed)]
  );

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...sx
      }}
      {...props}
    >
      <Box
        component={motion.div}
        style={{ y }}
        sx={{
          position: 'relative',
          width: '110%',
          height: '110%',
          marginLeft: '-5%',
          marginTop: '-5%',
          willChange: 'transform',
        }}
      >
        <video
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </Box>
      
      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}