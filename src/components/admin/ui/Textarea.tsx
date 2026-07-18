import { TextareaHTMLAttributes, forwardRef } from 'react';
import styles from '@/app/admin/admin.module.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className={styles.inputGroup}>
        {label && <label>{label}</label>}
        <textarea 
          ref={ref} 
          className={`${styles.textarea} ${className || ''}`} 
          {...props} 
        />
        {error && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export { Textarea };
