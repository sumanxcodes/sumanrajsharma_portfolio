import { groq } from 'next-sanity';

// Profile query
export const profileQuery = groq`
  *[_type == "profile"][0] {
    _id,
    name,
    shortBio,
    avatar,
    resumeUrl,
    socials
  }
`;

// Skills query
export const skillsQuery = groq`
  *[_type == "skill"] | order(category asc, name asc) {
    _id,
    name,
    category,
    level
  }
`;

// Experience query
export const experienceQuery = groq`
  *[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    title,
    startDate,
    endDate,
    location,
    highlights,
    logo
  }
`;

// Education query
export const educationQuery = groq`
  *[_type == "education"] | order(endDate desc) {
    _id,
    institution,
    degree,
    startDate,
    endDate,
    gpa,
    description
  }
`;

// Projects query
export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    tags,
    techStack,
    githubUrl,
    demoUrl,
    featured
  }
`;

// Featured projects query
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(_createdAt desc) [0..2] {
    _id,
    title,
    slug,
    description,
    image,
    tags,
    techStack,
    githubUrl,
    demoUrl
  }
`;

// Single project query
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image,
    tags,
    techStack,
    githubUrl,
    demoUrl,
    featured
  }
`;

// Blog posts query
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    metaDescription,
    tags,
    featured,
    author-> {
      name,
      avatar
    }
  }
`;

// Featured blog posts query
export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0..2] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    metaDescription,
    tags,
    author-> {
      name,
      avatar
    }
  }
`;

// Single blog post query
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    body,
    publishedAt,
    coverImage,
    metaTitle,
    metaDescription,
    tags,
    author-> {
      name,
      bio,
      avatar
    }
  }
`;

// Related blog posts query
export const relatedBlogPostsQuery = groq`
  *[_type == "blogPost" && defined(tags) && count(tags[@ in $tags]) > 0 && slug.current != $slug] | order(publishedAt desc) [0..2] {
    _id,
    title,
    slug,
    publishedAt,
    coverImage,
    metaDescription,
    tags,
    author-> {
      name,
      avatar
    }
  }
`;

// All authors query
export const authorsQuery = groq`
  *[_type == "author"] {
    _id,
    name,
    bio,
    avatar
  }
`;