'use client';

import { Box, Chip, Typography, Stack } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface BlogFiltersProps {
  allTags: string[];
  selectedTag?: string;
}

export function BlogFilters({ allTags, selectedTag }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = useCallback((tag: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (selectedTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    
    // Reset to first page when filtering
    params.delete('page');
    
    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ''}`);
  }, [router, searchParams, selectedTag]);

  const handleClearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('tag');
    params.delete('page');
    
    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ''}`);
  }, [router, searchParams]);

  if (allTags.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Filter by Tags
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        <Chip
          label="All Posts"
          onClick={handleClearFilters}
          color={!selectedTag ? 'primary' : 'default'}
          variant={!selectedTag ? 'filled' : 'outlined'}
          sx={{ mb: 1 }}
        />
        {allTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            color={selectedTag === tag ? 'primary' : 'default'}
            variant={selectedTag === tag ? 'filled' : 'outlined'}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Box>
  );
}