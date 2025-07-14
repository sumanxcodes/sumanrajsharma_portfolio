import { Metadata } from 'next';
import { Typography, Grid, Box, IconButton, Stack } from '@mui/material';
import { RssFeed } from '@mui/icons-material';
import { Layout } from '@/components/layout/Layout';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { client } from '@/lib/sanity.client';
import { blogPostsQuery } from '@/lib/sanity.queries';
import { BlogPost } from '@/types/sanity';
import { BlogFilters } from '@/components/blog/BlogFilters';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { BlogCard } from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | Suman Raj Sharma',
  description: 'Read my latest thoughts on software development, technology trends, and programming insights.',
};

interface BlogPageProps {
  searchParams: {
    tag?: string;
    search?: string;
    page?: string;
    limit?: string;
  };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return await client.fetch(blogPostsQuery);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

function filterBlogPosts(posts: BlogPost[], searchParams: BlogPageProps['searchParams']) {
  let filteredPosts = posts;

  // Filter by tag
  if (searchParams.tag) {
    filteredPosts = filteredPosts.filter(post => 
      post.tags?.includes(searchParams.tag!)
    );
  }

  // Filter by search query
  if (searchParams.search) {
    const searchTerm = searchParams.search.toLowerCase();
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.metaDescription?.toLowerCase().includes(searchTerm) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  return filteredPosts;
}

function paginatePosts(posts: BlogPost[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return posts.slice(startIndex, endIndex);
}

function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}


export default async function BlogPage({ searchParams }: BlogPageProps) {
  const allBlogPosts = await getBlogPosts();
  const filteredPosts = filterBlogPosts(allBlogPosts, searchParams);
  
  // Pagination logic
  const currentPage = parseInt(searchParams.page || '1', 10);
  const postsPerPage = parseInt(searchParams.limit || '6', 10);
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const paginatedPosts = paginatePosts(filteredPosts, currentPage, postsPerPage);
  
  // Get all unique tags for filtering
  const allTags = getAllTags(allBlogPosts);

  return (
    <Layout>
      <Section>
        <Container>
          <Box sx={{ mb: 6 }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                Blog
              </Typography>
              <IconButton
                component="a"
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={{ '&:hover': { color: 'primary.dark' } }}
                aria-label="RSS Feed"
              >
                <RssFeed />
              </IconButton>
            </Stack>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                textAlign: 'center',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                mb: 4,
              }}
            >
              Sharing insights, tutorials, and thoughts on software development,
              technology trends, and my journey as a developer.
            </Typography>
          </Box>

          {/* Search and Filters */}
          <BlogSearch />
          <BlogFilters allTags={allTags} selectedTag={searchParams.tag} />

          {paginatedPosts.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                {allBlogPosts.length === 0 
                  ? 'No blog posts found. Add some blog posts in your Sanity CMS.'
                  : `No blog posts found matching your ${searchParams.search ? 'search' : 'filters'}.`
                }
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={4}>
                {paginatedPosts.map((post) => (
                  <Grid item xs={12} md={6} lg={4} key={post._id}>
                    <BlogCard post={post} />
                  </Grid>
                ))}
              </Grid>
              
              {/* Pagination */}
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalPosts={totalPosts}
                postsPerPage={postsPerPage}
              />
            </>
          )}
        </Container>
      </Section>
    </Layout>
  );
}