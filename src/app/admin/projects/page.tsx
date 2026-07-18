'use client';

import { useState, useEffect } from 'react';
import { PortfolioData, Project } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Plus, Edit2, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import styles from '../admin.module.css';

export default function ProjectsList() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  const deleteProject = async (id: string) => {
    if (!data) return;
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const newProjects = data.projects.filter(p => p.id !== id);
    const newData = { ...data, projects: newProjects };
    
    await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    });
    
    setData(newData);
  };

  if (!data) return <div>Loading projects...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Projects</h1>
        <Link href="/admin/projects/new">
          <Button>
            <Plus size={18} /> New Project
          </Button>
        </Link>
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--card-border)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Project</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.projects.map(project => (
              <tr key={project.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '64px', height: '48px', borderRadius: '4px', background: 'var(--bg-color)', border: '1px solid var(--card-border)', backgroundImage: `url(${project.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{project.title}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{project.caseStudyUrl}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{project.category}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  {project.status === 'draft' ? (
                    <span style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-secondary)', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 500 }}>
                      Draft
                    </span>
                  ) : (
                    <span style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 500 }}>
                      Published
                    </span>
                  )}
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <Link href={project.caseStudyUrl} target="_blank">
                      <Button variant="secondary" style={{ padding: '0.4rem', background: 'transparent', border: 'none' }}>
                        <ExternalLink size={18} />
                      </Button>
                    </Link>
                    <Link href={`/admin/projects/${project.id}`}>
                      <Button variant="secondary" style={{ padding: '0.4rem', background: 'transparent', border: 'none' }}>
                        <Edit2 size={18} />
                      </Button>
                    </Link>
                    <button onClick={() => deleteProject(project.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.projects.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No projects found. Create your first project to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
