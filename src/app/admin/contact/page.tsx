'use client';

import { useState, useEffect } from 'react';
import { PortfolioData } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Save } from 'lucide-react';
import styles from '../admin.module.css';

export default function ContactEditor() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    alert('Contact info saved successfully!');
  };

  if (!data) return <div>Loading editor...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Contact & Social Links</h1>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className={styles.card}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Primary Contact</h2>
          
          <Input 
            label="Email Address" 
            value={data.socials.email || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, email: e.target.value } })} 
            placeholder="e.g. you@example.com"
          />
          
          <Input 
            label="Location" 
            value={data.socials.location || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, location: e.target.value } })} 
            placeholder="e.g. Algiers, Algeria"
          />

          <Input 
            label="Resume Download Link (PDF)" 
            value={data.socials.resumeUrl || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, resumeUrl: e.target.value } })} 
            placeholder="/resume.pdf"
          />
        </div>

        <div className={styles.card}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Social Media Links</h2>
          
          <Input 
            label="GitHub URL" 
            value={data.socials.github || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, github: e.target.value } })} 
            placeholder="https://github.com/yourusername"
          />
          
          <Input 
            label="LinkedIn URL" 
            value={data.socials.linkedin || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, linkedin: e.target.value } })} 
            placeholder="https://linkedin.com/in/yourusername"
          />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Additional Networks</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Add more fields to the JSON schema if you need to support Behance, Dribbble, Twitter, etc.
            </p>
            <Button variant="secondary" disabled>Add Network</Button>
          </div>
        </div>
      </div>
    </>
  );
}
