import { Metadata } from 'next';
import { Typography, Grid, Card, CardContent, CardMedia, Box, Chip, Button, CardActions } from '@mui/material';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { client } from '@/lib/sanity.client';
import { projectsQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import Link from 'next/link';
import { Project } from '@/types/sanity';

export const metadata: Metadata = {
  title: 'Projects | Suman Raj Sharma',
  description: 'Explore my portfolio of software development projects, including web applications, mobile apps, and open-source contributions.',
};

async function getProjects(): Promise<Project[]> {
  try {
    return await client.fetch(projectsQuery);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Layout>
      <Section>
        <Container>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 600,
                mb: 2,
                textAlign: 'center',
              }}
            >
              My Projects
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              A collection of projects I've built using various technologies and frameworks.
              Each project represents a unique challenge and learning experience.
            </Typography>
          </Box>

          {projects.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No projects found. Add some projects in your Sanity CMS.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {projects.map((project) => (
                <Grid item xs={12} md={6} lg={4} key={project._id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: (theme) => theme.shadows[8],
                      },
                    }}
                  >
                    {project.image && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={urlForImage(project.image)?.url()}
                        alt={project.title}
                        sx={{
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, lineHeight: 1.6 }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        {project.tags?.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      {project.techStack && project.techStack.length > 0 && (
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                            Tech Stack:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {project.techStack.map((tech) => (
                              <Chip
                                key={tech}
                                label={tech}
                                size="small"
                                variant="filled"
                                color="primary"
                                sx={{ fontSize: '0.75rem' }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                        <Button
                          component={Link}
                          href={`/projects/${project.slug.current}`}
                          variant="outlined"
                          size="small"
                          fullWidth
                        >
                          View Details
                        </Button>
                        {project.githubUrl && (
                          <Button
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="text"
                            size="small"
                          >
                            GitHub
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            size="small"
                          >
                            Demo
                          </Button>
                        )}
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Section>
    </Layout>
  );
}