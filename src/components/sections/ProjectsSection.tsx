'use client';

import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Project } from '@/types/sanity';
import { urlForImage } from '@/lib/sanity.image';
import Link from 'next/link';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const featuredProjects = projects.filter(project => project.featured).slice(0, 6);

  return (
    <Box
      id="projects"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'grey.50',
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
              PORTFOLIO
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 600,
              }}
            >
              Featured Projects
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              A selection of projects that showcase my skills in full-stack development,
              UI/UX design, and modern web technologies.
            </Typography>
          </Box>

          {featuredProjects.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No featured projects found. Add some projects in your Sanity CMS.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {featuredProjects.map((project, index) => (
                <Grid item xs={12} md={6} lg={4} key={project._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                        },
                      }}
                    >
                      {project.image && (
                        <CardMedia
                          component="img"
                          height="240"
                          image={urlForImage(project.image)?.url()}
                          alt={project.title}
                          sx={{
                            objectFit: 'cover',
                          }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{
                            mb: 2,
                            fontWeight: 600,
                            lineHeight: 1.3,
                          }}
                        >
                          {project.title}
                        </Typography>
                        
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 3,
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {project.description}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                          {project.tags?.slice(0, 3).map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                mr: 1,
                                mb: 1,
                                fontSize: '0.75rem',
                              }}
                            />
                          ))}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                          {project.demoUrl && (
                            <Button
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="contained"
                              size="small"
                              sx={{ flex: 1 }}
                            >
                              Live Demo
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="outlined"
                              size="small"
                              sx={{ flex: 1 }}
                            >
                              GitHub
                            </Button>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
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
        </motion.div>
      </Container>
    </Box>
  );
}