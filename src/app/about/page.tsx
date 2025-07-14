import { Metadata } from 'next';
import { Typography, Box, Avatar, Stack, Button, Paper, Grid } from '@mui/material';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { client } from '@/lib/sanity.client';
import { profileQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import { Download, GitHub, LinkedIn, Email } from '@mui/icons-material';
import { Profile } from '@/types/sanity';

export const metadata: Metadata = {
  title: 'About | Suman Raj Sharma',
  description: 'Learn more about Suman Raj Sharma - a passionate full-stack developer with expertise in modern web technologies.',
};

async function getProfile(): Promise<Profile | null> {
  try {
    return await client.fetch(profileQuery);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export default async function AboutPage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <Layout>
        <Section>
          <Container>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Profile information not found. Please add your profile in the Sanity CMS.
              </Typography>
            </Box>
          </Container>
        </Section>
      </Layout>
    );
  }

  const avatarUrl = profile.avatar ? urlForImage(profile.avatar)?.url() : null;

  return (
    <Layout>
      <Section>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  src={avatarUrl || undefined}
                  alt={profile.name}
                  sx={{
                    width: { xs: 200, md: 250 },
                    height: { xs: 200, md: 250 },
                    mx: 'auto',
                    mb: 3,
                    boxShadow: 6,
                  }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {profile.name}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Full-Stack Developer
                </Typography>
                
                {/* Social Links */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
                  {profile.socials?.github && (
                    <Button
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      startIcon={<GitHub />}
                      size="small"
                    >
                      GitHub
                    </Button>
                  )}
                  {profile.socials?.linkedin && (
                    <Button
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      startIcon={<LinkedIn />}
                      size="small"
                    >
                      LinkedIn
                    </Button>
                  )}
                  {profile.socials?.email && (
                    <Button
                      href={`mailto:${profile.socials.email}`}
                      variant="outlined"
                      startIcon={<Email />}
                      size="small"
                    >
                      Email
                    </Button>
                  )}
                </Stack>

                {/* Resume Download */}
                {profile.resumeUrl && (
                  <Button
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    startIcon={<Download />}
                    size="large"
                    fullWidth
                    sx={{ maxWidth: 200 }}
                  >
                    Download Resume
                  </Button>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{ fontWeight: 600, mb: 4 }}
                >
                  About Me
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    mb: 6,
                  }}
                >
                  {profile.shortBio}
                </Typography>

                {/* Additional Info Cards */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        height: '100%',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        What I Do
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        I build modern web applications using cutting-edge technologies
                        like React, Node.js, and cloud platforms. I love solving complex
                        problems and creating intuitive user experiences.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        height: '100%',
                        backgroundColor: 'secondary.main',
                        color: 'secondary.contrastText',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        My Approach
                      </Typography>
                      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                        I believe in writing clean, maintainable code and following
                        best practices. I'm passionate about continuous learning
                        and staying up-to-date with the latest industry trends.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* Call to Action */}
          <Box sx={{ textAlign: 'center', mt: 8, py: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Let's Work Together
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              I'm always interested in new opportunities and collaborations.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                href="/contact"
                variant="contained"
                size="large"
                sx={{ px: 4 }}
              >
                Get in Touch
              </Button>
              <Button
                href="/projects"
                variant="outlined"
                size="large"
                sx={{ px: 4 }}
              >
                View My Work
              </Button>
            </Stack>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}