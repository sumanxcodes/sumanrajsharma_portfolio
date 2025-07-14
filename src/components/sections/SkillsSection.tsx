'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Skill } from '@/types/sanity';
import { AnimatedSection, AnimatedGridSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SkillCard } from '@/components/ui/PortfolioCard';

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
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
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
      }}
    >
      <AnimatedSection>
        <SectionHeader
          subtitle="SKILLS & EXPERTISE"
          title="Technical Skills"
          description="A comprehensive overview of the technologies, frameworks, and tools I use to build modern web applications."
        />

        {categories.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No skills found. Add some skills in your Sanity CMS.
            </Typography>
          </Box>
        ) : (
          <AnimatedGridSection useContainer={false}>
            <Grid container spacing={4}>
              {categories.map((category, categoryIndex) => (
                <Grid item xs={12} md={6} lg={4} key={category}>
                  <SkillCard
                    title={category}
                    description={`${groupedSkills[category].length} skills`}
                    tags={groupedSkills[category].map(skill => skill.name)}
                    compact
                  />
                </Grid>
              ))}
            </Grid>
          </AnimatedGridSection>
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
      </AnimatedSection>
    </Box>
  );
}