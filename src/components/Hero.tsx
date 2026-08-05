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
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kezzellina@gmail.com" className={styles.secondaryBtn} target="_blank" rel="noopener noreferrer">Let&apos;s Talk</a>
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
        

      </div>
    </section>
  );
}
