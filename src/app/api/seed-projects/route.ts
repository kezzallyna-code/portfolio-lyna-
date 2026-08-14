import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { Project } from '@/data/schema';

export async function GET() {
  const newProjects = [
    {
      id: Date.now().toString() + "-amana",
      title: "Amana",
      category: "FinTech · Investment · Dashboard · UI/UX",
      description: "A modern investment platform designed to make financial opportunities easier to explore and manage through a clean, structured, and user-friendly interface.",
      image_url: "",
      case_study_url: "",
      figma_embed: "https://www.figma.com/design/IHrqI6vRFFqL0UJJsquhLT/amannaa?t=GJ1OguveKGAfAFX2-0",
      github_url: "https://github.com/kezzallyna-code/amana",
      live_demo_url: "https://amana-44oa-nt9sbj7vj-kezzallyna-codes-projects.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma", "Vercel"],
      challenges: "Presenting financial information without making the interface feel complicated.\nCreating a clear visual hierarchy for investment-related content.\nDesigning responsive layouts that work across different screen sizes.\nMaintaining consistency across dashboards, cards, buttons, and other interface components.",
      final_solution: "The final product combines a clean financial dashboard with structured investment sections and responsive components. The interface uses reusable UI patterns and a consistent design system to make the experience easier to navigate while keeping the visual style modern and professional.",
      is_featured: true,
      status: 'published'
    },
    {
      id: Date.now().toString() + "-nibel",
      title: "Nibel",
      category: "E-Commerce · Fashion · Product Showcase · UI/UX",
      description: "A modern e-commerce experience created for a fashion and couture brand, combining product presentation, elegant visual design, and a smooth shopping experience.",
      image_url: "",
      case_study_url: "",
      figma_embed: "https://www.figma.com/design/1aoUIrVCic6rVaz6KmyyZG/Untitled?node-id=0-1&p=f&t=4IHR74TvNgckpO4j-0",
      github_url: "https://github.com/kezzallyna-code/NIBAL-MAISON-DE-COUTURE",
      live_demo_url: "https://nibbmc-nqno00zzz-kezzallyna-codes-projects.vercel.app/",
      technologies: ["Next.js", "React", "Tailwind CSS", "Figma", "Vercel"],
      challenges: "Balancing an elegant fashion-oriented design with practical e-commerce functionality.\nCreating product layouts that emphasize visual content without overwhelming the page.\nBuilding responsive pages for different screen sizes.\nMaintaining a consistent visual identity across the entire website.",
      final_solution: "The final website combines a minimalist fashion aesthetic with a structured e-commerce experience. Responsive product sections, reusable components, clear navigation, and a consistent design system create a polished shopping experience while keeping the brand identity at the center.",
      is_featured: true,
      status: 'published'
    },
    {
      id: Date.now().toString() + "-oumouma",
      title: "oumouma",
      category: "Marketplace · Childcare · Job Matching · Social Platform",
      description: "A childcare platform connecting families with nannies. Parents can discover and choose childcare providers, while nannies can find families and available childcare opportunities.",
      image_url: "",
      case_study_url: "",
      figma_embed: "https://www.figma.com/design/ffU2RkE3W4h2QFlhXmiGLW/oumouma?node-id=0-1&p=f&t=GJ1OguveKGAfAFX2-0",
      github_url: "https://github.com/kezzallyna-code/oumouma",
      live_demo_url: "https://oumouma-alpha.vercel.app/",
      technologies: ["Next.js", "React", "Tailwind CSS", "Figma", "Vercel"],
      challenges: "Designing an experience for two different types of users.\nMaking nanny profiles and relevant information easy to browse.\nCreating clear navigation between finding childcare and finding job opportunities.\nMaking the platform responsive and accessible on different devices.",
      final_solution: "Umuma brings both sides of the childcare marketplace together in one platform. The final interface organizes profiles, opportunities, and actions into clear sections, allowing parents to search for nannies while giving nannies a dedicated way to discover childcare opportunities.",
      is_featured: true,
      status: 'published'
    },
    {
      id: Date.now().toString() + "-portfolio",
      title: "Lyna Kezzel Portfolio",
      category: "Web Development · UI/UX · Personal Branding · Portfolio",
      description: "My personal developer portfolio showcasing my web applications, e-commerce projects, UI/UX work, technical skills, and creative projects.",
      image_url: "",
      case_study_url: "",
      figma_embed: "https://www.figma.com/design/rhglpdjoallN5gROKKcpLe/Untitled?node-id=0-1&p=f&t=wqa1jFJ0yl23B1hu-0",
      github_url: "",
      live_demo_url: "",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma", "Vercel"],
      challenges: "Presenting different types of projects within one consistent visual system.\nCreating a portfolio that feels personal while remaining professional.\nOrganizing project information without making the interface feel crowded.\nMaking the portfolio fully responsive.",
      final_solution: "The final portfolio uses a clean project-focused layout with dedicated sections for projects, skills, and personal information. Each project can communicate its purpose, technologies, and development process, allowing visitors to quickly understand both the product and the work behind it.",
      is_featured: true,
      status: 'published'
    },
    {
      id: Date.now().toString() + "-wise",
      title: "Wise",
      category: "FinTech · Financial Management · Dashboard · UI/UX",
      description: "A modern financial management application designed to help users organize and visualize their finances through an intuitive and structured interface.",
      image_url: "",
      case_study_url: "",
      figma_embed: "https://www.figma.com/design/Xo58DH2bhbDrM9EK1vPqyj/wise-save?node-id=0-1&p=f&t=ZGwfSIv1ebh1YIwf-0",
      github_url: "https://github.com/kezzallyna-code/wisee",
      live_demo_url: "https://wisee-bkca7nkjd-kezzallyna-codes-projects.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Figma", "Vercel"],
      challenges: "Displaying financial information in a way that is easy to scan.\nDesigning dashboard components without creating visual overload.\nCreating reusable UI components for different financial sections.\nEnsuring the interface remains responsive and consistent.",
      final_solution: "The final application provides a structured financial dashboard with clear information hierarchy, reusable components, and responsive layouts. The result is a modern interface designed to make financial information easier to understand and navigate.",
      is_featured: true,
      status: 'published'
    },
    {
      id: Date.now().toString() + "-tirazi",
      title: "Tirazi",
      category: "Fashion · E-Commerce · Branding · UI/UX · Product Showcase",
      description: "A modern fashion and couture website designed to showcase collections and create a refined digital experience around the brand's visual identity.",
      image_url: "",
      case_study_url: "",
      figma_embed: "https://www.figma.com/design/CZv8FdtxqVecspPGQgtIPm/Tirazy?node-id=0-1&p=f&t=Ydz5PhKXOyjlJ8mV-0",
      github_url: "https://github.com/kezzallyna-code/tirazi",
      live_demo_url: "https://tirazi-l99jvsh3p-kezzallyna-codes-projects.vercel.app/",
      technologies: ["Next.js", "React", "Tailwind CSS", "Figma", "Vercel"],
      challenges: "Creating a premium visual experience without sacrificing usability.\nDesigning layouts that allow fashion imagery to remain the main focus.\nMaintaining consistency between typography, spacing, colors, and components.\nBuilding a responsive experience that preserves the intended aesthetic on smaller screens.",
      final_solution: "The final website combines a refined fashion-oriented interface with responsive layouts and structured collection sections. The design system keeps the experience visually consistent while allowing the brand's products and identity to remain the main focus.",
      is_featured: true,
      status: 'published'
    }
  ];

  try {
    const { error } = await supabaseAdmin.from('portfolio_projects').insert(newProjects);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Successfully injected 6 projects!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
