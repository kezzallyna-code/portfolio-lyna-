/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PortfolioData } from './schema';
import { supabase } from './supabaseClient';
import { supabaseAdmin } from '@/lib/supabaseServer';

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
  const isUUID = (str: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  if (data.about) {
    const { error } = await supabaseAdmin.from('portfolio_about').update({
      name: data.about.name,
      role: data.about.role,
      subtitle: data.about.subtitle,
      description: data.about.description,
      image_url: data.about.imageUrl,
      location: data.about.location,
      status: data.about.status
    }).neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw new Error('Error updating about: ' + JSON.stringify(error));
  }

  if (data.superpowers?.skills) {
    const skills = data.superpowers.skills;
    
    // Delete missing skills FIRST
    const incomingIds = skills.map(s => s.id).filter(id => isUUID(id));
    const { data: existing } = await supabaseAdmin.from('portfolio_skills').select('id');
    const idsToDelete = existing?.map(s => s.id).filter(id => !incomingIds.includes(id)) || [];
    if (idsToDelete.length > 0) {
      await supabaseAdmin.from('portfolio_skills').delete().in('id', idsToDelete);
    }

    // Then upsert
    const { error } = await supabaseAdmin.from('portfolio_skills').upsert(skills.map(skill => {
      const payload: any = {
        title: skill.title,
        description: skill.description,
        icon: skill.icon,
        category: skill.category,
        order: skill.order
      };
      if (isUUID(skill.id)) {
        payload.id = skill.id;
      }
      return payload;
    }));
    if (error) throw new Error('Error updating skills: ' + JSON.stringify(error));
  }

  if (data.superpowers?.software) {
    const software = data.superpowers.software;
    
    // Delete all existing software tools first to avoid duplicates
    await supabaseAdmin.from('portfolio_software_tools').delete().neq('name', 'non_existent_dummy');

    // Insert the updated tools
    const { error } = await supabaseAdmin.from('portfolio_software_tools').insert(software.map(tool => ({
      name: tool.name,
      icon: tool.icon
    })));
    if (error) throw new Error('Error updating software: ' + JSON.stringify(error));
  }

  if (data.projects) {
    const projects = data.projects;
    
    // Delete first
    const incomingIds = projects.map(p => p.id);
    const { data: existing } = await supabaseAdmin.from('portfolio_projects').select('id');
    const idsToDelete = existing?.map(e => e.id).filter(id => !incomingIds.includes(id)) || [];
    if (idsToDelete.length > 0) {
      await supabaseAdmin.from('portfolio_projects').delete().in('id', idsToDelete);
    }

    const { error } = await supabaseAdmin.from('portfolio_projects').upsert(projects.map(proj => ({
      id: proj.id,
      title: proj.title,
      category: proj.category,
      description: proj.description,
      image_url: proj.imageUrl || '',
      case_study_url: proj.caseStudyUrl || '',
      gallery: proj.gallery || [],
      videos: proj.videos || [],
      figma_embed: proj.figmaEmbed,
      github_url: proj.githubUrl,
      live_demo_url: proj.liveDemoUrl,
      technologies: proj.technologies || [],
      challenges: proj.challenges,
      final_solution: proj.finalSolution,
      is_featured: proj.isFeatured,
      status: proj.status
    })));
    if (error) throw new Error('Error updating projects: ' + JSON.stringify(error));
  }

  if (data.experience) {
    const experience = data.experience;
    
    // Delete first
    const incomingIds = experience.map(p => p.id);
    const { data: existing } = await supabaseAdmin.from('portfolio_experiences').select('id');
    const idsToDelete = existing?.map(e => e.id).filter(id => !incomingIds.includes(id)) || [];
    if (idsToDelete.length > 0) {
      await supabaseAdmin.from('portfolio_experiences').delete().in('id', idsToDelete);
    }

    const { error } = await supabaseAdmin.from('portfolio_experiences').upsert(experience.map(exp => ({
      id: exp.id,
      role: exp.role,
      company: exp.company,
      duration: exp.duration,
      start_date: exp.startDate,
      end_date: exp.endDate,
      is_current: exp.isCurrent,
      description: exp.description
    })));
    if (error) throw new Error('Error updating experience: ' + JSON.stringify(error));
  }

  if (data.certifications) {
    const certifications = data.certifications;
    
    // Delete first
    const incomingIds = certifications.map(p => p.id);
    const { data: existing } = await supabaseAdmin.from('portfolio_certifications').select('id');
    const idsToDelete = existing?.map(e => e.id).filter(id => !incomingIds.includes(id)) || [];
    if (idsToDelete.length > 0) {
      await supabaseAdmin.from('portfolio_certifications').delete().in('id', idsToDelete);
    }

    const { error } = await supabaseAdmin.from('portfolio_certifications').upsert(certifications.map(cert => ({
      id: cert.id,
      title: cert.title,
      organization: cert.organization,
      date: cert.date,
      status: cert.status,
      image_url: cert.imageUrl,
      pdf_url: cert.pdfUrl,
      verification_url: cert.verificationUrl
    })));
    if (error) throw new Error('Error updating certifications: ' + JSON.stringify(error));
  }

  if (data.education) {
    const education = data.education;
    
    // Delete first
    const incomingIds = education.map(p => p.id);
    const { data: existing } = await supabaseAdmin.from('portfolio_education').select('id');
    const idsToDelete = existing?.map(e => e.id).filter(id => !incomingIds.includes(id)) || [];
    if (idsToDelete.length > 0) {
      await supabaseAdmin.from('portfolio_education').delete().in('id', idsToDelete);
    }

    const { error } = await supabaseAdmin.from('portfolio_education').upsert(education.map(edu => ({
      id: edu.id,
      degree: edu.degree,
      institution: edu.institution,
      start_date: edu.startDate,
      graduation_year: edu.graduationYear,
      description: edu.description
    })));
    if (error) throw new Error('Error updating education: ' + JSON.stringify(error));
  }

  if (data.languages) {
    const languages = data.languages;
    
    // Delete first
    const incomingIds = languages.map(p => p.id);
    const { data: existing } = await supabaseAdmin.from('portfolio_languages').select('id');
    const idsToDelete = existing?.map(e => e.id).filter(id => !incomingIds.includes(id)) || [];
    if (idsToDelete.length > 0) {
      await supabaseAdmin.from('portfolio_languages').delete().in('id', idsToDelete);
    }

    const { error } = await supabaseAdmin.from('portfolio_languages').upsert(languages.map(lang => ({
      id: lang.id,
      name: lang.name,
      level: lang.level,
      progress: lang.progress,
      display_style: lang.displayStyle
    })));
    if (error) throw new Error('Error updating languages: ' + JSON.stringify(error));
  }

  if (data.uiUxVideos) {
    const uiUxVideos = data.uiUxVideos;
    
    // Delete first
    const incomingIds = uiUxVideos.map(p => p.id);
    const { data: existing } = await supabaseAdmin.from('portfolio_ui_ux_videos').select('id');
    const idsToDelete = existing?.map(e => e.id).filter(id => !incomingIds.includes(id)) || [];
    if (idsToDelete.length > 0) {
      await supabaseAdmin.from('portfolio_ui_ux_videos').delete().in('id', idsToDelete);
    }

    const { error } = await supabaseAdmin.from('portfolio_ui_ux_videos').upsert(uiUxVideos.map(vid => ({
      id: vid.id,
      title: vid.title,
      category: vid.category,
      description: vid.description,
      thumbnail: vid.thumbnail,
      mp4_url: vid.mp4Url,
      figma_embed: vid.figmaEmbed,
      is_published: vid.isPublished
    })));
    if (error) throw new Error('Error updating videos: ' + JSON.stringify(error));
  }

  if (data.socials) {
    const { error } = await supabaseAdmin.from('portfolio_socials').update({
      github: data.socials.github,
      linkedin: data.socials.linkedin,
      twitter: data.socials.twitter,
      instagram: data.socials.instagram,
      dribbble: data.socials.dribbble,
      behance: data.socials.behance,
      youtube: data.socials.youtube,
      email: data.socials.email,
      location: data.socials.location,
      resume_url: data.socials.resumeUrl,
      portfolio_url: data.socials.portfolioUrl
    }).neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw new Error('Error updating socials: ' + JSON.stringify(error));
  }
}
