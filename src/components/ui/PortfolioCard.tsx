'use client';

import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, Chip, IconButton, Button, CardProps } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub, Launch, Code } from '@mui/icons-material';

interface PortfolioCardProps extends Omit<CardProps, 'children' | 'variant'> {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  codeUrl?: string;
  category?: string;
  date?: string;
  variant?: 'project' | 'skill' | 'experience' | 'blog';
  hover?: boolean;
  compact?: boolean;
}

export function PortfolioCard({
  title,
  description,
  image,
  tags = [],
  githubUrl,
  liveUrl,
  codeUrl,
  category,
  date,
  variant = 'project',
  hover = true,
  compact = false,
  sx,
  ...props
}: PortfolioCardProps) {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -8 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'outline.variant',
        backgroundColor: 'surface.container',
        boxShadow: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderColor: 'outline.main',
          boxShadow: theme => theme.palette.mode === 'light' 
            ? '0 8px 32px rgba(0, 0, 0, 0.1)' 
            : '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        ...sx,
      }}
      {...props}
    >
      {/* Image Section */}
      {image && (
        <Box
          sx={{
            height: compact ? 120 : 200,
            background: `linear-gradient(135deg, rgba(39, 174, 96, 0.1) 0%, rgba(39, 174, 96, 0.05) 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          {category && (
            <Chip
              label={category}
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.75rem',
              }}
            />
          )}
        </Box>
      )}

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, p: compact ? 2 : 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography 
            variant={compact ? 'h6' : 'h5'} 
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {date && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.tertiary',
                fontFamily: 'monospace',
                ml: 1,
                flexShrink: 0,
              }}
            >
              {date}
            </Typography>
          )}
        </Box>

        <Typography 
          variant="body2" 
          sx={{ 
            color: 'text.secondary',
            lineHeight: 1.6,
            mb: tags.length > 0 ? 2 : 0,
            display: '-webkit-box',
            WebkitLineClamp: compact ? 2 : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>

        {/* Tags Section */}
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {tags.slice(0, compact ? 3 : 5).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  backgroundColor: 'surface.containerHigh',
                  color: 'text.primary',
                  borderColor: 'outline.variant',
                  '&:hover': {
                    backgroundColor: 'surface.containerHighest',
                  },
                }}
              />
            ))}
            {tags.length > (compact ? 3 : 5) && (
              <Chip
                label={`+${tags.length - (compact ? 3 : 5)}`}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  borderColor: 'outline.variant',
                  color: 'text.tertiary',
                }}
              />
            )}
          </Box>
        )}
      </CardContent>

      {/* Actions Section */}
      {(githubUrl || liveUrl || codeUrl) && (
        <CardActions sx={{ p: compact ? 2 : 3, pt: 0, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {githubUrl && (
              <IconButton
                size="small"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'surface.containerHigh',
                  },
                }}
              >
                <GitHub fontSize="small" />
              </IconButton>
            )}
            {codeUrl && (
              <IconButton
                size="small"
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'surface.containerHigh',
                  },
                }}
              >
                <Code fontSize="small" />
              </IconButton>
            )}
          </Box>
          
          {liveUrl && (
            <Button
              size="small"
              endIcon={<Launch fontSize="small" />}
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              View Live
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}

// Specialized card variants
export function ProjectCard(props: Omit<PortfolioCardProps, 'variant'>) {
  return <PortfolioCard variant="project" {...props} />;
}

export function SkillCard(props: Omit<PortfolioCardProps, 'variant'>) {
  return <PortfolioCard variant="skill" compact {...props} />;
}

export function ExperienceCard(props: Omit<PortfolioCardProps, 'variant'>) {
  return <PortfolioCard variant="experience" {...props} />;
}

export function BlogCard(props: Omit<PortfolioCardProps, 'variant'>) {
  return <PortfolioCard variant="blog" compact {...props} />;
}