import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Email,
  Twitter,
} from '@mui/icons-material';
import Link from 'next/link';

const socialLinks = [
  {
    name: 'GitHub',
    icon: GitHub,
    href: 'https://github.com/sumanxcodes',
  },
  {
    name: 'LinkedIn',
    icon: LinkedIn,
    href: 'https://linkedin.com/in/sumanrajsharma',
  },
  {
    name: 'Email',
    icon: Email,
    href: 'mailto:contact@sumanrajsharma.com',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/sumanxcodes',
  },
];

const footerLinks = {
  'Quick Links': [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  'Professional': [
    { label: 'Experience', href: '/experience' },
    { label: 'Skills', href: '/skills' },
    { label: 'Education', href: '/education' },
    { label: 'Resume', href: '/resume' },
  ],
};

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'surface.container',
        mt: 'auto',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'outline.variant',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 500,
                color: 'primary.main',
                mb: 2,
              }}
            >
              Suman Raj Sharma
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              Full-stack developer passionate about creating innovative solutions
              and sharing knowledge through code and writing.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <IconButton
                    key={social.name}
                    component={MuiLink}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'primary.container',
                      },
                    }}
                    aria-label={social.name}
                  >
                    <IconComponent fontSize="small" />
                  </IconButton>
                );
              })}
            </Box>
          </Grid>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={6} md={2} key={title}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 500,
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                {title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {links.map((link) => (
                  <MuiLink
                    key={link.href}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Newsletter/Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 500,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.6 }}
            >
              Interested in collaboration or have a project in mind? 
              Let's connect and create something amazing together.
            </Typography>
            <MuiLink
              component={Link}
              href="/contact"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Contact Me →
            </MuiLink>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'outline.variant' }} />

        {/* Copyright Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Suman Raj Sharma. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            Built with
            <MuiLink
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              Next.js
            </MuiLink>
            &
            <MuiLink
              href="https://sanity.io"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              Sanity
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}