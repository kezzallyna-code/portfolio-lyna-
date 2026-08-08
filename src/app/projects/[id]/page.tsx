import { getPortfolioData } from '@/data/repository';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const data = await getPortfolioData();
  const resolvedParams = await params;
  const project = data.projects.find(p => p.id === resolvedParams.id || p.caseStudyUrl === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <main className="container section" style={{ paddingTop: '8rem' }}>
      <Link href="/" style={{ color: 'var(--accent-color)', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Portfolio
      </Link>
      
      <p className="section-subtitle" style={{ textAlign: 'left' }}>{project.category}</p>
      <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>{project.title}</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
        {project.liveDemoUrl && (
          <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--accent-color)', color: 'var(--text-primary)', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 600 }}>
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-primary)', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: 600 }}>
            GitHub Repository
          </a>
        )}
      </div>

      <div style={{ width: '100%', height: '500px', background: 'rgba(0,0,0,0.2)', borderRadius: '24px', marginBottom: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--card-border)', overflow: 'hidden', position: 'relative' }}>
         {project.imageUrl ? (
           <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         ) : (
           <span style={{ color: 'var(--text-secondary)' }}>Hero Image Placeholder</span>
         )}
      </div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Overview</h2>
        <p style={{ marginBottom: '2rem' }}>{project.description}</p>

        {project.technologies && project.technologies.length > 0 && (
          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Technologies Used</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.technologies.map(tech => (
                <span key={tech} style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {project.challenges && (
          <>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>The Challenge</h2>
            <p style={{ marginBottom: '2rem' }}>{project.challenges}</p>
          </>
        )}
        
        {project.finalSolution && (
          <>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Final Solution</h2>
            <p style={{ marginBottom: '4rem' }}>{project.finalSolution}</p>
          </>
        )}

        {project.figmaEmbed && (
          <div style={{ marginBottom: '4rem' }}>
             <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Figma Prototype</h2>
             <div style={{ width: '100%', height: '450px', background: '#2c2c2c', borderRadius: '12px', overflow: 'hidden' }}>
               <iframe
                 title="Figma Prototype"
                 width="100%"
                 height="100%"
                 src={project.figmaEmbed.includes('embed_host=') ? project.figmaEmbed : `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(project.figmaEmbed)}`}
                 allowFullScreen
                 style={{ border: 'none' }}
               />
             </div>
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
           <div style={{ marginBottom: '4rem' }}>
             <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Gallery</h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
               {project.gallery.map((img, i) => (
                 <div key={i} style={{ width: '100%', paddingBottom: '75%', background: '#2c2c2c', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                    <img src={img} alt={`${project.title} Gallery Image ${i + 1}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
               ))}
             </div>
           </div>
        )}
      </div>
    </main>
  );
}
