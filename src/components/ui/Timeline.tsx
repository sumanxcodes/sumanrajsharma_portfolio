'use client';

import React, { useRef } from 'react';
import { Box, Typography, Card, CardContent, Chip, Avatar, useTheme } from '@mui/material';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ParallaxSection } from './ParallaxSection';
import { AnimatedSection } from './AnimatedSection';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  organization: string;
  startDate: string;
  endDate?: string;
  location?: string;
  description?: string;
  highlights?: string[];
  tags?: string[];
  logo?: string;
  index: number;
  isLast?: boolean;
}

interface TimelineProps {
  items: TimelineItemProps[];
  title: string;
  subtitle: string;
}

function TimelineItem({ 
  title, 
  subtitle, 
  organization, 
  startDate, 
  endDate, 
  location, 
  description, 
  highlights, 
  tags, 
  logo, 
  index,
  isLast = false 
}: TimelineItemProps) {
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  // Format date range
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const dateRange = `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : 'Present'}`;

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        mb: 6,
        '&:last-child': { mb: 0 }
      }}
    >
      {/* Timeline Line */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: isLast ? 40 : -48,
          width: 2,
          bgcolor: 'divider',
          transform: 'translateX(-50%)',
          zIndex: 0,
        }}
      />

      {/* Animated Timeline Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '20px',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            border: '3px solid',
            borderColor: 'background.paper',
            boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.2)',
          }}
        />
      </motion.div>

      {/* Logo Avatar (if provided) */}
      {logo && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50px',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <Avatar
            src={logo}
            alt={organization}
            sx={{
              width: 40,
              height: 40,
              border: '2px solid',
              borderColor: 'background.paper',
              bgcolor: 'background.paper',
            }}
          />
        </motion.div>
      )}

      {/* Content Card */}
      <ParallaxSection 
        speed={0.02 * (index + 1)} 
        sx={{ 
          width: { xs: '100%', md: '45%' },
          ml: isLeft ? 0 : 'auto',
          mr: isLeft ? 'auto' : 0,
        }}
      >
        <motion.div
          initial={{ 
            opacity: 0, 
            x: isLeft ? -50 : 50,
            y: 20 
          }}
          animate={isInView ? { 
            opacity: 1, 
            x: 0,
            y: 0 
          } : { 
            opacity: 0, 
            x: isLeft ? -50 : 50,
            y: 20 
          }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.15,
            ease: "easeOut"
          }}
        >
          <Card
            sx={{
              position: 'relative',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid',
              borderColor: 'divider',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
                borderColor: 'primary.main',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 20,
                [isLeft ? 'right' : 'left']: -8,
                width: 16,
                height: 16,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                transform: 'rotate(45deg)',
                display: { xs: 'none', md: 'block' }
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Date Badge */}
              <Chip
                label={dateRange}
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 500,
                  fontSize: '0.75rem'
                }}
              />

              {/* Title and Organization */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  color: 'text.primary',
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  color: 'primary.main',
                  fontWeight: 500,
                  mb: 1,
                }}
              >
                {organization}
              </Typography>

              {subtitle && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontStyle: 'italic',
                    mb: 2,
                  }}
                >
                  {subtitle}
                </Typography>
              )}

              {location && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                  }}
                >
                  📍 {location}
                </Typography>
              )}

              {description && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  {description}
                </Typography>
              )}

              {/* Highlights */}
              {highlights && highlights.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary',
                    }}
                  >
                    Key Achievements:
                  </Typography>
                  {highlights.map((highlight, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        mb: 0.5,
                        pl: 2,
                        position: 'relative',
                        '&::before': {
                          content: '"•"',
                          position: 'absolute',
                          left: 0,
                          color: 'primary.main',
                          fontWeight: 'bold'
                        }
                      }}
                    >
                      {highlight}
                    </Typography>
                  ))}
                </Box>
              )}

              {/* Tags */}
              {tags && tags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.75rem',
                        height: 24,
                      }}
                    />
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </ParallaxSection>
    </Box>
  );
}

export function Timeline({ items, title, subtitle }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Animate the main timeline line drawing
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      {/* Section Header */}
      <AnimatedSection animationVariant="fadeInUp" delay={0.2}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 2,
              color: 'text.secondary',
              fontWeight: 500,
              letterSpacing: 1,
            }}
          >
            {subtitle.toUpperCase()}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
        </Box>
      </AnimatedSection>

      {/* Timeline Container */}
      <Box sx={{ position: 'relative', maxWidth: '1000px', mx: 'auto' }}>
        {/* Animated Main Timeline Line */}
        <motion.div
          style={{ 
            height: lineHeight,
            position: 'absolute',
            left: '50%',
            top: 0,
            width: 4,
            background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
            transform: 'translateX(-50%)',
            zIndex: 1,
            borderRadius: 2,
          }}
        />

        {/* Timeline Items */}
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            {...item}
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </Box>
    </Box>
  );
}