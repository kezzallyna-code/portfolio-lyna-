'use client';

import { useState, useEffect } from 'react';
import { PortfolioData, UiUxVideo } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Save, Plus, Trash2, Play } from 'lucide-react';
import { FileUpload } from '@/components/admin/ui/FileUpload';
import styles from '../admin.module.css';

export default function VideosEditor() {
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
    alert('Videos saved successfully!');
  };

  const addVideo = () => {
    if (!data) return;
    const newVideo: UiUxVideo = { 
      id: Date.now().toString(), 
      title: 'New Video', 
      category: 'UI/UX',
      description: '',
      thumbnail: '',
      mp4Url: '', 
      isPublished: false
    };
    setData({ ...data, uiUxVideos: [...(data.uiUxVideos || []), newVideo] });
  };

  const removeVideo = (id: string) => {
    if (!data) return;
    setData({ ...data, uiUxVideos: (data.uiUxVideos || []).filter(v => v.id !== id) });
  };

  const updateVideo = (index: number, field: keyof UiUxVideo, value: any) => {
    if (!data) return;
    const newVids = [...(data.uiUxVideos || [])];
    newVids[index] = { ...newVids[index], [field]: value };
    setData({ ...data, uiUxVideos: newVids });
  };

  if (!data) return <div>Loading editor...</div>;

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>UI/UX Video Showcase</h1>
        <Button onClick={handleSave} isLoading={saving}>
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <div className={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Showcase Videos</h2>
          <Button variant="secondary" onClick={addVideo}><Plus size={16} /> Add Video</Button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {(data.uiUxVideos || []).map((video, index) => (
            <div key={video.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(0,0,0,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
              
              <div style={{ width: '100%', aspectRatio: '16/9', background: 'var(--bg-color)', borderRadius: '4px', border: '1px dashed var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                {video.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={video.thumbnail} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Play size={32} style={{ color: 'var(--text-secondary)' }} />
                )}
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                  <button onClick={() => removeVideo(video.id)} style={{ background: 'rgba(0,0,0,0.5)', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem', borderRadius: '4px' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <FileUpload 
                  label="Video File URL (MP4/WebM/MOV)"
                  value={video.mp4Url || ''} 
                  onChange={value => updateVideo(index, 'mp4Url', value)} 
                  accept="video/*"
                />
                <FileUpload 
                  label="Thumbnail Image URL"
                  value={video.thumbnail} 
                  onChange={value => updateVideo(index, 'thumbnail', value)} 
                  accept="image/*"
                />
                <Input 
                  label="Title"
                  value={video.title} 
                  onChange={e => updateVideo(index, 'title', e.target.value)} 
                />
                <Input 
                  label="Category"
                  value={video.category} 
                  onChange={e => updateVideo(index, 'category', e.target.value)} 
                />
                <Input 
                  label="Description"
                  value={video.description} 
                  onChange={e => updateVideo(index, 'description', e.target.value)} 
                />
                <Input 
                  label="Figma Embed Link"
                  value={video.figmaEmbed || ''} 
                  onChange={e => updateVideo(index, 'figmaEmbed', e.target.value)} 
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input type="checkbox" checked={!!video.isPublished} onChange={e => updateVideo(index, 'isPublished', e.target.checked)} />
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Published</label>
                </div>
              </div>

            </div>
          ))}
          {(data.uiUxVideos || []).length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0' }}>No videos listed.</div>
          )}
        </div>
      </div>
    </>
  );
}
