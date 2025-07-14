import { Typography, Button, Box } from '@mui/material';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

export default function Home() {
  return (
    <Layout>
      <Section>
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              minHeight: '60vh',
              gap: 3,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 400,
                color: 'primary.main',
                mb: 2,
              }}
            >
              Suman Raj Sharma
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              Full-Stack Developer & Creative Problem Solver
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: '500px',
                mb: 4,
              }}
            >
              Building exceptional digital experiences with modern technologies.
              Portfolio coming soon with projects, blog posts, and more.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '20px',
                  px: 4,
                  py: 1.5,
                }}
              >
                View Projects
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: '20px',
                  px: 4,
                  py: 1.5,
                }}
              >
                Contact Me
              </Button>
            </Box>
          </Box>
        </Container>
      </Section>
    </Layout>
  );
}