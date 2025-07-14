'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Project } from '@/types/sanity';
import { urlForImage } from '@/lib/sanity.image';
import Link from 'next/link';
import { AnimatedSection, AnimatedGridSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/ui/PortfolioCard';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 6);

  return (
    <Box
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'grey.50',
      }}
    >
      <AnimatedSection>
        <SectionHeader
          subtitle="PORTFOLIO"
          title="Featured Projects"
          description="A selection of projects that showcase my skills in full-stack development, UI/UX design, and modern web technologies."
        />

        {featuredProjects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No featured projects found. Add some projects in your Sanity CMS.
            </Typography>
          </Box>
        ) : (
          <AnimatedGridSection useContainer={false}>
            <Grid container spacing={4}>
              {featuredProjects.map((project, index) => (
                <Grid item xs={12} md={6} lg={4} key={project._id}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image ? urlForImage(project.image)?.url() : undefined}
                    tags={project.tags || []}
                    githubUrl={project.githubUrl}
                    liveUrl={project.demoUrl}
                  />
                </Grid>
              ))}
            </Grid>
          </AnimatedGridSection>
        )}

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            href="/projects"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
            }}
          >
            View All Projects
          </Button>
        </Box>
      </AnimatedSection>
    </Box>
  );
}