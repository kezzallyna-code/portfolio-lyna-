import { ReactNode } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import styles from './admin.module.css';

export const metadata = {
  title: 'Aether CMS | Admin',
  description: 'Portfolio Content Management System',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.contentInner}>
          {children}
        </div>
      </main>
    </div>
  );
}
