'use client';

import { Box, Pagination, Typography, Select, MenuItem, FormControl, Stack } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  onPageSizeChange?: (newPageSize: number) => void;
}

export function BlogPagination({
  currentPage,
  totalPages,
  totalPosts,
  postsPerPage,
  onPageSizeChange,
}: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(searchParams);
    
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ''}`);
  }, [router, searchParams]);

  const handlePageSizeChange = useCallback((event: any) => {
    const newPageSize = parseInt(event.target.value, 10);
    const params = new URLSearchParams(searchParams);
    
    params.set('limit', newPageSize.toString());
    params.delete('page'); // Reset to first page
    
    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ''}`);
    
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  }, [router, searchParams, onPageSizeChange]);

  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * postsPerPage + 1;
  const endItem = Math.min(currentPage * postsPerPage, totalPosts);

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="body2" color="text.secondary">
          Showing {startItem}-{endItem} of {totalPosts} posts
        </Typography>
        
        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl size="small">
            <Select
              value={postsPerPage}
              onChange={handlePageSizeChange}
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={6}>6 per page</MenuItem>
              <MenuItem value={12}>12 per page</MenuItem>
              <MenuItem value={24}>24 per page</MenuItem>
            </Select>
          </FormControl>
          
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPagination-ul': {
                justifyContent: 'center',
              },
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}