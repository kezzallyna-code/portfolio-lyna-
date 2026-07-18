'use client';

import { useState, useEffect } from 'react';
import { PortfolioData, Experience } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import styles from '../admin.module.css';

export default function ExperienceEditor() {
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
    alert('Experience saved successfully!');
  };

  const addExperience = () => {
    if (!data) return;
    const newExp: Experience = { id: Date.now().toString(), role: 'New Role', company: 'New Company', duration: '2026 - Present', description: '' };
    setData({ ...data, experience: [newExp, ...data.experience] });
  };

  const removeExperience = (id: string) => {
    if (!data) return;
    setData({ ...data, experience: data.experience.filter(e => e.id !== id) });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    if (!data) return;
    const newExpList = [...data.experience];
    newExpList[index] = { ...newExpList[index], [field]: value };
    setData({ ...data, experience: newExpList });
  };

  if (!data) return <div>Loading editor...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Experience Timeline</h1>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Professional Experience</h2>
          <Button variant="secondary" onClick={addExperience}><Plus size={16} /> Add Role</Button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {data.experience.map((exp, index) => (
            <div key={exp.id} style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
              <div style={{ color: 'var(--text-secondary)', cursor: 'grab', display: 'flex', paddingTop: '0.75rem' }}>
                <GripVertical size={20} />
              </div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input 
                  label="Role"
                  value={exp.role} 
                  onChange={e => updateExperience(index, 'role', e.target.value)} 
                />
                <Input 
                  label="Company"
                  value={exp.company} 
                  onChange={e => updateExperience(index, 'company', e.target.value)} 
                />
                <Input 
                  label="Start Date"
                  value={exp.startDate || ''} 
                  onChange={e => updateExperience(index, 'startDate', e.target.value)} 
                />
                <Input 
                  label="End Date"
                  value={exp.endDate || ''} 
                  onChange={e => updateExperience(index, 'endDate', e.target.value)} 
                  disabled={exp.isCurrent}
                />
                <Input 
                  label="Duration (e.g. 2024 - 2026)"
                  value={exp.duration} 
                  onChange={e => updateExperience(index, 'duration', e.target.value)} 
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input 
                    type="checkbox" 
                    checked={!!exp.isCurrent} 
                    onChange={e => updateExperience(index, 'isCurrent', e.target.checked as any)} 
                  />
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Current Position</label>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Textarea 
                    label="Description"
                    value={exp.description} 
                    onChange={e => updateExperience(index, 'description', e.target.value)} 
                    style={{ minHeight: '100px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <button onClick={() => removeExperience(exp.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', height: 'fit-content', marginTop: '1.5rem' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {data.experience.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0' }}>No experience listed.</div>
          )}
        </div>
      </div>
    </>
  );
}
