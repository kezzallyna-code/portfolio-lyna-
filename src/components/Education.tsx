import { Education as Ed } from '@/data/schema';

export default function Education({ education }: { education: Ed[] }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="section">
      <div className="container">
        <p className="section-subtitle" style={{ textAlign: 'left' }}>Academia</p>
        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '3rem' }}>Education</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {education.map(ed => (
            <div key={ed.id} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{ed.degree}</h3>
                  <p style={{ color: 'var(--accent-color)', fontWeight: 500 }}>{ed.institution}</p>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Expected {ed.graduationYear}
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ed.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
