import styles from './ProfessionalTimeline.module.css';
import { Experience } from '@/data/schema';

export default function ProfessionalTimeline({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className={styles.timelineLayout}>
          <div className={styles.timelineHeader}>
             <p className="section-subtitle" style={{ textAlign: 'left' }}>Experience</p>
             <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>Professional Timeline</h2>
          </div>
          
          <div className={styles.timelineItems}>
            {experience.map((item, index) => (
              <div key={item.id} className={styles.timelineItem}>
                <div className={styles.dot}></div>
                <div className={styles.itemContent}>
                  <div className={styles.itemHeader}>
                    <h3 className={styles.role}>{item.role}</h3>
                    <span className={styles.duration}>{item.duration}</span>
                  </div>
                  <p className={styles.company}>{item.company}</p>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
