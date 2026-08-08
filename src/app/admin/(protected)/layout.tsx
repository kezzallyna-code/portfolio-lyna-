import { ReactNode } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import styles from '@/app/admin/admin.module.css';

export const metadata = {
  title: 'Aether CMS | Admin',
  description: 'Portfolio Content Management System',
};

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('aether_session')?.value;
  
  if (!sessionCookie) {
    redirect('/admin/login');
  }

  const session = await verifyToken(sessionCookie);
  if (!session) {
    redirect('/admin/login');
  }

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
