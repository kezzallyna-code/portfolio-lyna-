import styles from './Certifications.module.css';
import { Certification } from '@/data/schema';

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  if (!certifications || certifications.length === 0) {
    return null; // Don't render if no certifications
  }

  return (
    <section className="section">
      <div className="container">
        <p className="section-subtitle">Continuous Learning</p>
        <h2 className="section-title">Certifications</h2>
        
        <div className={styles.grid}>
          {certifications.map((cert) => (
            <div key={cert.id} className={styles.card}>
              <div className={styles.icon}>🎓</div>
              <h3 className={styles.title}>{cert.title}</h3>
              <p className={styles.issuer}>{cert.organization}</p>
              <div className={styles.meta}>
                {cert.status ? (
                  <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>{cert.status}</span>
                ) : (
                  <span className={styles.date}>{cert.date}</span>
                )}
                {cert.verificationUrl && (
                  <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    View Credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
