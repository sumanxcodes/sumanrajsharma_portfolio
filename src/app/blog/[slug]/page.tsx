import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Typography, Box, Chip, Avatar, Stack, Button, Divider, IconButton } from '@mui/material';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { client } from '@/lib/sanity.client';
import { blogPostBySlugQuery, blogPostsQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowBack, ContentCopy } from '@mui/icons-material';
import { BlogPost } from '@/types/sanity';
import { CodeBlock } from '@/components/blog/CodeBlock';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await client.fetch(blogPostBySlugQuery, { slug });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostsQuery);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const posts = await client.fetch(blogPostsQuery);
  return posts.map((post: BlogPost) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Suman Raj Sharma',
    };
  }

  const imageUrl = post.coverImage ? urlForImage(post.coverImage)?.url() : null;

  return {
    title: post.metaTitle || `${post.title} | Blog | Suman Raj Sharma`,
    description: post.metaDescription || `Read about ${post.title} on Suman Raj Sharma's blog.`,
    openGraph: {
      title: post.title,
      description: post.metaDescription || `Read about ${post.title} on Suman Raj Sharma's blog.`,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Portable Text components for rich text rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlForImage(value)?.url();
      if (!imageUrl) return null;
      
      return (
        <Box sx={{ my: 4 }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 250, md: 400 },
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Image
              src={imageUrl}
              alt={value.alt || ''}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          {value.caption && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', textAlign: 'center', mt: 1 }}
            >
              {value.caption}
            </Typography>
          )}
        </Box>
      );
    },
    code: ({ value }: any) => (
      <CodeBlock
        code={value.code}
        language={value.language || 'javascript'}
        filename={value.filename}
      />
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <Typography variant="h3" component="h1" sx={{ my: 3, fontWeight: 600 }}>
        {children}
      </Typography>
    ),
    h2: ({ children }: any) => (
      <Typography variant="h4" component="h2" sx={{ my: 3, fontWeight: 600 }}>
        {children}
      </Typography>
    ),
    h3: ({ children }: any) => (
      <Typography variant="h5" component="h3" sx={{ my: 2, fontWeight: 600 }}>
        {children}
      </Typography>
    ),
    normal: ({ children }: any) => (
      <Typography variant="body1" sx={{ my: 2, lineHeight: 1.8 }}>
        {children}
      </Typography>
    ),
    blockquote: ({ children }: any) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: 4,
          borderColor: 'primary.main',
          pl: 3,
          ml: 0,
          my: 3,
          fontStyle: 'italic',
          backgroundColor: 'grey.50',
          py: 2,
          borderRadius: 1,
        }}
      >
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {children}
        </Typography>
      </Box>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <Box component="strong" sx={{ fontWeight: 600 }}>
        {children}
      </Box>
    ),
    em: ({ children }: any) => (
      <Box component="em" sx={{ fontStyle: 'italic' }}>
        {children}
      </Box>
    ),
    code: ({ children }: any) => (
      <Box
        component="code"
        sx={{
          backgroundColor: 'grey.100',
          px: 0.5,
          py: 0.25,
          borderRadius: 0.5,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
        }}
      >
        {children}
      </Box>
    ),
    link: ({ children, value }: any) => (
      <Box
        component="a"
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: 'primary.main',
          textDecoration: 'underline',
          '&:hover': {
            textDecoration: 'none',
          },
        }}
      >
        {children}
      </Box>
    ),
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  // Get all posts for related posts functionality
  const allPosts = await getAllBlogPosts();
  const imageUrl = post.coverImage ? urlForImage(post.coverImage)?.url() : null;

  return (
    <Layout>
      <Section>
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <Button
              component={Link}
              href="/blog"
              startIcon={<ArrowBack />}
              sx={{ mb: 3 }}
            >
              Back to Blog
            </Button>
          </Box>

          <article>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </Typography>
              
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ mb: 3 }}
              >
                {post.author?.avatar && (
                  <Avatar
                    src={urlForImage(post.author.avatar)?.url()}
                    alt={post.author.name}
                    sx={{ width: 48, height: 48 }}
                  />
                )}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {post.author?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(post.publishedAt)}
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ mb: 4 }}>
                {post.tags?.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{ mr: 1, mb: 1 }}
                    variant="outlined"
                  />
                ))}
              </Box>
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
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Box>
              </Box>
            )}

            <Box sx={{ mb: 6 }}>
              {post.body && (
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              )}
            </Box>
          </article>

          {/* Related Posts */}
          <RelatedPosts currentPost={post} allPosts={allPosts} />

          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Enjoyed this post?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Let's connect and discuss more about technology and development.
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