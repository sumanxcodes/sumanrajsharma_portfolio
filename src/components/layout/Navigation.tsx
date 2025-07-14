'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme as useMuiTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education', href: '/education' },
  { label: 'Skills', href: '/skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Typography variant="h6" component="div">
          Suman Raj Sharma
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThemeToggle />
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
              selected={isActive(item.href)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              fontWeight: 500,
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            Suman Raj Sharma
          </Typography>

          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ThemeToggle />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: isActive(item.href)
                      ? 'primary.main'
                      : 'text.primary',
                    fontWeight: isActive(item.href) ? 500 : 400,
                    textTransform: 'none',
                    minWidth: 'auto',
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      color: 'primary.main',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <ThemeToggle />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}