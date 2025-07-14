'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Profile } from '@/types/sanity';

interface HeroSectionProps {
  profile: Profile | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              textAlign: 'center',
              py: { xs: 8, md: 12 },
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              PORTFOLIO
            </Typography>
            
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {profile?.name || 'Suman Raj Sharma'}
            </Typography>
            
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                color: 'text.secondary',
                fontWeight: 300,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Full-Stack Developer & Creative Problem Solver
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
                color: 'text.secondary',
                lineHeight: 1.8,
              }}
            >
              {profile?.shortBio || 'Building exceptional digital experiences with modern technologies. Passionate about creating innovative solutions and sharing knowledge through code.'}
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="contained"
                size="large"
                href="#projects"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                View Projects
              </Button>
              <Button
                variant="outlined"
                size="large"
                href="#contact"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                Get In Touch
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
      
      {/* Scroll indicator */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Box
          sx={{
            width: 1,
            height: 40,
            bgcolor: 'text.secondary',
            mx: 'auto',
            opacity: 0.6,
          }}
        />
      </motion.div>
    </Box>
  );
}