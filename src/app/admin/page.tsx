'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PortfolioData } from '@/data/schema';
import { 
  FolderKanban, Award, Video, ImageIcon, 
  Lightbulb, Languages, FileText, PlusCircle, User, Briefcase
} from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/portfolio', { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch portfolio data');
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error: {error}</div>;
  if (!data) return <div style={{ padding: '2rem' }}>Failed to load data.</div>;

  const upcomingCerts = data.certifications?.filter(c => c.status === 'coming-soon').length || 0;
  const draftProjects = data.projects?.filter(p => p.status === 'draft').length || 0;

  const stats = [
    { title: 'Projects', value: data.projects?.length || 'No projects yet', icon: FolderKanban },
    { title: 'Videos', value: data.uiUxVideos?.length || 'No videos yet', icon: Video },
    { title: 'Certificates', value: data.certifications?.filter(c => c.status !== 'coming-soon').length || 'No certificates yet', icon: Award },
    { title: 'Skills', value: data.superpowers?.skills?.length || 'No skills yet', icon: Lightbulb },
    { title: 'Languages', value: data.languages?.length || 'No languages yet', icon: Languages },
    { title: 'Resume Uploaded', value: data.socials?.resumeUrl ? 'Yes' : 'No', icon: FileText },
    { title: 'Upcoming Certifications', value: upcomingCerts || 'None', icon: Award },
    { title: 'Draft Projects', value: draftProjects || 'None', icon: FolderKanban },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Overview</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Welcome back, Lyna. Here&apos;s what&apos;s happening with your portfolio today.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={styles.card} style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '12px', color: 'var(--accent-color)' }}>
                  <Icon size={24} />
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
                  {stat.title}
                </p>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0', color: 'var(--text-primary)' }}>
                {stat.value}
              </h3>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        <div className={styles.card}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            <Link href="/admin/projects" className={styles.buttonSecondary} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FolderKanban size={16} /> New Project
            </Link>
            <Link href="/admin/videos" className={styles.buttonSecondary} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <Video size={16} /> Upload Video
            </Link>
            <Link href="/admin/certifications" className={styles.buttonSecondary} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <Award size={16} /> Upload Certificate
            </Link>
            <Link href="/admin/about" className={styles.buttonSecondary} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <User size={16} /> Update About Me
            </Link>
            <Link href="/admin/resume" className={styles.buttonSecondary} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <FileText size={16} /> Replace Resume
            </Link>
            <Link href="/admin/about" className={styles.buttonSecondary} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <ImageIcon size={16} /> Upload Profile Picture
            </Link>
            <Link href="/admin/experience" className={styles.buttonSecondary} style={{ width: '100%', justifyContent: 'flex-start' }}>
              <Briefcase size={16} /> Add Experience
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
