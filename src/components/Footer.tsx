'use client';

import { SocialLinks } from '@/data/schema';

export default function Footer({ socials, name, role }: { socials: SocialLinks, name: string, role: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" style={{ borderTop: '1px solid var(--card-border)', paddingTop: '4rem', paddingBottom: '2rem', marginTop: '6rem', background: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{name}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{role}</p>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Socials</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socials.github && <li><a href={socials.github} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'var(--text-secondary)' }}>GitHub</a></li>}
              {socials.linkedin && <li><a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'var(--text-secondary)' }}>LinkedIn</a></li>}
              {socials.twitter && <li><a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'var(--text-secondary)' }}>Twitter / X</a></li>}
              {socials.instagram && <li><a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'var(--text-secondary)' }}>Instagram</a></li>}
              {socials.dribbble && <li><a href={socials.dribbble} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'var(--text-secondary)' }}>Dribbble</a></li>}
              {socials.behance && <li><a href={socials.behance} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'var(--text-secondary)' }}>Behance</a></li>}
              {socials.youtube && <li><a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'var(--text-secondary)' }}>YouTube</a></li>}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Contact</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socials.email && <li><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${socials.email}`} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: 'var(--text-secondary)' }}>{socials.email}</a></li>}
              {socials.location && <li style={{ color: 'var(--text-secondary)' }}>{socials.location}</li>}
              {socials.resumeUrl && (
                <li style={{ marginTop: '1rem' }}>
                  <a href={socials.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', border: '1px solid var(--card-border)', padding: '0.5rem 1rem', borderRadius: '4px', color: '#fff', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    Download Resume
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <p>&copy; {currentYear} {name}. All rights reserved.</p>
          <p>Designed & Developed by {name}</p>
        </div>
      </div>
    </footer>
  );
}
