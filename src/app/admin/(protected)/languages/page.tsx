'use client';

import { useState, useEffect } from 'react';
import { PortfolioData, Language } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import styles from '@/app/admin/admin.module.css';

export default function LanguagesEditor() {
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
      alert('Languages saved successfully!');
      window.location.reload();
    } else {
      alert('Failed to save changes. Please try again.');
    }
  };

  const addLanguage = () => {
    if (!data) return;
    const newLang: Language = { id: Date.now().toString(), name: 'New Language', level: 'Beginner', progress: 50, displayStyle: 'bar' };
    setData({ ...data, languages: [...data.languages, newLang] });
  };

  const removeLanguage = (id: string) => {
    if (!data) return;
    setData({ ...data, languages: data.languages.filter(l => l.id !== id) });
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    if (!data) return;
    const newLangs = [...data.languages];
    newLangs[index] = { ...newLangs[index], [field]: value };
    setData({ ...data, languages: newLangs });
  };

  if (!data) return <div>Loading editor...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Languages</h1>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className={styles.card} style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Spoken Languages</h2>
          <Button variant="secondary" onClick={addLanguage}><Plus size={16} /> Add Language</Button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {(data.languages || []).map((lang, index) => (
            <div key={lang.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.1)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
              <div style={{ color: 'var(--text-secondary)', cursor: 'grab', display: 'flex' }}>
                <GripVertical size={16} />
              </div>
              <Input 
                value={lang.name} 
                onChange={e => updateLanguage(index, 'name', e.target.value)} 
                placeholder="Language Name (e.g. English)"
                style={{ marginBottom: 0, flex: 1 }}
              />
              <Input 
                value={lang.level} 
                onChange={e => updateLanguage(index, 'level', e.target.value)} 
                placeholder="Level (e.g. Native, C1)"
                style={{ marginBottom: 0, flex: 1 }}
              />
              <Input 
                type="number"
                value={lang.progress?.toString() || '0'} 
                onChange={e => updateLanguage(index, 'progress', e.target.value)} 
                placeholder="Progress (0-100)"
                style={{ marginBottom: 0, flex: 1 }}
              />
              <select 
                value={lang.displayStyle || 'bar'}
                onChange={e => updateLanguage(index, 'displayStyle', e.target.value)}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--input-bg, rgba(0,0,0,0.2))',
                  border: '1px solid var(--input-border, rgba(255,255,255,0.1))',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  flex: 1
                }}
              >
                <option value="bar">Bar Chart</option>
                <option value="circle">Circular Progress</option>
                <option value="text">Text Only</option>
              </select>
              <button onClick={() => removeLanguage(lang.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          {data.languages.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0' }}>No languages listed.</div>
          )}
        </div>
      </div>
    </>
  );
}
