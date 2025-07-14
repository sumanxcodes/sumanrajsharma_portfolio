import { Metadata } from 'next';
import { Box } from '@mui/material';
import { SmoothScrollNavigation } from '@/components/layout/SmoothScrollNavigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ClientTerminal } from '@/components/terminal/ClientTerminal';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
// import { ExperienceSection } from '@/components/sections/ExperienceSection';
// import { BlogSection } from '@/components/sections/BlogSection';
import { client } from '@/lib/sanity.client';
import { profileQuery, projectsQuery, skillsQuery } from '@/lib/sanity.queries';
import { Profile, Project, Skill } from '@/types/sanity';

export const metadata: Metadata = {
  title: 'Suman Raj Sharma - Full-Stack Developer & Creative Problem Solver',
  description: 'Portfolio of Suman Raj Sharma - A passionate full-stack developer specializing in modern web technologies, creating innovative digital experiences.',
  keywords: 'full-stack developer, web development, React, Next.js, TypeScript, portfolio',
  openGraph: {
    title: 'Suman Raj Sharma - Portfolio',
    description: 'Full-Stack Developer & Creative Problem Solver',
    url: 'https://sumanrajsharma.dev',
    siteName: 'Suman Raj Sharma Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suman Raj Sharma - Portfolio',
    description: 'Full-Stack Developer & Creative Problem Solver',
  },
};

async function getPortfolioData() {
  try {
    const [profile, projects, skills] = await Promise.all([
      client.fetch(profileQuery),
      client.fetch(projectsQuery),
      client.fetch(skillsQuery),
    ]);

    return {
      profile: profile as Profile | null,
      projects: projects as Project[],
      skills: skills as Skill[],
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return {
      profile: null,
      projects: [],
      skills: [],
    };
  }
}

export default async function HomePage() {
  const { profile, projects, skills } = await getPortfolioData();

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <SmoothScrollNavigation />
      
      <Box component="main">
        <HeroSection profile={profile} />
        <ClientTerminal profile={profile} projects={projects} skills={skills} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ContactSection />
        {/* 
        TODO: Add these sections as we implement them
        <ExperienceSection />
        <BlogSection />
        */}
      </Box>
    </Box>
  );
}