'use client';

import { useState, useEffect } from 'react';
import { PortfolioData } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { FileUpload } from '@/components/admin/ui/FileUpload';
import { Save } from 'lucide-react';
import styles from '../admin.module.css';

export default function ContactEditor() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio', { cache: 'no-store' })
      .then(res => res.json())
      .then(d => setData(d))
      .catch(err => {
        console.error(err);
        alert('Failed to load data.');
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) {
      alert('Contact info saved successfully!');
    } else {
      alert('Failed to save changes. Please try again.');
    }
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

          <FileUpload 
            label="Resume Download Link (PDF)" 
            value={data.socials.resumeUrl || ''} 
            onChange={value => setData({ ...data, socials: { ...data.socials, resumeUrl: value } })} 
            accept="application/pdf"
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

          <Input 
            label="Twitter / X URL" 
            value={data.socials.twitter || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, twitter: e.target.value } })} 
            placeholder="https://twitter.com/yourusername"
          />

          <Input 
            label="Instagram URL" 
            value={data.socials.instagram || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, instagram: e.target.value } })} 
            placeholder="https://instagram.com/yourusername"
          />

          <Input 
            label="Dribbble URL" 
            value={data.socials.dribbble || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, dribbble: e.target.value } })} 
            placeholder="https://dribbble.com/yourusername"
          />

          <Input 
            label="Behance URL" 
            value={data.socials.behance || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, behance: e.target.value } })} 
            placeholder="https://behance.net/yourusername"
          />

          <Input 
            label="YouTube URL" 
            value={data.socials.youtube || ''} 
            onChange={e => setData({ ...data, socials: { ...data.socials, youtube: e.target.value } })} 
            placeholder="https://youtube.com/@yourusername"
          />
        </div>
      </div>
    </>
  );
}
