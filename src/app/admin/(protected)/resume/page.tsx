'use client';

import { useState, useEffect } from 'react';
import { PortfolioData } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Save } from 'lucide-react';
import styles from '@/app/admin/admin.module.css';

export default function ResumeEditor() {
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
      body: JSON.stringify({ socials: data?.socials }),
    });
    setSaving(false);
    if (res.ok) {
      alert('Resume settings saved successfully!');
      window.location.reload();
    } else {
      const errData = await res.json().catch(() => ({}));
      alert('Failed to save: ' + (errData?.error || 'Unknown error'));
    }
  };

  if (!data) return <div>Loading editor...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Resume</h1>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className={styles.card} style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Resume PDF Link</h2>
        <Input 
          label="Resume URL (PDF)"
          value={data.socials.resumeUrl || ''} 
          onChange={e => setData({ ...data, socials: { ...data.socials, resumeUrl: e.target.value } })} 
          placeholder="https://example.com/lyna-kezzal-resume.pdf"
        />
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
          This link will be used when visitors click the &quot;Download Resume&quot; button on your portfolio.
        </p>
      </div>
    </>
  );
}
