'use client';

import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Chip, 
  Avatar, 
  Box, 
  Stack,
  alpha,
  useTheme
} from '@mui/material';
import { ArrowForward, Schedule } from '@mui/icons-material';
import { BlogPost } from '@/types/sanity';
import { urlForImage } from '@/lib/sanity.image';
import Link from 'next/link';

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.split(' ').length;
  return Math.ceil(words / wordsPerMinute);
}

export function BlogCard({ post }: BlogCardProps) {
  const theme = useTheme();
  const imageUrl = post.coverImage ? urlForImage(post.coverImage)?.url() : null;
  const readingTime = post.metaDescription ? estimateReadingTime(post.metaDescription) : 1;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3, // Material 3 uses larger border radius
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
          '& .blog-card-image': {
            transform: 'scale(1.02)',
          },
          '& .blog-card-read-button': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '& .MuiSvgIcon-root': {
              transform: 'translateX(4px)',
            },
          },
        },
      }}
      elevation={1}
    >
      {/* Cover Image with Overlay */}
      {imageUrl && (
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            height: 200,
          }}
        >
          <CardMedia
            component="img"
            image={imageUrl}
            alt={post.title}
            className="blog-card-image"
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          
          {/* Reading time badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: 'blur(8px)',
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Schedule sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              {readingTime} min read
            </Typography>
          </Box>
        </Box>
      )}

      {/* Content */}
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: 3,
          pb: 1,
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mb: 1.5,
            fontWeight: 600,
            lineHeight: 1.3,
            color: 'text.primary',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </Typography>

        {/* Description */}
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

        {/* Tags */}
        <Box sx={{ mb: 'auto' }}>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            {post.tags?.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              />
            ))}
            {post.tags && post.tags.length > 3 && (
              <Chip
                label={`+${post.tags.length - 3}`}
                size="small"
                variant="filled"
                color="secondary"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                }}
              />
            )}
          </Stack>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          p: 3,
          pt: 0,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Author Info */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {post.author?.avatar && (
            <Avatar
              src={urlForImage(post.author.avatar)?.url()}
              alt={post.author.name}
              sx={{ width: 32, height: 32 }}
            />
          )}
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
              {post.author?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDate(post.publishedAt)}
            </Typography>
          </Box>
        </Stack>

        {/* Read More Button */}
        <Button
          component={Link}
          href={`/blog/${post.slug.current}`}
          variant="outlined"
          size="small"
          endIcon={<ArrowForward />}
          className="blog-card-read-button"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            px: 2,
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '& .MuiSvgIcon-root': {
              fontSize: 16,
              transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          }}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}