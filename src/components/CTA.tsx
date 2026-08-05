import styles from './CTA.module.css';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.ctaBox}>
          <h2 className={styles.title}>Let&apos;s build something amazing together</h2>
          <p className={styles.description}>
            Whether you have a specific project in mind or just want to chat about design and development, I&apos;d love to hear from you.
          </p>
          <div className={styles.actions}>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kezzellina@gmail.com" className={styles.primaryBtn} target="_blank" rel="noopener noreferrer">Email Me</a>
            <Link href="#contact" className={styles.secondaryBtn}>Schedule a Call</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
