'use client';

import { useState, useEffect } from 'react';
import { PortfolioData, Certification } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Save, Plus, Trash2, GripVertical } from 'lucide-react';
import styles from '../admin.module.css';

export default function CertificationsEditor() {
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
    alert('Certifications saved successfully!');
  };

  const addCert = () => {
    if (!data) return;
    const newCert: Certification = { id: Date.now().toString(), title: 'New Certification', organization: 'Organization', date: '2026', verificationUrl: '', status: 'completed' };
    setData({ ...data, certifications: [...(data.certifications || []), newCert] });
  };

  const removeCert = (id: string) => {
    if (!data) return;
    setData({ ...data, certifications: (data.certifications || []).filter(c => c.id !== id) });
  };

  const updateCert = (index: number, field: keyof Certification, value: string) => {
    if (!data) return;
    const newCerts = [...(data.certifications || [])];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setData({ ...data, certifications: newCerts });
  };

  if (!data) return <div>Loading editor...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Certifications & Awards</h1>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Certifications</h2>
          <Button variant="secondary" onClick={addCert}><Plus size={16} /> Add Certification</Button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {(data.certifications || []).map((cert, index) => (
            <div key={cert.id} style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.1)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
              <div style={{ color: 'var(--text-secondary)', cursor: 'grab', display: 'flex', paddingTop: '0.75rem' }}>
                <GripVertical size={20} />
              </div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input 
                  label="Title"
                  value={cert.title} 
                  onChange={e => updateCert(index, 'title', e.target.value)} 
                />
                <Input 
                  label="Organization"
                  value={cert.organization} 
                  onChange={e => updateCert(index, 'organization', e.target.value)} 
                />
                <Input 
                  label="Date / Year"
                  value={cert.date} 
                  onChange={e => updateCert(index, 'date', e.target.value)} 
                />
                <Input 
                  label="Verification Link (URL)"
                  value={cert.verificationUrl || ''} 
                  onChange={e => updateCert(index, 'verificationUrl', e.target.value)} 
                />
                <Input 
                  label="Status (completed / coming-soon)"
                  value={cert.status || ''} 
                  onChange={e => updateCert(index, 'status', e.target.value)} 
                />
                <Input 
                  label="PDF URL or Image URL"
                  value={cert.pdfUrl || cert.imageUrl || ''} 
                  onChange={e => updateCert(index, 'imageUrl', e.target.value)} 
                />
              </div>
              <div style={{ display: 'flex' }}>
                <button onClick={() => removeCert(cert.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', height: 'fit-content', marginTop: '1.5rem' }}>
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {(data.certifications || []).length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0' }}>No certifications listed.</div>
          )}
        </div>
      </div>
    </>
  );
}
