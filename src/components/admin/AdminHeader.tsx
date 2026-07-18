'use client';

import { Bell, User } from 'lucide-react';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {
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
      </div>
    </header>
  );
}
