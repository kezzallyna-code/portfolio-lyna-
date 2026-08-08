import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  const dataPath = path.join(process.cwd(), 'src/data/json/portfolio.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // 1. About
  if (data.about) {
    const { error } = await supabase.from('portfolio_about').upsert([{
      name: data.about.name,
      role: data.about.role,
      subtitle: data.about.subtitle,
      description: data.about.description,
      image_url: data.about.imageUrl,
      location: data.about.location,
      status: data.about.status
    }]);
    if (error) console.error('Error inserting about:', error);
    else console.log('About migrated.');
  }

  // 2. Skills
  if (data.superpowers?.skills) {
    for (const skill of data.superpowers.skills) {
      const { error } = await supabase.from('portfolio_skills').upsert([{
        title: skill.title,
        description: skill.description,
        icon: skill.icon,
        category: skill.category,
        order: skill.order
      }]);
      if (error) console.error('Error inserting skill:', error);
    }
    console.log('Skills migrated.');
  }

  // 3. Software Tools
  if (data.superpowers?.software) {
    for (const tool of data.superpowers.software) {
      const { error } = await supabase.from('portfolio_software_tools').upsert([{
        name: tool.name,
        icon: tool.icon
      }]);
      if (error) console.error('Error inserting software tool:', error);
    }
    console.log('Software tools migrated.');
  }

  // 4. Projects
  if (data.projects) {
    for (const proj of data.projects) {
      const { error } = await supabase.from('portfolio_projects').upsert([{
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
      }]);
      if (error) console.error('Error inserting project:', error);
    }
    console.log('Projects migrated.');
  }

  // 5. Experience
  if (data.experience) {
    for (const exp of data.experience) {
      const { error } = await supabase.from('portfolio_experiences').upsert([{
        id: exp.id,
        role: exp.role,
        company: exp.company,
        duration: exp.duration,
        start_date: exp.startDate,
        end_date: exp.endDate,
        is_current: exp.isCurrent,
        description: exp.description
      }]);
      if (error) console.error('Error inserting experience:', error);
    }
    console.log('Experiences migrated.');
  }

  // 6. Certifications
  if (data.certifications) {
    for (const cert of data.certifications) {
      const { error } = await supabase.from('portfolio_certifications').upsert([{
        id: cert.id,
        title: cert.title,
        organization: cert.organization,
        date: cert.date,
        status: cert.status,
        image_url: cert.imageUrl,
        pdf_url: cert.pdfUrl,
        verification_url: cert.verificationUrl
      }]);
      if (error) console.error('Error inserting certification:', error);
    }
    console.log('Certifications migrated.');
  }

  // 7. Education
  if (data.education) {
    for (const edu of data.education) {
      const { error } = await supabase.from('portfolio_education').upsert([{
        id: edu.id,
        degree: edu.degree,
        institution: edu.institution,
        start_date: edu.startDate,
        graduation_year: edu.graduationYear,
        description: edu.description
      }]);
      if (error) console.error('Error inserting education:', error);
    }
    console.log('Education migrated.');
  }

  // 8. Languages
  if (data.languages) {
    for (const lang of data.languages) {
      const { error } = await supabase.from('portfolio_languages').upsert([{
        id: lang.id,
        name: lang.name,
        level: lang.level,
        progress: lang.progress,
        display_style: lang.displayStyle
      }]);
      if (error) console.error('Error inserting language:', error);
    }
    console.log('Languages migrated.');
  }

  // 9. UI/UX Videos
  if (data.uiUxVideos) {
    for (const vid of data.uiUxVideos) {
      const { error } = await supabase.from('portfolio_ui_ux_videos').upsert([{
        id: vid.id,
        title: vid.title,
        category: vid.category,
        description: vid.description,
        thumbnail: vid.thumbnail,
        mp4_url: vid.mp4Url,
        figma_embed: vid.figmaEmbed,
        is_published: vid.isPublished
      }]);
      if (error) console.error('Error inserting video:', error);
    }
    console.log('Videos migrated.');
  }

  // 10. Socials
  if (data.socials) {
    const { error } = await supabase.from('portfolio_socials').upsert([{
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
    }]);
    if (error) console.error('Error inserting socials:', error);
    else console.log('Socials migrated.');
  }

  console.log('Migration completed.');
}

migrate();
