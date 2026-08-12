'use client';

import { useState, useEffect } from 'react';
import { PortfolioData, Skill, SoftwareTool } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Textarea } from '@/components/admin/ui/Textarea';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import styles from '@/app/admin/admin.module.css';

export default function SkillsEditor() {
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
      body: JSON.stringify({ superpowers: data?.superpowers }),
    });
    setSaving(false);
    if (res.ok) {
      alert('Skills saved successfully!');
      window.location.reload();
    } else {
      const errData = await res.json().catch(() => ({}));
      alert('Failed to save: ' + (errData?.error || 'Unknown error'));
    }
  };

  const addSkill = () => {
    if (!data) return;
    const newSkill: Skill = { id: crypto.randomUUID(), title: 'New Skill', description: '', icon: 'star', category: '', order: 0 };
    setData({ ...data, superpowers: { ...data.superpowers, skills: [...data.superpowers.skills, newSkill] } });
  };

  const removeSkill = (id: string) => {
    if (!data) return;
    setData({ ...data, superpowers: { ...data.superpowers, skills: data.superpowers.skills.filter(s => s.id !== id) } });
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    if (!data) return;
    const newSkills = [...data.superpowers.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setData({ ...data, superpowers: { ...data.superpowers, skills: newSkills } });
  };

  const addSoftware = () => {
    if (!data) return;
    const newSoftware: SoftwareTool = { name: 'New Tool', icon: 'tool' };
    setData({ ...data, superpowers: { ...data.superpowers, software: [...data.superpowers.software, newSoftware] } });
  };

  const removeSoftware = (index: number) => {
    if (!data) return;
    const newSoftware = [...data.superpowers.software];
    newSoftware.splice(index, 1);
    setData({ ...data, superpowers: { ...data.superpowers, software: newSoftware } });
  };

  const updateSoftware = (index: number, field: keyof SoftwareTool, value: string) => {
    if (!data) return;
    const newSoftware = [...data.superpowers.software];
    newSoftware[index] = { ...newSoftware[index], [field]: value };
    setData({ ...data, superpowers: { ...data.superpowers, software: newSoftware } });
  };

  if (!data) return <div>Loading editor...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Skills & Tools</h1>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Core Skills</h2>
            <Button variant="secondary" onClick={addSkill}><Plus size={16} /> Add Skill</Button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(data.superpowers?.skills || []).map((skill, index) => (
              <div key={skill.id} style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                <div style={{ color: 'var(--text-secondary)', cursor: 'grab', display: 'flex', alignItems: 'center' }}>
                  <GripVertical size={20} />
                </div>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input 
                    value={skill.title} 
                    onChange={e => updateSkill(index, 'title', e.target.value)} 
                    placeholder="Skill Title"
                  />
                  <Input 
                    value={skill.icon} 
                    onChange={e => updateSkill(index, 'icon', e.target.value)} 
                    placeholder="Icon Name (e.g. vector-pen)"
                  />
                  <Input 
                    value={skill.category || ''} 
                    onChange={e => updateSkill(index, 'category', e.target.value)} 
                    placeholder="Category (e.g. Frontend, Design)"
                  />
                  <Input 
                    type="number"
                    value={skill.order?.toString() || '0'} 
                    onChange={e => updateSkill(index, 'order', e.target.value)} 
                    placeholder="Order Index (e.g. 1)"
                  />
                  <div style={{ gridColumn: '1 / -1' }}>
                    <Textarea 
                      value={skill.description} 
                      onChange={e => updateSkill(index, 'description', e.target.value)} 
                      placeholder="Skill Description"
                      style={{ minHeight: '60px' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => removeSkill(skill.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.card} style={{ alignSelf: 'start' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Software & Tools</h2>
            <Button variant="secondary" onClick={addSoftware}><Plus size={16} /> Add</Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(data.superpowers?.software || []).map((tool, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ color: 'var(--text-secondary)', cursor: 'grab' }}>
                  <GripVertical size={16} />
                </div>
                <Input 
                  value={tool.name} 
                  onChange={e => updateSoftware(index, 'name', e.target.value)} 
                  placeholder="Tool Name"
                  style={{ marginBottom: 0 }}
                />
                <Input 
                  value={tool.icon} 
                  onChange={e => updateSoftware(index, 'icon', e.target.value)} 
                  placeholder="Icon"
                  style={{ marginBottom: 0, width: '100px' }}
                />
                <button onClick={() => removeSoftware(index)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
