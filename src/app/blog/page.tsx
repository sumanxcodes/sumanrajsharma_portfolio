import { Metadata } from 'next';
import { Typography, Grid, Card, CardContent, CardMedia, Box, Chip, Avatar, Stack } from '@mui/material';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { client } from '@/lib/sanity.client';
import { blogPostsQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import Link from 'next/link';
import { BlogPost } from '@/types/sanity';

export const metadata: Metadata = {
  title: 'Blog | Suman Raj Sharma',
  description: 'Read my latest thoughts on software development, technology trends, and programming insights.',
};

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostsQuery);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

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
              Blog
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
              Sharing insights, tutorials, and thoughts on software development,
              technology trends, and my journey as a developer.
            </Typography>
          </Box>

          {blogPosts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No blog posts found. Add some blog posts in your Sanity CMS.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {blogPosts.map((post) => (
                <Grid item xs={12} md={6} lg={4} key={post._id}>
                  <Card
                    component={Link}
                    href={`/blog/${post.slug.current}`}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: (theme) => theme.shadows[8],
                      },
                    }}
                  >
                    {post.coverImage && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={urlForImage(post.coverImage)?.url()}
                        alt={post.title}
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
                          color: 'inherit',
                        }}
                      >
                        {post.title}
                      </Typography>
                      
                      {post.metaDescription && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.metaDescription}
                        </Typography>
                      )}

                      <Box sx={{ mb: 2 }}>
                        {post.tags?.slice(0, 3).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                            variant="outlined"
                          />
                        ))}
                        {post.tags && post.tags.length > 3 && (
                          <Chip
                            label={`+${post.tags.length - 3} more`}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                            variant="outlined"
                            color="secondary"
                          />
                        )}
                      </Box>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ mt: 'auto' }}
                      >
                        {post.author?.avatar && (
                          <Avatar
                            src={urlForImage(post.author.avatar)?.url()}
                            alt={post.author.name}
                            sx={{ width: 32, height: 32 }}
                          />
                        )}
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography variant="body2" color="text.secondary">
                            {post.author?.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(post.publishedAt)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
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