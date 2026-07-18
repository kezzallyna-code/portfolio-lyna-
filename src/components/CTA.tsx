import styles from './CTA.module.css';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.ctaBox}>
          <h2 className={styles.title}>Let's Build Something<br /><span>Amazing Together.</span></h2>
          <p className={styles.subtitle}>
            Currently open for freelance projects and full-time opportunities.
            If you have a project in mind, let's start a conversation and see how I can help you.
          </p>
          <div className={styles.actions}>
            <a href="mailto:lyna.kezzal@example.com" className={styles.primaryBtn}>Email Me</a>
            <Link href="#contact" className={styles.secondaryBtn}>Schedule a Call</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
