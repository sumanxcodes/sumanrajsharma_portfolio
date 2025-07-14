'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Profile } from '@/types/sanity';
import { urlForImage } from '@/lib/sanity.image';

interface AboutSectionProps {
  profile: Profile | null;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const avatarUrl = profile?.avatar ? urlForImage(profile.avatar)?.url() : null;

  return (
    <Box
      id="about"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 2,
                    color: 'text.secondary',
                    fontWeight: 500,
                  }}
                >
                  ABOUT ME
                </Typography>
                
                <Typography
                  variant="h2"
                  sx={{
                    mb: 4,
                    fontWeight: 600,
                  }}
                >
                  Creating Digital
                  <br />
                  Experiences
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    lineHeight: 1.8,
                  }}
                >
                  {profile?.shortBio || 'I am a passionate full-stack developer with expertise in modern web technologies. I love solving complex problems and creating intuitive user experiences that make a difference.'}
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                    What I Do
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    • Full-Stack Web Development
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    • Modern React & Next.js Applications
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    • API Design & Backend Development
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Cloud Architecture & DevOps
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Avatar
                    src={avatarUrl || undefined}
                    alt={profile?.name || 'Profile'}
                    sx={{
                      width: { xs: 250, md: 350 },
                      height: { xs: 250, md: 350 },
                      border: '4px solid',
                      borderColor: 'divider',
                    }}
                  />
                </motion.div>
                
                {/* Decorative elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    border: '2px solid',
                    borderColor: 'divider',
                    opacity: 0.3,
                    zIndex: -1,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -20,
                    width: 80,
                    height: 80,
                    bgcolor: 'grey.100',
                    opacity: 0.5,
                    zIndex: -1,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}