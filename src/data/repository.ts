/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PortfolioData } from './schema';
import { supabase } from './supabaseClient';

export async function getPortfolioData(): Promise<PortfolioData> {
  const [
    { data: aboutData },
    { data: skillsData },
    { data: softwareData },
    { data: projectsData },
    { data: experienceData },
    { data: certsData },
    { data: educationData },
    { data: languagesData },
    { data: videosData },
    { data: socialsData }
  ] = await Promise.all([
    supabase.from('portfolio_about').select('*').limit(1).single(),
    supabase.from('portfolio_skills').select('*').order('order', { ascending: true }),
    supabase.from('portfolio_software_tools').select('*'),
    supabase.from('portfolio_projects').select('*'),
    supabase.from('portfolio_experiences').select('*'),
    supabase.from('portfolio_certifications').select('*'),
    supabase.from('portfolio_education').select('*'),
    supabase.from('portfolio_languages').select('*'),
    supabase.from('portfolio_ui_ux_videos').select('*'),
    supabase.from('portfolio_socials').select('*').limit(1).single()
  ]);

  return {
    about: {
      name: aboutData?.name || '',
      role: aboutData?.role || '',
      subtitle: aboutData?.subtitle || '',
      description: aboutData?.description || '',
      imageUrl: aboutData?.image_url || '',
      location: aboutData?.location || '',
      status: aboutData?.status || ''
    },
    superpowers: {
      skills: (skillsData || []).map((s: any) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        category: s.category,
        order: s.order
      })),
      software: (softwareData || []).map((s: any) => ({
        name: s.name,
        icon: s.icon
      }))
    },
    projects: (projectsData || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      imageUrl: p.image_url,
      caseStudyUrl: p.case_study_url,
      gallery: p.gallery,
      videos: p.videos,
      figmaEmbed: p.figma_embed,
      githubUrl: p.github_url,
      liveDemoUrl: p.live_demo_url,
      technologies: p.technologies,
      challenges: p.challenges,
      finalSolution: p.final_solution,
      isFeatured: p.is_featured,
      status: p.status
    })),
    experience: (experienceData || []).map((e: any) => ({
      id: e.id,
      role: e.role,
      company: e.company,
      duration: e.duration,
      startDate: e.start_date,
      endDate: e.end_date,
      isCurrent: e.is_current,
      description: e.description
    })),
    certifications: (certsData || []).map((c: any) => ({
      id: c.id,
      title: c.title,
      organization: c.organization,
      date: c.date,
      status: c.status,
      imageUrl: c.image_url,
      pdfUrl: c.pdf_url,
      verificationUrl: c.verification_url
    })),
    education: (educationData || []).map((e: any) => ({
      id: e.id,
      degree: e.degree,
      institution: e.institution,
      startDate: e.start_date,
      graduationYear: e.graduation_year,
      description: e.description
    })),
    languages: (languagesData || []).map((l: any) => ({
      id: l.id,
      name: l.name,
      level: l.level,
      progress: l.progress,
      displayStyle: l.display_style
    })),
    uiUxVideos: (videosData || []).map((v: any) => ({
      id: v.id,
      title: v.title,
      category: v.category,
      description: v.description,
      thumbnail: v.thumbnail,
      mp4Url: v.mp4_url,
      figmaEmbed: v.figma_embed,
      isPublished: v.is_published
    })),
    socials: {
      github: socialsData?.github || '',
      linkedin: socialsData?.linkedin || '',
      twitter: socialsData?.twitter || '',
      instagram: socialsData?.instagram || '',
      dribbble: socialsData?.dribbble || '',
      behance: socialsData?.behance || '',
      youtube: socialsData?.youtube || '',
      email: socialsData?.email || '',
      location: socialsData?.location || '',
      resumeUrl: socialsData?.resume_url || '',
      portfolioUrl: socialsData?.portfolio_url || ''
    }
  };
}

export async function updatePortfolioData(data: Partial<PortfolioData>): Promise<void> {
  // Update logic to be implemented depending on what part of data is being updated.
  // We can leave this as a not implemented for now since the frontend typically reads from the DB.
  // If the admin panel is actively writing, we'd need to implement upserts similar to our migration script.
  console.warn("updatePortfolioData is deprecated. Use direct Supabase inserts/updates from the admin panel.");
}
