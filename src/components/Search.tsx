'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/data/schema';

export default function Search({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(true)}
        style={{ background: 'transparent', border: '1px solid var(--card-border)', color: 'var(--text-primary)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
      >
        Search...
      </button>

      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh' }}>
          <div style={{ background: 'var(--bg-color)', width: '100%', maxWidth: '600px', borderRadius: '12px', padding: '2rem', border: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <input 
                autoFocus
                placeholder="Search projects..." 
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ width: '100%', padding: '1rem', background: 'transparent', border: 'none', borderBottom: '2px solid var(--accent-color)', color: 'var(--text-primary)', fontSize: '1.25rem', outline: 'none' }}
              />
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '1.5rem', cursor: 'pointer', marginLeft: '1rem' }}>&times;</button>
            </div>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {query && filteredProjects.length === 0 && <p style={{ color: '#9ca3af' }}>No results found.</p>}
              {query && filteredProjects.map(p => (
                <Link key={p.id} href={`/projects/${p.id}`} onClick={() => setIsOpen(false)} style={{ display: 'block', padding: '1rem', borderBottom: '1px solid var(--card-border)' }}>
                  <h4 style={{ color: 'var(--text-primary)', margin: 0 }}>{p.title}</h4>
                  <span style={{ color: 'var(--accent-color)', fontSize: '0.8rem' }}>{p.category}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
