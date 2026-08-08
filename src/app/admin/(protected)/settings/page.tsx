'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/admin/ui/Button';
import { LogOut, Settings as SettingsIcon, Shield } from 'lucide-react';
import styles from '@/app/admin/admin.module.css';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>System Settings</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Manage your account and authentication settings.</p>
        </div>
        <Button onClick={handleLogout} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <LogOut size={18} /> Sign Out
        </Button>
      </div>

      <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
          <Shield size={24} color="#6366f1" />
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Authentication Credentials</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Your admin dashboard is currently protected.
            </p>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>How to change your login credentials:</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            For maximum security, your login credentials are not stored in the database. Instead, they are securely configured directly on your hosting provider (Vercel) as Environment Variables.
          </p>
          
          <ul style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '1rem', paddingLeft: '1.5rem' }}>
            <li>Log into your <strong>Vercel Dashboard</strong></li>
            <li>Select your portfolio project</li>
            <li>Go to <strong>Settings</strong>  &rarr;  <strong>Environment Variables</strong></li>
            <li>Add or update the following variables:
              <ul style={{ marginTop: '0.5rem', marginBottom: '0.5rem', paddingLeft: '1.5rem', listStyleType: 'circle' }}>
                <li><code>ADMIN_EMAIL</code> (e.g., your@email.com)</li>
                <li><code>ADMIN_PASSWORD</code> (your secure password)</li>
              </ul>
            </li>
            <li>Go to the <strong>Deployments</strong> tab and redeploy your project for the changes to take effect.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
