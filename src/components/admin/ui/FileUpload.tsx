import React, { useState, useRef } from 'react';
import styles from '@/app/admin/admin.module.css';
import { UploadCloud, CheckCircle, AlertCircle, X } from 'lucide-react';

interface FileUploadProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  placeholder?: string;
}

export function FileUpload({ label, value, onChange, accept, placeholder }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        // If response is not JSON (e.g. 413 Payload Too Large html page)
        throw new Error(res.status === 413 ? 'File is too large' : 'Upload failed (Server error)');
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.inputGroup}>
      {label && <label>{label}</label>}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            className={styles.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || 'Or paste a URL here'}
          />
          {value && (
            <button
              onClick={() => onChange('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Clear"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept={accept}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          style={{
            background: 'var(--card-border)',
            border: 'none',
            color: 'var(--text-primary)',
            padding: '0.6rem 1rem',
            borderRadius: '6px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 500,
            transition: 'background 0.2s',
            opacity: uploading ? 0.7 : 1
          }}
          onMouseOver={e => !uploading && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseOut={e => !uploading && (e.currentTarget.style.background = 'var(--card-border)')}
        >
          {uploading ? (
            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
          ) : (
            <UploadCloud size={18} />
          )}
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </div>
      {error && (
        <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <AlertCircle size={14} /> {error}
        </span>
      )}
      {!error && value && value.startsWith('/uploads/') && (
        <span style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <CheckCircle size={14} /> Upload successful
        </span>
      )}
    </div>
  );
}
