'use client';

import { useState, useEffect, useRef } from 'react';
import { PortfolioData, UiUxVideo } from '@/data/schema';
import { Button } from '@/components/admin/ui/Button';
import { Input } from '@/components/admin/ui/Input';
import { Save, Plus, Trash2, Play, UploadCloud } from 'lucide-react';
import { FileUpload } from '@/components/admin/ui/FileUpload';
import styles from '../admin.module.css';
import { supabase } from '@/data/supabaseClient';

export default function VideosEditor() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  
  // Bulk upload state
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState('');
  const bulkInputRef = useRef<HTMLInputElement>(null);

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
      alert('Videos saved successfully!');
      window.location.reload();
    } else {
      alert('Failed to save changes. Please try again.');
    }
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
    setData({ ...data, uiUxVideos: [newVideo, ...(data.uiUxVideos || [])] });
  };

  const removeVideo = (id: string) => {
    if (!data) return;
    setData({ ...data, uiUxVideos: (data.uiUxVideos || []).filter(v => v.id !== id) });
  };

  const updateVideo = (index: number, field: keyof UiUxVideo, value: string | boolean) => {
    if (!data) return;
    const newVids = [...(data.uiUxVideos || [])];
    newVids[index] = { ...newVids[index], [field]: value };
    setData({ ...data, uiUxVideos: newVids });
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !data) return;

    setBulkUploading(true);
    const newVideos: UiUxVideo[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setBulkProgress(`Uploading ${i + 1} of ${files.length}... (${file.name})`);
      
      try {
        const filename = `${Date.now()}-${file.name.replaceAll(' ', '_')}`;
        const { error: uploadError } = await supabase
          .storage
          .from('portfolio-media')
          .upload(filename, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase
          .storage
          .from('portfolio-media')
          .getPublicUrl(filename);

        // Create a new video entry for this file
        newVideos.push({
          id: `${Date.now()}-${i}`,
          title: file.name.split('.')[0] || 'New Video',
          category: 'UI/UX',
          description: '',
          thumbnail: '',
          mp4Url: publicUrl,
          isPublished: false
        });
      } catch (err) {
        console.error('Failed to upload', file.name, err);
        alert(`Failed to upload ${file.name}`);
      }
    }

    // Prepend new videos to the list
    setData(prev => {
      if (!prev) return prev;
      return { ...prev, uiUxVideos: [...newVideos, ...(prev.uiUxVideos || [])] };
    });
    
    setBulkUploading(false);
    setBulkProgress('');
    
    // Reset file input
    if (bulkInputRef.current) bulkInputRef.current.value = '';
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem' }}>Showcase Videos</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input 
              type="file" 
              multiple 
              accept="video/*" 
              ref={bulkInputRef} 
              style={{ display: 'none' }} 
              onChange={handleBulkUpload} 
            />
            <Button 
              variant="secondary" 
              onClick={() => bulkInputRef.current?.click()}
              disabled={bulkUploading}
              style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', border: '1px solid rgba(99, 102, 241, 0.2)' }}
            >
              <UploadCloud size={16} /> 
              {bulkUploading ? bulkProgress : 'Bulk Upload Videos'}
            </Button>
            <Button variant="secondary" onClick={addVideo} disabled={bulkUploading}>
              <Plus size={16} /> Add Empty Video
            </Button>
          </div>
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
