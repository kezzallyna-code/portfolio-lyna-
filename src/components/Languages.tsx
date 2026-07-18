'use client';

import { Language } from '@/data/schema';

export default function Languages({ languages }: { languages: Language[] }) {
  if (!languages || languages.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <p className="section-subtitle">Communication</p>
        <h2 className="section-title">Languages</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {languages.map((lang) => (
            <div key={lang.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '2rem', textAlign: 'center', transition: 'transform 0.2s', cursor: 'default' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗣️</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{lang.name}</h3>
              <div style={{ display: 'inline-block', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-color)', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>
                {lang.level}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
