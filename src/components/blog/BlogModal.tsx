'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  Chip,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  SlideProps,
} from '@mui/material';
import { Close, CalendarToday, Person, Share, Bookmark } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { BlogPost } from '@/types/sanity';
import { urlForImage } from '@/lib/sanity.image';

interface BlogModalProps {
  open: boolean;
  onClose: () => void;
  blogPost: BlogPost | null;
}

// Portable Text components for rich content rendering
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <Typography variant="h2" component="h1" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
        {children}
      </Typography>
    ),
    h2: ({ children }: any) => (
      <Typography variant="h3" component="h2" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
        {children}
      </Typography>
    ),
    h3: ({ children }: any) => (
      <Typography variant="h4" component="h3" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
        {children}
      </Typography>
    ),
    h4: ({ children }: any) => (
      <Typography variant="h5" component="h4" sx={{ mt: 2, mb: 1.5, fontWeight: 600 }}>
        {children}
      </Typography>
    ),
    normal: ({ children }: any) => (
      <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }}>
        {children}
      </Typography>
    ),
    blockquote: ({ children }: any) => (
      <Box
        sx={{
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          pl: 3,
          py: 1,
          my: 3,
          bgcolor: 'action.hover',
          borderRadius: 1,
        }}
      >
        <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          {children}
        </Typography>
      </Box>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong style={{ fontWeight: 600 }}>{children}</strong>
    ),
    em: ({ children }: any) => (
      <em style={{ fontStyle: 'italic' }}>{children}</em>
    ),
    code: ({ children }: any) => (
      <Box
        component="code"
        sx={{
          bgcolor: 'action.hover',
          color: 'primary.main',
          px: 0.5,
          py: 0.25,
          borderRadius: 0.5,
          fontSize: '0.875em',
          fontFamily: 'monospace',
        }}
      >
        {children}
      </Box>
    ),
  },
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlForImage(value)?.url();
      return (
        <Box sx={{ my: 4 }}>
          <Box
            component="img"
            src={imageUrl}
            alt={value.alt || 'Blog post image'}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
          {value.alt && (
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                mt: 1,
                color: 'text.secondary',
                fontStyle: 'italic',
              }}
            >
              {value.alt}
            </Typography>
          )}
        </Box>
      );
    },
    code: ({ value }: any) => (
      <Box sx={{ my: 3 }}>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mb: 1,
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {value.filename || value.language || 'Code'}
        </Typography>
        <Box
          component="pre"
          sx={{
            bgcolor: 'grey.900',
            color: 'grey.100',
            p: 2,
            borderRadius: 2,
            overflow: 'auto',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
            lineHeight: 1.6,
          }}
        >
          <code>{value.code}</code>
        </Box>
      </Box>
    ),
  },
};

export function BlogModal({ open, onClose, blogPost }: BlogModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  if (!blogPost) return null;

  const coverImageUrl = blogPost.coverImage ? urlForImage(blogPost.coverImage)?.url() : null;
  const authorAvatarUrl = blogPost.author?.avatar ? urlForImage(blogPost.author.avatar)?.url() : null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.metaDescription || 'Check out this blog post',
          url: `${window.location.origin}/blog/${blogPost.slug.current}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const url = `${window.location.origin}/blog/${blogPost.slug.current}`;
      navigator.clipboard.writeText(url).then(() => {
        // You could show a toast notification here
        console.log('URL copied to clipboard');
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          maxHeight: '95vh',
          m: isMobile ? 0 : 2,
        },
      }}
      TransitionComponent={isMobile ? Slide : Fade}
      {...(isMobile && { TransitionProps: { direction: 'up' as const } as SlideProps })}
    >
      <DialogTitle
        sx={{
          p: 0,
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
              Blog Post
            </Typography>
            {blogPost.featured && (
              <Chip
                label="Featured"
                size="small"
                color="primary"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={handleShare} size="small" title="Share">
              <Share />
            </IconButton>
            <IconButton onClick={onClose} size="small">
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0, overflow: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cover Image */}
          {coverImageUrl && (
            <Box
              sx={{
                width: '100%',
                height: { xs: 200, md: 300 },
                backgroundImage: `url(${coverImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  p: 3,
                }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {blogPost.title}
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ p: { xs: 2, md: 4 } }}>
            {/* Title (if no cover image) */}
            {!coverImageUrl && (
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                {blogPost.title}
              </Typography>
            )}

            {/* Meta Information */}
            <Box sx={{ mb: 4 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                sx={{ mb: 2 }}
              >
                {/* Author */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={authorAvatarUrl || undefined}
                    alt={blogPost.author?.name || 'Author'}
                    sx={{ width: 32, height: 32 }}
                  >
                    <Person />
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {blogPost.author?.name || 'Anonymous'}
                  </Typography>
                </Box>

                {/* Published Date */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(blogPost.publishedAt)}
                  </Typography>
                </Box>
              </Stack>

              {/* Meta Description */}
              {blogPost.metaDescription && (
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontStyle: 'italic',
                    mb: 2,
                    lineHeight: 1.6,
                  }}
                >
                  {blogPost.metaDescription}
                </Typography>
              )}

              {/* Tags */}
              {blogPost.tags && blogPost.tags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {blogPost.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.75rem',
                        '&:hover': {
                          borderColor: 'primary.main',
                          color: 'primary.main',
                        },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            {/* Blog Content */}
            <Box
              sx={{
                '& > *:first-of-type': { mt: 0 },
                '& > *:last-child': { mb: 0 },
              }}
            >
              {blogPost.body ? (
                <PortableText
                  value={blogPost.body}
                  components={portableTextComponents}
                />
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No content available for this blog post.
                </Typography>
              )}
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                mt: 6,
                pt: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Thank you for reading!
              </Typography>
              
              <Stack direction="row" spacing={1}>
                <IconButton size="small" onClick={handleShare} title="Share this post">
                  <Share />
                </IconButton>
                <IconButton size="small" title="Bookmark">
                  <Bookmark />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}