import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Typography, Box, Chip, Button, Stack, Divider } from '@mui/material';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { client } from '@/lib/sanity.client';
import { projectBySlugQuery, projectsQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowBack, GitHub, Launch } from '@mui/icons-material';
import { Project } from '@/types/sanity';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    return await client.fetch(projectBySlugQuery, { slug });
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const projects = await client.fetch(projectsQuery);
  return projects.map((project: Project) => ({
    slug: project.slug.current,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found | Suman Raj Sharma',
    };
  }

  const imageUrl = project.image ? urlForImage(project.image)?.url() : null;

  return {
    title: `${project.title} | Projects | Suman Raj Sharma`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  const imageUrl = project.image ? urlForImage(project.image)?.url() : null;

  return (
    <Layout>
      <Section>
        <Container>
          <Box sx={{ mb: 4 }}>
            <Button
              component={Link}
              href="/projects"
              startIcon={<ArrowBack />}
              sx={{ mb: 3 }}
            >
              Back to Projects
            </Button>
          </Box>

          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 600,
                mb: 2,
              }}
            >
              {project.title}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              {project.tags?.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  sx={{ mr: 1, mb: 1 }}
                  variant="outlined"
                />
              ))}
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
              {project.demoUrl && (
                <Button
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  startIcon={<Launch />}
                  size="large"
                >
                  View Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<GitHub />}
                  size="large"
                >
                  View Source Code
                </Button>
              )}
            </Stack>
          </Box>

          {imageUrl && (
            <Box sx={{ mb: 6 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: 250, md: 400 },
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: (theme) => theme.shadows[4],
                }}
              >
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Box>
            </Box>
          )}

          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 3, fontWeight: 600 }}
            >
              About This Project
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                fontSize: '1.1rem',
                color: 'text.secondary',
              }}
            >
              {project.description}
            </Typography>
          </Box>

          {project.techStack && project.techStack.length > 0 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Box sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  Technologies Used
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {project.techStack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      variant="filled"
                      color="primary"
                      sx={{
                        fontSize: '0.9rem',
                        py: 2,
                        px: 1,
                        height: 'auto',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </>
          )}

          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Interested in working together?
            </Typography>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Get in Touch
            </Button>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}