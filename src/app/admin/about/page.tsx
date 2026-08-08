'use client';

import { useState, useEffect } from 'react';
import { PortfolioData } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Save } from 'lucide-react';
import styles from '../admin.module.css';

export default function AboutEditor() {
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
      alert('About information saved successfully!');
      window.location.reload();
    } else {
      alert('Failed to save changes. Please try again.');
    }
  };

  const updateField = (field: string, value: string) => {
    if (!data) return;
    setData({
      ...data,
      about: {
        ...data.about,
        [field]: value
      }
    });
  };

  if (!data) return <div style={{ padding: '2rem' }}>Loading editor...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>About Me</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Update your personal information, role, and current status.</p>
        </div>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input 
          label="Full Name"
          value={data.about.name} 
          onChange={e => updateField('name', e.target.value)} 
        />
        <Input 
          label="Professional Title"
          value={data.about.role} 
          onChange={e => updateField('role', e.target.value)} 
        />
        <Input 
          label="Profile Picture URL"
          value={data.about.imageUrl} 
          onChange={e => updateField('imageUrl', e.target.value)} 
        />
        <Input 
          label="Location"
          value={data.about.location || ''} 
          onChange={e => updateField('location', e.target.value)} 
        />
        <Input 
          label="Current Status (e.g. 'Available for freelance')"
          value={data.about.status || ''} 
          onChange={e => updateField('status', e.target.value)} 
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>About Me (Bio)</label>
          <textarea 
            value={data.about.description}
            onChange={e => updateField('description', e.target.value)}
            style={{
              width: '100%',
              minHeight: '200px',
              padding: '0.75rem 1rem',
              background: 'var(--input-bg, rgba(0,0,0,0.2))',
              border: '1px solid var(--input-border, rgba(255,255,255,0.1))',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>
      </div>
    </div>
  );
}
