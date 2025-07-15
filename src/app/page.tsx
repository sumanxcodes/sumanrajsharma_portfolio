import { Metadata } from 'next';
import { Box } from '@mui/material';
import { SmoothScrollNavigation } from '@/components/layout/SmoothScrollNavigation';
import { HeroTerminalSection } from '@/components/sections/HeroTerminalSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { client } from '@/lib/sanity.client';
import { 
  profileQuery, 
  projectsQuery, 
  skillsQuery, 
  experienceQuery, 
  educationQuery, 
  blogPostsQuery 
} from '@/lib/sanity.queries';
import { Profile, Project, Skill, Experience, Education, BlogPost } from '@/types/sanity';

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
    const [profile, projects, skills, experience, education, blogPosts] = await Promise.all([
      client.fetch(profileQuery),
      client.fetch(projectsQuery),
      client.fetch(skillsQuery),
      client.fetch(experienceQuery),
      client.fetch(educationQuery),
      client.fetch(blogPostsQuery),
    ]);

    return {
      profile: profile as Profile | null,
      projects: projects as Project[],
      skills: skills as Skill[],
      experience: experience as Experience[],
      education: education as Education[],
      blogPosts: blogPosts as BlogPost[],
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return {
      profile: null,
      projects: [],
      skills: [],
      experience: [],
      education: [],
      blogPosts: [],
    };
  }
}

export default async function HomePage() {
  const { profile, projects, skills, experience, education, blogPosts } = await getPortfolioData();

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <SmoothScrollNavigation />
      
      <Box component="main">
        <HeroTerminalSection profile={profile} projects={projects} skills={skills} />
        <AboutSection profile={profile} />
        <ExperienceSection experience={experience} />
        <EducationSection education={education} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <BlogSection blogPosts={blogPosts} />
        <ContactSection />
      </Box>
    </Box>
  );
}