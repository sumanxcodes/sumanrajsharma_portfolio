'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Chip, Button, Stack } from '@mui/material';
import { ArrowForward, RssFeed } from '@mui/icons-material';
import Link from 'next/link';
import { BlogPost } from '@/types/sanity';
import { ParallaxContainer, ParallaxSection } from '@/components/ui/ParallaxSection';
import { ParallaxBackground, FloatingElement } from '@/components/ui/ParallaxBackground';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { BlogModal } from '@/components/blog/BlogModal';
import { urlForImage } from '@/lib/sanity.image';

interface BlogSectionProps {
  blogPosts: BlogPost[];
}

function BlogCard({ post, index, onClick }: { post: BlogPost; index: number; onClick: () => void }) {
  const imageUrl = post.coverImage ? urlForImage(post.coverImage)?.url() : null;
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <ParallaxSection 
      speed={0.03 * (index + 1)} 
      sx={{ height: '100%' }}
    >
      <Card
        onClick={onClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: (theme) => theme.shadows[12],
            borderColor: 'primary.main',
            '& .blog-image': {
              transform: 'scale(1.05)',
            }
          },
        }}
      >
        {imageUrl && (
          <Box sx={{ overflow: 'hidden', height: 200 }}>
            <CardMedia
              component="img"
              height="200"
              image={imageUrl}
              alt={post.title}
              className="blog-image"
              sx={{
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
            />
          </Box>
        )}
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {/* Date and Reading Time */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              {formatDate(post.publishedAt)}
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 2,
              lineHeight: 1.3,
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
              sx={{
                color: 'text.secondary',
                mb: 3,
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
          {post.tags && post.tags.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap">
                {post.tags.slice(0, 3).map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '0.75rem',
                      height: 24,
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      }
                    }}
                  />
                ))}
                {post.tags.length > 3 && (
                  <Chip
                    label={`+${post.tags.length - 3}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '0.75rem',
                      height: 24,
                      opacity: 0.7,
                    }}
                  />
                )}
              </Stack>
            </Box>
          )}

          {/* Author */}
          {post.author && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                By {post.author.name}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </ParallaxSection>
  );
}

export function BlogSection({ blogPosts }: BlogSectionProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Show featured posts first, then fill with regular posts up to 6 total
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  // Combine featured and regular posts, limit to 6
  const displayPosts = [...featuredPosts, ...regularPosts].slice(0, 6);

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedPost(null), 200); // Clear after animation
  };

  return (
    <Box
      id="blog"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ParallaxContainer height="auto" overflow="visible">
        {/* Parallax Background Elements */}
        <ParallaxBackground 
          speed={0.15} 
          direction="up" 
          gradient="radial" 
          opacity={0.3}
          color="info.main"
          sx={{ 
            top: '20%',
            height: '60%',
          }}
        />
        
        <ParallaxBackground 
          speed={0.08} 
          direction="down" 
          gradient="linear" 
          opacity={0.2}
          color="warning.main"
          sx={{ 
            top: '50%',
            height: '50%',
          }}
        />

        {/* Floating Blog Elements */}
        <FloatingElement 
          speed={0.3} 
          amplitude={20}
          sx={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: 100,
            height: 100,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '25px',
            opacity: 0.08,
            zIndex: 0,
            transform: 'rotate(15deg)',
          }}
        />

        <FloatingElement 
          speed={0.4} 
          amplitude={25}
          delay={0.3}
          sx={{
            position: 'absolute',
            top: '60%',
            left: '8%',
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '50%',
            opacity: 0.1,
            zIndex: 0,
          }}
        />

        {/* Content Writing Symbols */}
        <FloatingElement 
          speed={0.2} 
          amplitude={15}
          delay={0.6}
          sx={{
            position: 'absolute',
            top: '30%',
            left: '15%',
            width: 60,
            height: 60,
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '15px',
            opacity: 0.06,
            zIndex: 0,
            transform: 'rotate(-10deg)',
          }}
        />

        {/* Floating Text Elements */}
        {['✍️', '📝', '💡', '🚀'].map((emoji, i) => (
          <FloatingElement
            key={i}
            speed={0.15 + i * 0.05}
            amplitude={12 + i * 2}
            delay={i * 0.2}
            sx={{
              position: 'absolute',
              top: `${15 + i * 20}%`,
              right: `${8 + (i % 2) * 15}%`,
              fontSize: '2rem',
              opacity: 0.1,
              zIndex: 0,
            }}
          >
            {emoji}
          </FloatingElement>
        ))}

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <AnimatedSection animationVariant="fadeInUp" delay={0.2}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 2,
                  color: 'text.secondary',
                  fontWeight: 500,
                  letterSpacing: 1,
                }}
              >
                LATEST INSIGHTS
              </Typography>
              
              <Typography
                variant="h2"
                sx={{
                  mb: 4,
                  fontWeight: 600,
                }}
              >
                From the Blog
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                Sharing insights, tutorials, and thoughts on software development,
                technology trends, and my journey as a developer.
              </Typography>

              {/* RSS Feed Button */}
              <Button
                component="a"
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<RssFeed />}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 8,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                  }
                }}
              >
                RSS Feed
              </Button>
            </Box>
          </AnimatedSection>

          {/* Blog Posts Grid */}
          {displayPosts.length === 0 ? (
            <AnimatedSection animationVariant="fadeIn" delay={0.4}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No blog posts found. Add some blog posts in the Sanity Studio at{' '}
                  <Link href="/studio" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    /studio
                  </Link>
                </Typography>
              </Box>
            </AnimatedSection>
          ) : (
            <AnimatedSection animationVariant="staggerChildren" delay={0.4}>
              <Grid container spacing={4}>
                {displayPosts.map((post, index) => (
                  <Grid item xs={12} md={6} lg={4} key={post._id}>
                    <BlogCard 
                      post={post} 
                      index={index} 
                      onClick={() => handleOpenPost(post)}
                    />
                  </Grid>
                ))}
              </Grid>
            </AnimatedSection>
          )}

          {/* View All Button */}
          {blogPosts.length > 6 && (
            <AnimatedSection animationVariant="fadeInUp" delay={0.8}>
              <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Button
                  component={Link}
                  href="/blog"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 8,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  View All Posts
                </Button>
              </Box>
            </AnimatedSection>
          )}
        </Container>
      </ParallaxContainer>

      {/* Blog Modal */}
      <BlogModal
        open={modalOpen}
        onClose={handleCloseModal}
        blogPost={selectedPost}
      />
    </Box>
  );
}