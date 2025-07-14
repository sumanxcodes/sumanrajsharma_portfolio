'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Email, GitHub, LinkedIn } from '@mui/icons-material';

export function ContactSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: Implement actual form submission
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: <Email />,
      href: 'mailto:contact@sumanrajsharma.dev',
      label: 'contact@sumanrajsharma.dev',
    },
    {
      name: 'GitHub',
      icon: <GitHub />,
      href: 'https://github.com/sumanxcodes',
      label: 'github.com/sumanxcodes',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedIn />,
      href: 'https://linkedin.com/in/sumanrajsharma',
      label: 'linkedin.com/in/sumanrajsharma',
    },
  ];

  return (
    <Box
      id="contact"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'grey.50',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 2,
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              GET IN TOUCH
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                fontWeight: 600,
              }}
            >
              Let&apos;s Work Together
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Have a project in mind or want to collaborate? I&apos;d love to hear from you.
              Send me a message and let&apos;s create something amazing together.
            </Typography>
          </Box>

          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Send a Message
                  </Typography>

                  {submitStatus === 'success' && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Thank you for your message! I&apos;ll get back to you soon.
                    </Alert>
                  )}

                  {submitStatus === 'error' && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      Something went wrong. Please try again or contact me directly via email.
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={isSubmitting}
                          sx={{
                            px: 4,
                            py: 1.5,
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <CircularProgress size={20} sx={{ mr: 1 }} />
                              Sending...
                            </>
                          ) : (
                            'Send Message'
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Box sx={{ pl: { md: 4 } }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Connect With Me
                  </Typography>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      color: 'text.secondary',
                      lineHeight: 1.7,
                    }}
                  >
                    I&apos;m always excited to discuss new opportunities, creative projects,
                    or just chat about technology and development.
                  </Typography>

                  <Box sx={{ space: 3 }}>
                    {socialLinks.map((link, index) => (
                      <Box
                        key={link.name}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 3,
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'grey.50',
                          },
                        }}
                        component="a"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <Box sx={{ mr: 2, color: 'primary.main' }}>
                          {link.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                            {link.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {link.label}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}