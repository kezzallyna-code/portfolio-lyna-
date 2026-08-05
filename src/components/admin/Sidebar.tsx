'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Home, FolderKanban, PenTool, 
  Video, Award, Lightbulb, Briefcase, GraduationCap, 
  Languages, FileText, Image as ImageIcon, BookOpen, 
  Mail, Search, BarChart2, Settings 
} from 'lucide-react';
import styles from './Sidebar.module.css';

const sections = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Content',
    items: [
      { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
      { name: 'UI/UX Videos', href: '/admin/videos', icon: Video },
      { name: 'Certifications', href: '/admin/certifications', icon: Award },
    ]
  },
  {
    title: 'Profile',
    items: [
      { name: 'About', href: '/admin/about', icon: Home },
      { name: 'Education', href: '/admin/education', icon: GraduationCap },
      { name: 'Experience', href: '/admin/experience', icon: Briefcase },
      { name: 'Skills', href: '/admin/skills', icon: Lightbulb },
      { name: 'Languages', href: '/admin/languages', icon: Languages },
      { name: 'Resume', href: '/admin/resume', icon: FileText },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
      { name: 'Contact & Socials', href: '/admin/contact', icon: Mail },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <LayoutDashboard className={styles.logoIcon} size={24} />
        Lyna Dashboard
      </div>

      <nav className={styles.nav}>
        {sections.map((section, idx) => (
          <div key={idx}>
            <div className={styles.sectionTitle}>{section.title}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <Link href="/" className={styles.link} style={{ marginBottom: '0.5rem' }}>
          <Home size={18} />
          View Live Site
        </Link>
      </div>
    </aside>
  );
}
