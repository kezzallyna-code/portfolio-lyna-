import styles from './Hero.module.css';
import { AboutData } from '@/data/schema';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ data }: { data: AboutData }) {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.topArea}>
          <div className={styles.content}>
            <span className={styles.badge}>{data.subtitle}</span>
            <h1 className={styles.title}>{data.role}</h1>
            <p className={styles.description}>{data.description}</p>
            <div className={styles.actions}>
              <Link href="#projects" className={styles.primaryBtn}>Latest Work</Link>
              <a href={`mailto:lyna.kezzal@example.com`} className={styles.secondaryBtn}>Let's Talk</a>
            </div>
          </div>
          <div className={styles.imageWrapper}>
             <Image 
               src="/profile-pic.png" 
               alt="Profile Image" 
               width={300} 
               height={400} 
               className={styles.profileImage}
             />
          </div>
        </div>
        
        <div className={styles.bottomArea}>
          <div className={styles.aboutHeader}>
            <h2>About <span>Me</span></h2>
          </div>
          <div className={styles.statsGrid}>
            {/* Stats removed as requested */}
          </div>
        </div>
      </div>
    </section>
  );
}
