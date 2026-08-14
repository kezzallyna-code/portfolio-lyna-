import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function GET() {
  try {
    const newProjects = [
      {
        id: "1786671834614-amana",
        title: "Amana",
        category: "FinTech · Investment · Dashboard · UI/UX",
        description: "A modern investment platform designed to make financial opportunities easier to explore and manage through a clean, structured, and user-friendly interface.",
        image_url: "",
        case_study_url: "",
        figma_embed: "https://www.figma.com/design/IHrqI6vRFFqL0UJJsquhLT/amannaa?t=GJ1OguveKGAfAFX2-0",
        github_url: "https://github.com/kezzallyna-code/amana",
        live_demo_url: "https://amana-44oa-nt9sbj7vj-kezzallyna-codes-projects.vercel.app/",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma", "Vercel"],
        challenges: "Presenting financial information in a clear and accessible way.",
        final_solution: "A digital investment experience focused on presenting financial information in a clear and accessible way.",
        is_featured: true,
        status: 'published'
      },
      {
        id: "1786671834615-nibel",
        title: "Nibel",
        category: "PropTech · Real Estate · Branding · UI/UX",
        description: "Nibel is a modern real estate platform that connects buyers, sellers, and renters with properties efficiently. The platform streamlines property discovery, communication, and transaction management.",
        image_url: "",
        case_study_url: "",
        figma_embed: "https://www.figma.com/design/zL0t5l28C2EksnNtb0d4e9/Nibel?t=GJ1OguveKGAfAFX2-0",
        github_url: "https://github.com/kezzallyna-code/nibel-real-estate",
        live_demo_url: "https://nibel-real-estate.vercel.app/",
        technologies: ["React", "Node.js", "MongoDB", "Figma"],
        challenges: "Simplifying property search and agent communication.",
        final_solution: "A modern real estate platform with advanced filtering and seamless agent communication tools.",
        is_featured: true,
        status: 'published'
      },
      {
        id: "1786671834616-oumouma",
        title: "oumouma",
        category: "HealthTech · Maternal Care · Dashboard · UI/UX",
        description: "A maternal health tracking application designed to help expectant and new mothers monitor their health, track baby development, and connect with healthcare professionals.",
        image_url: "",
        case_study_url: "",
        figma_embed: "https://www.figma.com/design/6hP6FwO7oWkLnjl21PZ4lK/Oumouma?t=GJ1OguveKGAfAFX2-0",
        github_url: "https://github.com/kezzallyna-code/ommouma",
        live_demo_url: "https://ommouma.vercel.app/",
        technologies: ["React Native", "Firebase", "Figma"],
        challenges: "Creating an empathetic, easy-to-use interface for mothers.",
        final_solution: "A maternal health tracking application with personalized insights and remote consultations.",
        is_featured: true,
        status: 'published'
      },
      {
        id: "1786671834617-portfolio",
        title: "Lyna Kezzel Portfolio",
        category: "Personal Brand · Web Design · Interactive",
        description: "My personal portfolio website designed to showcase my skills as a UI/UX Designer and Web Developer. Built with Next.js, featuring smooth animations, dark mode, and an integrated admin dashboard.",
        image_url: "",
        case_study_url: "",
        figma_embed: "https://www.figma.com/design/rY7RlzHtzwzX9L2QkU6W1K/portfolio-lyna-kezzel?t=GJ1OguveKGAfAFX2-0",
        github_url: "https://github.com/kezzallyna-code/portfolio-lyna-",
        live_demo_url: "https://p2-git-main-kezzallyna-codes-projects.vercel.app/",
        technologies: ["Next.js", "React", "CSS Modules", "Supabase"],
        challenges: "Building a performant, visually striking personal brand platform.",
        final_solution: "A dynamic portfolio with an integrated admin dashboard.",
        is_featured: true,
        status: 'published'
      },
      {
        id: "1786671834618-wise",
        title: "Wise",
        category: "EdTech · E-Learning · UI/UX",
        description: "An educational platform that connects students with tutors and courses. Features interactive classrooms, progress tracking, and secure payments.",
        image_url: "",
        case_study_url: "",
        figma_embed: "https://www.figma.com/design/J8WjB6N4QYJkT4y7s9E0Z8/Wise?t=GJ1OguveKGAfAFX2-0",
        github_url: "https://github.com/kezzallyna-code/wise",
        live_demo_url: "https://wise-delta.vercel.app/",
        technologies: ["Vue.js", "Express", "PostgreSQL", "Figma"],
        challenges: "Structuring complex course materials intuitively.",
        final_solution: "An educational platform featuring interactive classrooms and progress tracking.",
        is_featured: true,
        status: 'published'
      },
      {
        id: "1786671834619-tirazi",
        title: "Tirazi",
        category: "E-Commerce · Fashion · UI/UX",
        description: "A modern e-commerce platform for traditional and contemporary fashion. Features include a dynamic catalog, shopping cart, user reviews, and secure checkout.",
        image_url: "",
        case_study_url: "",
        figma_embed: "https://www.figma.com/design/x5p8Q6N4QYJkT4y7s9E0Z8/Tirazi?t=GJ1OguveKGAfAFX2-0",
        github_url: "https://github.com/kezzallyna-code/Tirazii",
        live_demo_url: "https://tirazii-git-main-kezzallyna-codes-projects.vercel.app/",
        technologies: ["Shopify", "Liquid", "Tailwind CSS", "Figma"],
        challenges: "Creating a seamless checkout experience.",
        final_solution: "A modern e-commerce platform with a dynamic catalog and secure checkout.",
        is_featured: true,
        status: 'published'
      }
    ];

    const newExperience = {
      id: Date.now().toString() + "-digital-agency",
      role: "Web Developer & AI Solutions",
      company: "Digital Agency (Algeria / Remote)",
      duration: "2025 – Present",
      is_current: true,
      description: "Working on the design and development of modern websites and digital solutions for clients. Building responsive web interfaces, integrating AI-powered features, creating portfolio/business websites, and collaborating on client projects from concept to deployment."
    };

    const { error: pError } = await supabaseAdmin.from('portfolio_projects').insert(newProjects);
    const { error: eError } = await supabaseAdmin.from('portfolio_experiences').insert([newExperience]);

    if (pError || eError) {
      return NextResponse.json({ success: false, error: pError?.message || eError?.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Successfully injected the experience and projects!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
