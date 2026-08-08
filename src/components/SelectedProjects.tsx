import styles from './SelectedProjects.module.css';
import { Project } from '@/data/schema';

export default function SelectedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="section-subtitle" style={{ textAlign: 'left' }}>Portfolio</p>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: 0 }}>Selected Projects</h2>
          </div>
          <a href="#" className={styles.viewAll}>View All Projects →</a>
        </div>
        
        <div className={styles.projectsList}>
          {projects.map((project, index) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={`${styles.imageContainer} ${index % 2 !== 0 ? styles.orderLast : ''}`}>
                 {project.imageUrl ? (
                   <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 ) : (
                   <div className={styles.imagePlaceholder}>
                     <span className={styles.placeholderText}>{project.title} Mockup</span>
                   </div>
                 )}
              </div>
              <div className={styles.contentContainer}>
                <span className={styles.category}>{project.category}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <a href={`/projects/${project.caseStudyUrl || project.id}`} className={styles.caseStudyLink}>
                  View Case Study
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
