'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PortfolioData, Project } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { FileUpload } from '@/components/admin/ui/FileUpload';
import styles from '../../admin.module.css';

export default function ProjectEditor() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const isNew = projectId === 'new';

  const [data, setData] = useState<PortfolioData | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio', { cache: 'no-store' })
      .then(res => res.json())
      .then(d => {
        setData(d);
        if (isNew) {
          setProject({
            id: Date.now().toString(),
            title: 'New Project',
            category: 'UI/UX Design',
            description: '',
            imageUrl: '',
            caseStudyUrl: '',
            technologies: [],
            challenges: '',
            finalSolution: '',
            gallery: [],
          });
        } else {
          const existing = d.projects.find((p: Project) => p.id === projectId);
          if (existing) setProject(existing);
          else router.push('/admin/projects');
        }
      });
  }, [projectId, isNew, router]);

  const handleSave = async () => {
    if (!data || !project) return;
    setSaving(true);
    
    let newProjects = [...data.projects];
    if (isNew) {
      newProjects = [project, ...newProjects];
    } else {
      const index = newProjects.findIndex(p => p.id === project.id);
      newProjects[index] = project;
    }

    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, projects: newProjects }),
    });
    
    setSaving(false);
    if (res.ok) {
      alert('Project saved successfully!');
      if (isNew) router.push(`/admin/projects/${project.id}`);
    } else {
      alert('Failed to save project. Please try again.');
    }
  };

  if (!project) return <div>Loading project...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/projects">
            <Button variant="secondary" style={{ padding: '0.6rem' }}><ArrowLeft size={18} /></Button>
          </Link>
          <h1 className={styles.pageTitle}>{isNew ? 'Create Project' : 'Edit Project'}</h1>
        </div>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Project
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className={styles.card}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Basic Info</h2>
            <Input 
              label="Project Title" 
              value={project.title} 
              onChange={e => setProject({ ...project, title: e.target.value })} 
            />
            <Input 
              label="Category" 
              value={project.category} 
              onChange={e => setProject({ ...project, category: e.target.value })} 
            />
            <Textarea 
              label="Short Description" 
              value={project.description} 
              onChange={e => setProject({ ...project, description: e.target.value })} 
              style={{ minHeight: '80px' }}
            />
            <Input 
              label="Technologies (comma separated)" 
              value={(project.technologies || []).join(', ')} 
              onChange={e => setProject({ ...project, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} 
            />
          </div>

          <div className={styles.card}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Case Study Details</h2>
            <Textarea 
              label="Challenges" 
              value={project.challenges || ''} 
              onChange={e => setProject({ ...project, challenges: e.target.value })} 
              style={{ minHeight: '150px' }}
            />
            <Textarea 
              label="Final Solution" 
              value={project.finalSolution || ''} 
              onChange={e => setProject({ ...project, finalSolution: e.target.value })} 
              style={{ minHeight: '150px' }}
            />
          </div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={styles.card}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Thumbnail</h2>
            <div style={{ 
              background: 'var(--bg-color)', 
              border: '1px dashed var(--card-border)', 
              borderRadius: '8px', 
              padding: '2rem', 
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              {project.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.imageUrl} alt="Thumbnail" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
              ) : (
                <ImageIcon size={48} style={{ color: 'var(--text-secondary)', margin: '0 auto 1rem' }} />
              )}
            </div>
            <FileUpload 
              label="Thumbnail URL" 
              value={project.imageUrl} 
              onChange={value => setProject({ ...project, imageUrl: value })} 
              accept="image/*"
            />
          </div>

          <div className={styles.card}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Links</h2>
            <Input 
              label="Case Study URL Slug" 
              value={project.caseStudyUrl} 
              onChange={e => setProject({ ...project, caseStudyUrl: e.target.value })} 
            />
            <Input 
              label="Live Demo Link" 
              value={project.liveDemoUrl || ''} 
              onChange={e => setProject({ ...project, liveDemoUrl: e.target.value })} 
            />
            <Input 
              label="GitHub Link" 
              value={project.githubUrl || ''} 
              onChange={e => setProject({ ...project, githubUrl: e.target.value })} 
            />
            <Input 
              label="Figma Link" 
              value={project.figmaEmbed || ''} 
              onChange={e => setProject({ ...project, figmaEmbed: e.target.value })} 
            />
          </div>
        </div>
      </div>
    </>
  );
}
