import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from '@/app/admin/admin.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    const variantClass = variant === 'secondary' ? styles.buttonSecondary : styles.button;
    
    return (
      <button 
        ref={ref} 
        className={`${variantClass} ${className || ''}`} 
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
