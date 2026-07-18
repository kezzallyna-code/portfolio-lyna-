import styles from './TechnicalSuperpowers.module.css';
import { TechnicalSuperpowersData } from '@/data/schema';

export default function TechnicalSuperpowers({ data }: { data: TechnicalSuperpowersData }) {
  return (
    <section id="skills" className="section">
      <div className="container">
        <p className="section-subtitle">Expertise</p>
        <h2 className="section-title">Technical Superpowers</h2>
        
        <div className={styles.skillsGrid}>
          {data.skills.map((skill) => (
            <div key={skill.id} className={styles.skillCard}>
              <div className={styles.iconWrapper}>
                {/* Placeholder for icon */}
                <span className={styles.iconPlaceholder}>{skill.icon}</span>
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
          
          <div className={styles.softwareCard}>
            <h3>Software</h3>
            <ul className={styles.softwareList}>
              {data.software.map((sw, i) => (
                <li key={i}>
                  <span className={styles.dot}></span>
                  {sw.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
