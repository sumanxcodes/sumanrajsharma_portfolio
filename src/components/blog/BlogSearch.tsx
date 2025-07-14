'use client';

import { TextField, InputAdornment, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface BlogSearchProps {
  placeholder?: string;
}

export function BlogSearch({ placeholder = 'Search blog posts...' }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value.trim()) {
      params.set('search', value.trim());
    } else {
      params.delete('search');
    }
    
    // Reset to first page when searching
    params.delete('page');
    
    const queryString = params.toString();
    router.push(`/blog${queryString ? `?${queryString}` : ''}`);
  }, 300);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  // Update local state when URL changes
  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    setSearchValue(searchQuery);
  }, [searchParams]);

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />
    </Box>
  );
}