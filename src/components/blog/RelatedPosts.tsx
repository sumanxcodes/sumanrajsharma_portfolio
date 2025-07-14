import { Box, Typography, Grid, Card, CardContent, CardMedia, Chip, Stack } from '@mui/material';
import { BlogPost } from '@/types/sanity';
import { urlForImage } from '@/lib/sanity.image';
import Link from 'next/link';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return [];
  }

  const relatedPosts = allPosts
    .filter(post => post._id !== currentPost._id)
    .map(post => {
      const commonTags = post.tags?.filter(tag => 
        currentPost.tags?.includes(tag)
      ) || [];
      return {
        post,
        relevanceScore: commonTags.length,
      };
    })
    .filter(item => item.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3)
    .map(item => item.post);

  return relatedPosts;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  const relatedPosts = getRelatedPosts(currentPost, allPosts);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Related Posts
      </Typography>
      <Grid container spacing={3}>
        {relatedPosts.map((post) => (
          <Grid item xs={12} md={4} key={post._id}>
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
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              {post.coverImage && (
                <CardMedia
                  component="img"
                  height="120"
                  image={urlForImage(post.coverImage)?.url()}
                  alt={post.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
              )}
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    fontSize: '1rem',
                    lineHeight: 1.3,
                    color: 'inherit',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.title}
                </Typography>
                
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1, display: 'block' }}
                >
                  {formatDate(post.publishedAt)}
                </Typography>

                <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
                  {post.tags?.slice(0, 2).map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem', height: 20 }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}