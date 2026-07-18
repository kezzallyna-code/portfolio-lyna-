import { UiUxVideo } from '@/data/schema';
import Image from 'next/image';

export default function UiUxShowcase({ projects }: { projects: UiUxVideo[] }) {
  const publishedProjects = projects.filter(p => p.isPublished);
  if (!publishedProjects || publishedProjects.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <p className="section-subtitle" style={{ textAlign: 'left' }}>Design Process</p>
        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '3rem' }}>UI/UX Showcase</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {publishedProjects.map((project) => (
            <div key={project.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '24px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000' }}>
                 {/* Video / Thumbnail Placeholder */}
                 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                   {project.mp4Url ? 'MP4 Video Player Placeholder' : 'Figma Embed / Thumbnail Placeholder'}
                 </div>
              </div>
              
              <div style={{ padding: '3rem' }}>
                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
                  {project.category}
                </span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {project.description}
                </p>
                
                {project.figmaEmbed && (
                  <a href={project.figmaEmbed} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'var(--accent-color)', color: '#fff', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 600 }}>
                    View Interactive Prototype
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
