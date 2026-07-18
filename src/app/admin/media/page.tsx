'use client';

import { useState } from 'react';
import { Button } from '@/components/admin/ui/Button';
import { UploadCloud, Folder, File, Image as ImageIcon, Trash2, Search, Filter } from 'lucide-react';
import styles from '../admin.module.css';

export default function MediaLibrary() {
  const [files] = useState<any[]>([]);

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Media Library</h1>
        <Button>
          <UploadCloud size={18} /> Upload Files
        </Button>
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--card-border)', display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
            <Search size={16} style={{ color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search files..." 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%' }} 
            />
          </div>
          <Button variant="secondary" style={{ padding: '0.5rem 1rem' }}>
            <Filter size={16} /> Filter
          </Button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--card-border)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>File Name</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Size</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Date Added</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {file.type === 'image' && <ImageIcon size={20} />}
                      {file.type === 'document' && <File size={20} />}
                      {file.type === 'video' && <Folder size={20} />}
                    </div>
                    <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{file.name}</div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{file.size}</td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{file.date}</td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem' }}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {files.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No media files found. Upload your first file.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
