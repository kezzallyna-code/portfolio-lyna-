'use client';

import { useState, useEffect } from 'react';
import { PortfolioData, Education } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import styles from '../admin.module.css';

export default function EducationEditor() {
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
      alert('Education saved successfully!');
      window.location.reload();
    } else {
      alert('Failed to save changes. Please try again.');
    }
  };

  const addEducation = () => {
    if (!data) return;
    const newEdu: Education = { id: Date.now().toString(), degree: 'New Degree', institution: 'New Institution', graduationYear: '2026', description: '' };
    setData({ ...data, education: [newEdu, ...data.education] });
  };

  const removeEducation = (id: string) => {
    if (!data) return;
    setData({ ...data, education: data.education.filter(e => e.id !== id) });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    if (!data) return;
    const newEduList = [...data.education];
    newEduList[index] = { ...newEduList[index], [field]: value };
    setData({ ...data, education: newEduList });
  };

  if (!data) return <div>Loading editor...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Education Timeline</h1>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Academic Background</h2>
          <Button variant="secondary" onClick={addEducation}><Plus size={16} /> Add Education</Button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {(data.education || []).map((edu, index) => (
            <div key={edu.id} style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
              <div style={{ color: 'var(--text-secondary)', cursor: 'grab', display: 'flex', paddingTop: '0.75rem' }}>
                <GripVertical size={20} />
              </div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input 
                  label="Degree / Major"
                  value={edu.degree} 
                  onChange={e => updateEducation(index, 'degree', e.target.value)} 
                />
                <Input 
                  label="Institution"
                  value={edu.institution} 
                  onChange={e => updateEducation(index, 'institution', e.target.value)} 
                />
                <Input 
                  label="Start Date (Optional)"
                  value={edu.startDate || ''} 
                  onChange={e => updateEducation(index, 'startDate', e.target.value)} 
                />
                <Input 
                  label="Graduation Year / End Date"
                  value={edu.graduationYear} 
                  onChange={e => updateEducation(index, 'graduationYear', e.target.value)} 
                />
                <div style={{ gridColumn: '1 / -1' }}>
                  <Textarea 
                    label="Description"
                    value={edu.description} 
                    onChange={e => updateEducation(index, 'description', e.target.value)} 
                    style={{ minHeight: '100px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <button onClick={() => removeEducation(edu.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', height: 'fit-content', marginTop: '1.5rem' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {data.education.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0' }}>No education listed.</div>
          )}
        </div>
      </div>
    </>
  );
}
