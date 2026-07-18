import { InputHTMLAttributes, forwardRef } from 'react';
import styles from '@/app/admin/admin.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className={styles.inputGroup}>
        {label && <label>{label}</label>}
        <input 
          ref={ref} 
          className={`${styles.input} ${className || ''}`} 
          {...props} 
        />
        {error && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
