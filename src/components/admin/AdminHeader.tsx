'use client';

import { Bell, User, LogOut } from 'lucide-react';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* Breadcrumbs or other context could go here */}
      </div>
      
      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.badge}>3</span>
        </button>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
          <span className={styles.name}>Admin</span>
        </div>
        <button onClick={handleLogout} className={styles.iconBtn} style={{ marginLeft: '1rem', color: '#ef4444' }} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
