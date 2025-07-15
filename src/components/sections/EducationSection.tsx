'use client';

import React from 'react';
import { Box, Container } from '@mui/material';
import { Education } from '@/types/sanity';
import { Timeline } from '@/components/ui/Timeline';
import { ParallaxContainer } from '@/components/ui/ParallaxSection';
import { ParallaxBackground, FloatingElement } from '@/components/ui/ParallaxBackground';

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  // Transform education data to timeline format
  const timelineItems = education.map((edu, index) => ({
    title: edu.degree,
    subtitle: edu.gpa ? `GPA: ${edu.gpa}` : '',
    organization: edu.institution,
    startDate: edu.startDate,
    endDate: edu.endDate,
    description: edu.description,
    highlights: edu.description ? [edu.description] : undefined,
    index,
  }));

  return (
    <Box
      id="education"
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
          color="secondary.main"
          sx={{ 
            top: '0%',
            height: '100%',
          }}
        />
        
        <ParallaxBackground 
          speed={0.08} 
          direction="down" 
          gradient="linear" 
          opacity={0.2}
          color="primary.main"
          sx={{ 
            top: '30%',
            height: '70%',
          }}
        />

        {/* Floating Academic Elements */}
        <FloatingElement 
          speed={0.25} 
          amplitude={20}
          sx={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            opacity: 0.1,
            zIndex: 0,
            transform: 'rotate(12deg)',
          }}
        />

        <FloatingElement 
          speed={0.35} 
          amplitude={30}
          delay={0.3}
          sx={{
            position: 'absolute',
            top: '45%',
            left: '5%',
            width: 60,
            height: 60,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '50%',
            opacity: 0.12,
            zIndex: 0,
          }}
        />

        <FloatingElement 
          speed={0.2} 
          amplitude={25}
          delay={0.6}
          sx={{
            position: 'absolute',
            top: '70%',
            right: '15%',
            width: 50,
            height: 50,
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: '10px',
            opacity: 0.08,
            zIndex: 0,
            transform: 'rotate(-15deg)',
          }}
        />

        {/* Geometric Background Patterns */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '5%',
            width: 150,
            height: 150,
            background: 'conic-gradient(from 180deg, rgba(139, 92, 246, 0.08) 0deg, transparent 180deg, rgba(139, 92, 246, 0.08) 360deg)',
            borderRadius: '50%',
            zIndex: 0,
          }}
        />

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Timeline
            title="Educational Journey"
            subtitle="Academic Background"
            items={timelineItems}
          />
        </Container>
      </ParallaxContainer>
    </Box>
  );
}