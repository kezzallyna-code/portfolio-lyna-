export interface AboutData {
  name: string;
  role: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  location?: string;
  status?: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
  order?: number;
}

export interface SoftwareTool {
  name: string;
  icon: string;
}

export interface TechnicalSuperpowersData {
  skills: Skill[];
  software: SoftwareTool[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  caseStudyUrl: string;
  gallery?: string[];
  videos?: string[];
  figmaEmbed?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  technologies?: string[];
  challenges?: string;
  finalSolution?: string;
  isFeatured?: boolean;
  status?: 'draft' | 'published';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  date: string;
  status?: string; // 'completed', 'coming-soon'
  imageUrl?: string;
  pdfUrl?: string;
  verificationUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate?: string;
  graduationYear: string;
  description: string;
}

export interface Language {
  id: string;
  name: string;
  level: string; // e.g., Native, Fluent, C1, B2
  progress?: number;
  displayStyle?: 'bar' | 'circle' | 'text';
}

export interface UiUxVideo {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  mp4Url?: string;
  figmaEmbed?: string;
  isPublished?: boolean;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
  location?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
}

export interface PortfolioData {
  about: AboutData;
  superpowers: TechnicalSuperpowersData;
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
  uiUxVideos: UiUxVideo[];
  socials: SocialLinks;
}
