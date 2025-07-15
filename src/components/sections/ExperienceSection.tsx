'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { Experience } from '@/types/sanity';
import { Timeline } from '@/components/ui/Timeline';
import { ParallaxContainer } from '@/components/ui/ParallaxSection';
import { ParallaxBackground, FloatingElement } from '@/components/ui/ParallaxBackground';
import { urlForImage } from '@/lib/sanity.image';

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  // Transform experience data to timeline format
  const timelineItems = experience.map((exp, index) => ({
    title: exp.title,
    subtitle: exp.location || '',
    organization: exp.company,
    startDate: exp.startDate,
    endDate: exp.endDate,
    highlights: exp.highlights || [],
    logo: exp.logo ? urlForImage(exp.logo)?.url() : undefined,
    index,
  }));

  return (
    <Box
      id="experience"
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
          speed={0.12} 
          direction="down" 
          gradient="radial" 
          opacity={0.25}
          color="primary.main"
          sx={{ 
            top: '10%',
            height: '80%',
          }}
        />
        
        <ParallaxBackground 
          speed={0.18} 
          direction="up" 
          gradient="linear" 
          opacity={0.15}
          color="secondary.main"
          sx={{ 
            top: '40%',
            height: '60%',
          }}
        />

        {/* Professional Floating Elements */}
        <FloatingElement 
          speed={0.3} 
          amplitude={18}
          sx={{
            position: 'absolute',
            top: '20%',
            left: '8%',
            width: 70,
            height: 70,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '15px',
            opacity: 0.12,
            zIndex: 0,
            transform: 'rotate(25deg)',
          }}
        />

        <FloatingElement 
          speed={0.4} 
          amplitude={22}
          delay={0.2}
          sx={{
            position: 'absolute',
            top: '55%',
            right: '10%',
            width: 90,
            height: 90,
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
            borderRadius: '50%',
            opacity: 0.1,
            zIndex: 0,
          }}
        />

        <FloatingElement 
          speed={0.25} 
          amplitude={15}
          delay={0.5}
          sx={{
            position: 'absolute',
            top: '75%',
            left: '12%',
            width: 55,
            height: 55,
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            borderRadius: '12px',
            opacity: 0.09,
            zIndex: 0,
            transform: 'rotate(-20deg)',
          }}
        />

        {/* Career Progress Indicators */}
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            right: '5%',
            width: 120,
            height: 120,
            background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
            borderRadius: '30px',
            transform: 'rotate(45deg)',
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '8%',
            width: 100,
            height: 100,
            background: 'conic-gradient(from 90deg, rgba(139, 92, 246, 0.08) 0deg, transparent 120deg, rgba(139, 92, 246, 0.08) 240deg, transparent 360deg)',
            borderRadius: '50%',
            zIndex: 0,
          }}
        />

        {/* Professional Network Dots */}
        {[...Array(6)].map((_, i) => (
          <FloatingElement
            key={i}
            speed={0.1 + i * 0.05}
            amplitude={10 + i * 3}
            delay={i * 0.1}
            sx={{
              position: 'absolute',
              top: `${20 + i * 12}%`,
              right: `${5 + (i % 2) * 10}%`,
              width: 8 + i * 2,
              height: 8 + i * 2,
              bgcolor: 'primary.main',
              borderRadius: '50%',
              opacity: 0.15 - i * 0.02,
              zIndex: 0,
            }}
          />
        ))}

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Timeline
            title="Professional Experience"
            subtitle="Career Journey"
            items={timelineItems}
          />
        </Container>
      </ParallaxContainer>
    </Box>
  );
}