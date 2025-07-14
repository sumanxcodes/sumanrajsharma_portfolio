import { PortableTextBlock } from '@portabletext/types';

export interface ImageAsset {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Profile {
  _id: string;
  _type: 'profile';
  name: string;
  shortBio: string;
  avatar: ImageAsset;
  resumeUrl: string;
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
    twitter?: string;
  };
}

export interface Skill {
  _id: string;
  _type: 'skill';
  name: string;
  category: string;
  level?: number;
}

export interface Experience {
  _id: string;
  _type: 'experience';
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
  logo: ImageAsset;
  location?: string;
}

export interface Education {
  _id: string;
  _type: 'education';
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
  description?: string;
  gpa?: string;
}

export interface Project {
  _id: string;
  _type: 'project';
  title: string;
  slug: {
    current: string;
  };
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  techStack?: string[];
  image: ImageAsset;
  featured?: boolean;
}

export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: {
    current: string;
  };
  body: PortableTextBlock[];
  tags: string[];
  publishedAt: string;
  coverImage: ImageAsset;
  metaTitle?: string;
  metaDescription?: string;
  featured?: boolean;
  author: Author;
}

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  bio: string;
  avatar: ImageAsset;
}