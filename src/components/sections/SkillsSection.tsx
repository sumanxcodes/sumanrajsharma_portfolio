'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Skill } from '@/types/sanity';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(groupedSkills);

  return (
    <Box
      id="skills"
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
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              SKILLS & EXPERTISE
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 600,
              }}
            >
              Technical Skills
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              A comprehensive overview of the technologies, frameworks, and tools
              I use to build modern web applications.
            </Typography>
          </Box>

          {categories.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No skills found. Add some skills in your Sanity CMS.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {categories.map((category, categoryIndex) => (
                <Grid item xs={12} md={6} lg={4} key={category}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        height: '100%',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 3,
                          fontWeight: 600,
                          color: 'primary.main',
                        }}
                      >
                        {category}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {groupedSkills[category].map((skill) => (
                          <Chip
                            key={skill._id}
                            label={skill.name}
                            variant="outlined"
                            sx={{
                              mb: 1,
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              '&:hover': {
                                bgcolor: 'primary.main',
                                color: 'primary.contrastText',
                              },
                            }}
                          />
                        ))}
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Call to action */}
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 2,
              }}
            >
              Interested in working together?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
              }}
            >
              Let&apos;s build something amazing
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}